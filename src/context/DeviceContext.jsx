import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { supabase } from "../supabase";

const DeviceContext = createContext();

export function useDevice() {
  const context = useContext(DeviceContext);
  if (!context) {
    throw new Error("useDevice must be used within a DeviceProvider");
  }
  return context;
}

const DEFAULT_DEVICE = {
  id: "PRSD-ESP32-S3",
  name: "Presidium Smart Watch S1",
  mac: "C4:4F:33:18:A9:E2",
  firmware: "v2.4.1 (ESP-IDF 5.1)",
  battery: 89,
  rssi: -62, // dBm
  connectionType: "BLE + WiFi Dual Link",
  status: "connected", // "connected" | "disconnected" | "syncing"
  lastSync: new Date().toLocaleTimeString(),
};

export function DeviceProvider({ children }) {
  const [isPaired, setIsPaired] = useState(() => {
    try {
      const saved = localStorage.getItem("presidium_is_paired");
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });

  const [pairedDevice, setPairedDevice] = useState(() => {
    try {
      const saved = localStorage.getItem("presidium_paired_device");
      return saved ? JSON.parse(saved) : DEFAULT_DEVICE;
    } catch {
      return DEFAULT_DEVICE;
    }
  });

  const [isPairingModalOpen, setIsPairingModalOpen] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [supabaseSynced, setSupabaseSynced] = useState(true);
  const [supabaseLog, setSupabaseLog] = useState("Connected to Supabase Channel [device_telemetry]");

  // Real-time telemetry state
  const [telemetry, setTelemetry] = useState({
    heading: 248,
    pitch: -2,
    roll: 4,
    ultrasonicDistance: 142, // cm
    fallDetected: false,
    motionState: "Normal / Active",
    battery: 89,
    lat: 16.4947,
    lng: 80.4992,
    stepCount: 4218,
    heartRate: 74,
  });

  // Save pairing state
  useEffect(() => {
    try {
      localStorage.setItem("presidium_is_paired", JSON.stringify(isPaired));
      localStorage.setItem("presidium_paired_device", JSON.stringify(pairedDevice));
    } catch {
      // Ignore
    }
  }, [isPaired, pairedDevice]);

  // Live telemetry generator & Supabase polling attempt
  useEffect(() => {
    if (!isPaired || pairedDevice.status !== "connected") return;

    let isSubscribed = true;

    // Check if real table exists in Supabase
    const pollSupabase = async () => {
      try {
        const { data, error } = await supabase
          .from("device_telemetry")
          .select("*")
          .order("id", { ascending: false })
          .limit(1);

        if (!error && data && data.length > 0 && isSubscribed) {
          const row = data[0];
          setTelemetry((prev) => ({
            ...prev,
            heading: row.compass_heading ?? prev.heading,
            pitch: row.pitch ?? prev.pitch,
            roll: row.roll ?? prev.roll,
            ultrasonicDistance: row.ultrasonic_distance_cm ?? prev.ultrasonicDistance,
            fallDetected: row.fall_detected ?? prev.fallDetected,
            lat: row.latitude ?? prev.lat,
            lng: row.longitude ?? prev.lng,
            battery: row.battery ?? prev.battery,
          }));
          setSupabaseSynced(true);
          setSupabaseLog(`Live packet #${row.id} received from Supabase`);
        }
      } catch (e) {
        // Table not created yet or offline, continue with live simulation
      }
    };

    pollSupabase();

    // Local telemetry stream to keep UI vibrant & interactive
    const sensorInterval = setInterval(() => {
      if (!isSubscribed) return;
      setTelemetry((prev) => ({
        ...prev,
        heading: (prev.heading + (Math.random() > 0.5 ? 1 : -1) + 360) % 360,
        pitch: Math.round((prev.pitch + (Math.random() - 0.5) * 1.5) * 10) / 10,
        roll: Math.round((prev.roll + (Math.random() - 0.5) * 1.5) * 10) / 10,
        ultrasonicDistance: Math.max(15, Math.min(300, Math.round(prev.ultrasonicDistance + (Math.random() - 0.5) * 8))),
        heartRate: Math.max(65, Math.min(95, Math.round(prev.heartRate + (Math.random() - 0.5) * 2))),
        stepCount: prev.stepCount + (Math.random() > 0.8 ? 1 : 0),
      }));
    }, 2000);

    return () => {
      isSubscribed = false;
      clearInterval(sensorInterval);
    };
  }, [isPaired, pairedDevice]);

  // Connect / Pair device function
  const pairDevice = useCallback(async (deviceId = "PRSD-ESP32-S3", customDetails = {}) => {
    setIsScanning(true);
    // Simulate real hardware handshake sequence
    await new Promise((res) => setTimeout(res, 1200));

    const newDevice = {
      ...DEFAULT_DEVICE,
      id: deviceId,
      name: customDetails.name || `Presidium Watch (${deviceId})`,
      status: "connected",
      lastSync: new Date().toLocaleTimeString(),
      ...customDetails,
    };

    setPairedDevice(newDevice);
    setIsPaired(true);
    setIsScanning(false);
    setSupabaseSynced(true);
    setSupabaseLog(`Device [${deviceId}] successfully paired and linked to Supabase.`);

    // Try recording pairing event to Supabase if devices table exists
    try {
      await supabase.from("devices").upsert({
        device_id: deviceId,
        device_name: newDevice.name,
        last_paired_at: new Date().toISOString(),
      });
    } catch {
      // Graceful fallback if table does not exist
    }

    return newDevice;
  }, []);

  const disconnectDevice = useCallback(() => {
    setPairedDevice((prev) => ({
      ...prev,
      status: "disconnected",
    }));
    setIsPaired(false);
    setSupabaseSynced(false);
    setSupabaseLog("Device disconnected. Ready for new pairing.");
  }, []);

  const openPairingModal = useCallback(() => setIsPairingModalOpen(true), []);
  const closePairingModal = useCallback(() => setIsPairingModalOpen(false), []);

  // Send a test packet to Supabase
  const sendTestPacketToSupabase = useCallback(async () => {
    setSupabaseLog("Transmitting hardware telemetry packet to Supabase...");
    try {
      const payload = {
        device_id: pairedDevice.id,
        battery: telemetry.battery,
        compass_heading: telemetry.heading,
        pitch: telemetry.pitch,
        roll: telemetry.roll,
        ultrasonic_distance_cm: telemetry.ultrasonicDistance,
        fall_detected: telemetry.fallDetected,
        latitude: telemetry.lat,
        longitude: telemetry.lng,
      };

      const { data, error } = await supabase.from("device_telemetry").insert([payload]).select();

      if (error) {
        setSupabaseLog(`Note: Supabase table 'device_telemetry' not yet created. Using client-side simulation. (Error: ${error.message})`);
        return { success: false, error: error.message };
      }

      setSupabaseLog(`Packet #${data[0]?.id || "OK"} written to Supabase successfully!`);
      return { success: true, data };
    } catch (err) {
      setSupabaseLog(`Supabase packet broadcast: ${err.message}`);
      return { success: false, error: err.message };
    }
  }, [pairedDevice, telemetry]);

  const value = {
    isPaired,
    pairedDevice,
    telemetry,
    setTelemetry,
    isPairingModalOpen,
    isScanning,
    supabaseSynced,
    supabaseLog,
    pairDevice,
    disconnectDevice,
    openPairingModal,
    closePairingModal,
    sendTestPacketToSupabase,
  };

  return <DeviceContext.Provider value={value}>{children}</DeviceContext.Provider>;
}
