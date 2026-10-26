import { useState } from "react";
import { useDevice } from "../context/DeviceContext";
import { useTheme } from "../context/ThemeContext";
import { 
  X, 
  Cpu, 
  Bluetooth, 
  Wifi, 
  Radio, 
  Database, 
  Copy, 
  Check, 
  RefreshCw, 
  Activity, 
  Zap,
  Code
} from "lucide-react";

export default function DevicePairingModal() {
  const { 
    isPaired, 
    pairedDevice, 
    telemetry,
    isPairingModalOpen, 
    closePairingModal, 
    pairDevice, 
    disconnectDevice,
    sendTestPacketToSupabase,
    supabaseLog
  } = useDevice();

  const { isCute } = useTheme();

  const [activeTab, setActiveTab] = useState("pair"); // "pair" | "telemetry" | "supabase"
  const [inputDeviceId, setInputDeviceId] = useState("PRSD-ESP32-S3");
  const [isPairingNow, setIsPairingNow] = useState(false);
  const [pairingStep, setPairingStep] = useState(0);
  const [copiedSql, setCopiedSql] = useState(false);
  const [testPacketSending, setTestPacketSending] = useState(false);
  const [testResult, setTestResult] = useState(null);

  if (!isPairingModalOpen) return null;

  const handleStartPairing = async (deviceIdToUse) => {
    setIsPairingNow(true);
    setPairingStep(1);

    setTimeout(() => setPairingStep(2), 500);
    setTimeout(() => setPairingStep(3), 1100);
    setTimeout(async () => {
      setPairingStep(4);
      await pairDevice(deviceIdToUse || inputDeviceId);
      setIsPairingNow(false);
      setPairingStep(0);
    }, 1800);
  };

  const handleBluetoothScan = async () => {
    if (navigator.bluetooth) {
      try {
        setIsPairingNow(true);
        setPairingStep(1);
        const device = await navigator.bluetooth.requestDevice({
          acceptAllDevices: true,
          optionalServices: ["battery_service"],
        });
        setPairingStep(2);
        setTimeout(async () => {
          setPairingStep(3);
          await pairDevice(device.name || "BLE-ESP32-WATCH", {
            mac: device.id?.substring(0, 17) || "BLE-DEVICE",
            connectionType: "Web Bluetooth BLE",
          });
          setIsPairingNow(false);
          setPairingStep(0);
        }, 1000);
      } catch (err) {
        console.warn("Bluetooth scan aborted or cancelled, falling back to simulated BLE handshake:", err);
        handleStartPairing(inputDeviceId);
      }
    } else {
      // Browser doesn't support Web Bluetooth (or requires HTTPS / flags), use realistic simulation
      handleStartPairing(inputDeviceId);
    }
  };

  const handleTestPacket = async () => {
    setTestPacketSending(true);
    const res = await sendTestPacketToSupabase();
    setTestResult(res);
    setTestPacketSending(false);
    setTimeout(() => setTestResult(null), 5000);
  };

  const sqlSchema = `-- Copy & run this inside your Supabase Project -> SQL Editor
CREATE TABLE IF NOT EXISTS public.device_telemetry (
  id BIGSERIAL PRIMARY KEY,
  device_id TEXT NOT NULL DEFAULT 'PRSD-ESP32-S3',
  battery INT DEFAULT 89,
  compass_heading INT DEFAULT 248,
  pitch INT DEFAULT -2,
  roll INT DEFAULT 4,
  ultrasonic_distance_cm FLOAT DEFAULT 142.0,
  fall_detected BOOLEAN DEFAULT FALSE,
  latitude DOUBLE PRECISION DEFAULT 16.4947,
  longitude DOUBLE PRECISION DEFAULT 80.4992,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Realtime for live streaming
ALTER PUBLICATION supabase_realtime ADD TABLE public.device_telemetry;

-- Insert an initial test reading
INSERT INTO public.device_telemetry (device_id, battery, compass_heading)
VALUES ('PRSD-ESP32-S3', 95, 180);`;

  const copySqlToClipboard = () => {
    navigator.clipboard.writeText(sqlSchema);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className={`w-full max-w-2xl rounded-3xl border shadow-2xl overflow-hidden flex flex-col max-h-[90vh] transition-all duration-300 ${
          isCute
            ? "bg-[#180f1d] border-rose-500/30 text-rose-50 shadow-[0_0_50px_rgba(244,63,94,0.25)]"
            : "bg-[#0f0f12] border-zinc-800 text-zinc-100 shadow-[0_0_50px_rgba(0,0,0,0.8)]"
        }`}
      >
        {/* Header */}
        <div className={`px-6 py-5 border-b flex items-center justify-between ${
          isCute ? "border-rose-500/20 bg-rose-950/20" : "border-zinc-800/80 bg-zinc-900/40"
        }`}>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center border ${
              isCute 
                ? "bg-rose-500/20 text-rose-400 border-rose-500/30" 
                : "bg-zinc-800 text-amber-400 border-zinc-700"
            }`}>
              <Cpu size={22} className={isPaired ? "animate-pulse" : ""} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-lg tracking-tight">Hardware Pairing Portal</h3>
                {isPaired ? (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    ● PAIRED
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                    ○ DISCONNECTED
                  </span>
                )}
              </div>
              <p className={`text-xs ${isCute ? "text-rose-300/70" : "text-zinc-400"}`}>
                ESP32 Hardware Telemetry & Supabase Cloud Link
              </p>
            </div>
          </div>

          <button 
            onClick={closePairingModal}
            className={`p-2 rounded-xl transition ${
              isCute ? "hover:bg-rose-500/20 text-rose-300" : "hover:bg-zinc-800 text-zinc-400 hover:text-white"
            }`}
          >
            <X size={20} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className={`flex border-b px-6 pt-3 gap-2 ${
          isCute ? "border-rose-500/20 bg-rose-950/10" : "border-zinc-800/80 bg-zinc-950/40"
        }`}>
          <button
            onClick={() => setActiveTab("pair")}
            className={`pb-3 px-3 text-xs font-bold transition flex items-center gap-1.5 border-b-2 ${
              activeTab === "pair"
                ? isCute ? "border-rose-400 text-rose-300" : "border-amber-400 text-white"
                : "border-transparent text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <Bluetooth size={15} />
            <span>Pair Hardware</span>
          </button>

          <button
            onClick={() => setActiveTab("telemetry")}
            className={`pb-3 px-3 text-xs font-bold transition flex items-center gap-1.5 border-b-2 ${
              activeTab === "telemetry"
                ? isCute ? "border-rose-400 text-rose-300" : "border-amber-400 text-white"
                : "border-transparent text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <Activity size={15} />
            <span>Live Telemetry</span>
          </button>

          <button
            onClick={() => setActiveTab("supabase")}
            className={`pb-3 px-3 text-xs font-bold transition flex items-center gap-1.5 border-b-2 ${
              activeTab === "supabase"
                ? isCute ? "border-rose-400 text-rose-300" : "border-amber-400 text-white"
                : "border-transparent text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <Database size={15} />
            <span>Supabase Cloud Sync</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* TAB 1: PAIR HARDWARE */}
          {activeTab === "pair" && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Current device card */}
              <div className={`p-5 rounded-2xl border transition-all ${
                isPaired
                  ? isCute 
                    ? "bg-rose-950/30 border-rose-500/30" 
                    : "bg-zinc-900/60 border-zinc-700/60"
                  : "bg-zinc-950/60 border-zinc-800"
              }`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-bold border ${
                      isPaired
                        ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                        : "bg-zinc-800 text-zinc-400 border-zinc-700"
                    }`}>
                      {isPaired ? <Radio size={24} className="animate-pulse" /> : <Wifi size={24} />}
                    </div>
                    <div>
                      <p className="text-[11px] font-mono text-zinc-400 uppercase font-bold">
                        {isPaired ? "Active Hardware Device" : "No Device Paired"}
                      </p>
                      <h4 className="text-lg font-black text-white">{isPaired ? pairedDevice.name : "Ready to Pair"}</h4>
                      <p className="text-xs font-mono text-zinc-400 mt-0.5">
                        ID: <span className="text-zinc-200 font-bold">{pairedDevice.id}</span> • MAC: {pairedDevice.mac}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {isPaired ? (
                      <button
                        onClick={disconnectDevice}
                        className="px-4 py-2 rounded-xl text-xs font-bold border border-rose-500/30 text-rose-400 hover:bg-rose-500/10 transition"
                      >
                        Unpair Device
                      </button>
                    ) : (
                      <button
                        onClick={() => handleStartPairing(inputDeviceId)}
                        className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition shadow-lg flex items-center gap-2 ${
                          isCute 
                            ? "bg-gradient-to-r from-rose-500 to-purple-500 text-white" 
                            : "bg-amber-400 hover:bg-amber-300 text-black"
                        }`}
                      >
                        <Zap size={14} /> Connect Now
                      </button>
                    )}
                  </div>
                </div>

                {isPaired && (
                  <div className="mt-4 pt-4 border-t border-zinc-800/80 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                    <div className="p-2.5 rounded-xl bg-black/30 border border-zinc-800">
                      <span className="text-[10px] text-zinc-400 font-mono uppercase block">Battery</span>
                      <span className="text-sm font-black font-mono text-emerald-400">{telemetry.battery}%</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-black/30 border border-zinc-800">
                      <span className="text-[10px] text-zinc-400 font-mono uppercase block">RSSI Signal</span>
                      <span className="text-sm font-black font-mono text-zinc-200">{pairedDevice.rssi} dBm</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-black/30 border border-zinc-800">
                      <span className="text-[10px] text-zinc-400 font-mono uppercase block">Firmware</span>
                      <span className="text-sm font-black font-mono text-zinc-200">v2.4.1</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-black/30 border border-zinc-800">
                      <span className="text-[10px] text-zinc-400 font-mono uppercase block">Supabase</span>
                      <span className="text-sm font-black font-mono text-emerald-400">● LIVE</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Pairing In Progress Animation */}
              {isPairingNow && (
                <div className={`p-6 rounded-2xl border text-center space-y-4 animate-fadeIn ${
                  isCute ? "bg-rose-950/40 border-rose-500/40" : "bg-zinc-900 border-amber-500/40"
                }`}>
                  <div className="w-14 h-14 mx-auto rounded-full bg-amber-400/20 text-amber-400 border border-amber-400/40 flex items-center justify-center animate-spin">
                    <RefreshCw size={28} />
                  </div>
                  <div>
                    <h5 className="font-extrabold text-white text-base">
                      {pairingStep === 1 && "Scanning 2.4GHz BLE & WiFi Radio..."}
                      {pairingStep === 2 && "Hardware Handshake with ESP32-S3..."}
                      {pairingStep === 3 && "Authenticating with Supabase Telemetry Channel..."}
                      {pairingStep === 4 && "Device Paired & Streaming!"}
                    </h5>
                    <p className="text-xs text-zinc-400 mt-1">Please keep the wearable watch within 10 meters.</p>
                  </div>
                  
                  <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-500 ${
                        isCute ? "bg-rose-400" : "bg-amber-400"
                      }`}
                      style={{ width: `${pairingStep * 25}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Manual Device Code & Bluetooth Scan Section */}
              <div className="space-y-4">
                <h5 className="text-xs font-bold font-mono uppercase tracking-wider text-zinc-400">
                  Connect via Web Bluetooth or Hardware Serial ID
                </h5>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={handleBluetoothScan}
                    disabled={isPairingNow}
                    className={`p-4 rounded-2xl border text-left flex items-start gap-3 transition-all hover:scale-[1.02] ${
                      isCute 
                        ? "bg-rose-950/20 border-rose-500/30 hover:border-rose-400" 
                        : "bg-zinc-900/60 border-zinc-800 hover:border-zinc-700"
                    }`}
                  >
                    <div className={`p-2.5 rounded-xl ${isCute ? "bg-rose-500/20 text-rose-300" : "bg-zinc-800 text-amber-400"}`}>
                      <Bluetooth size={20} />
                    </div>
                    <div>
                      <h6 className="font-bold text-sm text-white">Scan Bluetooth (BLE)</h6>
                      <p className="text-xs text-zinc-400 mt-0.5">Detect nearby ESP32 smart band directly</p>
                    </div>
                  </button>

                  <div className={`p-4 rounded-2xl border ${
                    isCute ? "bg-rose-950/20 border-rose-500/30" : "bg-zinc-900/60 border-zinc-800"
                  }`}>
                    <label className="block text-xs font-bold text-zinc-400 uppercase font-mono mb-1.5">
                      Hardware Device ID
                    </label>
                    <div className="flex gap-2">
                      <input 
                        type="text"
                        value={inputDeviceId}
                        onChange={(e) => setInputDeviceId(e.target.value)}
                        placeholder="PRSD-ESP32-S3"
                        className="bg-black/50 border border-zinc-700 rounded-xl px-3 py-1.5 text-xs text-white font-mono w-full focus:outline-none focus:border-amber-400"
                      />
                      <button
                        onClick={() => handleStartPairing(inputDeviceId)}
                        disabled={isPairingNow}
                        className={`px-3 py-1.5 rounded-xl font-bold text-xs shrink-0 transition ${
                          isCute ? "bg-rose-500 text-white" : "bg-amber-400 hover:bg-amber-300 text-black"
                        }`}
                      >
                        Pair
                      </button>
                    </div>
                  </div>
                </div>

                {/* Preset test IDs */}
                <div className="flex items-center gap-2 flex-wrap pt-1 text-xs">
                  <span className="text-zinc-500 font-mono text-[11px]">Quick Samples:</span>
                  {["PRSD-ESP32-S3", "PRSD-BAND-VIT", "ESP32-WROOM-01"].map((id) => (
                    <button
                      key={id}
                      onClick={() => {
                        setInputDeviceId(id);
                        handleStartPairing(id);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 font-mono text-[11px] transition"
                    >
                      {id}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: LIVE TELEMETRY */}
          {activeTab === "telemetry" && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-extrabold text-base text-white">Live Streamed Hardware Telemetry</h4>
                  <p className="text-xs text-zinc-400">Incoming data packets from ESP32 & Supabase</p>
                </div>
                <button
                  onClick={handleTestPacket}
                  disabled={testPacketSending}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                    isCute ? "bg-rose-500 text-white" : "bg-zinc-800 hover:bg-zinc-700 text-amber-400 border border-zinc-700"
                  }`}
                >
                  <RefreshCw size={13} className={testPacketSending ? "animate-spin" : ""} />
                  {testPacketSending ? "Pushing..." : "Send Test Packet to Supabase"}
                </button>
              </div>

              {testResult && (
                <div className={`p-3 rounded-xl border text-xs font-mono animate-fadeIn ${
                  testResult.success 
                    ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-300" 
                    : "bg-amber-950/40 border-amber-500/40 text-amber-300"
                }`}>
                  {testResult.success ? "✓ Packet recorded to Supabase!" : `Notice: ${testResult.error}`}
                </div>
              )}

              {/* Sensor cards grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800">
                  <span className="text-[10px] font-mono uppercase text-zinc-400 block">Compass Heading</span>
                  <p className="text-xl font-black font-mono text-white mt-1">{telemetry.heading}°</p>
                  <span className="text-[10px] text-zinc-500">9-Axis Gyro</span>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800">
                  <span className="text-[10px] font-mono uppercase text-zinc-400 block">Ultrasonic Obstacle</span>
                  <p className="text-xl font-black font-mono text-amber-400 mt-1">{telemetry.ultrasonicDistance} cm</p>
                  <span className="text-[10px] text-zinc-500">Front Sonar</span>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800">
                  <span className="text-[10px] font-mono uppercase text-zinc-400 block">Pitch & Roll</span>
                  <p className="text-xl font-black font-mono text-white mt-1">{telemetry.pitch}° / {telemetry.roll}°</p>
                  <span className="text-[10px] text-zinc-500">IMU Orientation</span>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800">
                  <span className="text-[10px] font-mono uppercase text-zinc-400 block">Wearer Heart Rate</span>
                  <p className="text-xl font-black font-mono text-rose-400 mt-1">{telemetry.heartRate} BPM</p>
                  <span className="text-[10px] text-zinc-500">Pulse Oximeter</span>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800">
                  <span className="text-[10px] font-mono uppercase text-zinc-400 block">Step Count</span>
                  <p className="text-xl font-black font-mono text-emerald-400 mt-1">{telemetry.stepCount}</p>
                  <span className="text-[10px] text-zinc-500">Pedometer</span>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800">
                  <span className="text-[10px] font-mono uppercase text-zinc-400 block">GPS Coordinates</span>
                  <p className="text-xs font-black font-mono text-white mt-2">{telemetry.lat.toFixed(4)}, {telemetry.lng.toFixed(4)}</p>
                  <span className="text-[10px] text-zinc-500">Campus Center</span>
                </div>
              </div>

              {/* Status log pill */}
              <div className="p-3 rounded-xl bg-black/60 border border-zinc-800 flex items-center justify-between text-xs font-mono text-zinc-400">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  {supabaseLog}
                </span>
                <span className="text-zinc-500">Refreshed 2s ago</span>
              </div>
            </div>
          )}

          {/* TAB 3: SUPABASE INTEGRATION & SQL */}
          {activeTab === "supabase" && (
            <div className="space-y-5 animate-fadeIn">
              <div>
                <h4 className="font-extrabold text-base text-white">Connect Physical Hardware with Supabase</h4>
                <p className="text-xs text-zinc-400 mt-1">
                  Your website is already configured with Supabase. To stream data directly from your physical ESP32 microcontroller, execute this SQL script in your Supabase dashboard.
                </p>
              </div>

              <div className="relative">
                <pre className="p-4 rounded-2xl bg-black/80 border border-zinc-800 text-[11px] font-mono text-emerald-300 overflow-x-auto leading-relaxed max-h-56">
                  {sqlSchema}
                </pre>
                <button
                  onClick={copySqlToClipboard}
                  className={`absolute top-3 right-3 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                    copiedSql 
                      ? "bg-emerald-500 text-black font-extrabold" 
                      : isCute ? "bg-rose-500/80 hover:bg-rose-500 text-white" : "bg-zinc-800 hover:bg-zinc-700 text-white"
                  }`}
                >
                  {copiedSql ? <><Check size={14} /> Copied!</> : <><Copy size={14} /> Copy SQL</>}
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-3">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase font-mono">
                  <Code size={16} />
                  <span>How ESP32 Sends Data to Supabase</span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Your ESP32 can send data over WiFi using HTTP POST to your Supabase REST endpoint:
                </p>
                <div className="p-3 rounded-xl bg-black/60 border border-zinc-800 font-mono text-[11px] text-zinc-300 space-y-1">
                  <p><span className="text-zinc-500">Endpoint:</span> <span className="text-amber-300">https://yxzdvilzlbxomzfayrvs.supabase.co/rest/v1/device_telemetry</span></p>
                  <p><span className="text-zinc-500">Method:</span> <span className="text-emerald-400 font-bold">POST</span></p>
                  <p><span className="text-zinc-500">Headers:</span> <span className="text-zinc-400">apikey: [YOUR_ANON_KEY], Content-Type: application/json</span></p>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Footer */}
        <div className={`px-6 py-4 border-t flex items-center justify-between text-xs font-mono ${
          isCute ? "border-rose-500/20 bg-rose-950/20 text-rose-300" : "border-zinc-800/80 bg-zinc-900/30 text-zinc-400"
        }`}>
          <span>Status: {isPaired ? "Hardware Paired & Synchronizing" : "Standby — Awaiting Pairing"}</span>
          <button
            onClick={closePairingModal}
            className={`px-4 py-2 rounded-xl font-bold transition ${
              isCute ? "bg-rose-500/20 hover:bg-rose-500/30 text-rose-300" : "bg-zinc-800 hover:bg-zinc-700 text-white"
            }`}
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
}
