import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { 
  MapPin, 
  Shield, 
  Navigation, 
  Sliders, 
  AlertTriangle, 
  CheckCircle,
  Volume2,
  VolumeX,
  Footprints,
  RotateCcw
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";

// Fix standard marker icon path issues in Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Helper function to compute distance in meters between two lat/lng points (Haversine formula)
function getDistanceMeters(lat1, lon1, lat2, lon2) {
  const R = 6371000; // Earth radius in meters
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

// Web Audio API Synthesizer Alarm Sound Effect
const playBreachAlarmSound = () => {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.35);
    
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.35);
  } catch (e) {
    // Ignore audio autoplay restrictions
  }
};

export default function GeofenceMap({ 
  watchPos = { lat: 16.4947, lng: 80.4992 }, // VIT AP University, Vijayawada
  devicePower = true,
  onPositionChange,
  onStatusChange
}) {
  const { isCute } = useTheme();

  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const watchMarkerRef = useRef(null);
  const geofenceCircleRef = useRef(null);
  const centerMarkerRef = useRef(null);

  // Geofence state
  const [geofenceCenter, setGeofenceCenter] = useState(watchPos);
  const [radiusMeters, setRadiusMeters] = useState(300);
  const [isBreached, setIsBreached] = useState(false);
  const [distance, setDistance] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Safe circle color based on theme
  const safeCircleColor = isCute ? "#f43f5e" : "#f59e0b";

  // Calculate distance & breach status
  useEffect(() => {
    const dist = getDistanceMeters(
      watchPos.lat,
      watchPos.lng,
      geofenceCenter.lat,
      geofenceCenter.lng
    );
    setDistance(dist);
    const breached = dist > radiusMeters;
    setIsBreached(breached);

    if (breached && devicePower && soundEnabled) {
      playBreachAlarmSound();
    }

    if (onStatusChange) {
      onStatusChange({ isBreached: breached, distance: dist, radius: radiusMeters });
    }
  }, [watchPos, geofenceCenter, radiusMeters, devicePower, soundEnabled]);

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [watchPos.lat, watchPos.lng],
        zoom: 15,
        zoomControl: false,
      });

      // Free OpenStreetMap Tiles (No API Key Required)
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);

      L.control.zoom({ position: "bottomright" }).addTo(map);

      // Custom Watch Marker Icon
      const markerBg = isCute ? "bg-rose-500" : "bg-amber-400 text-black";
      const pingBg = isCute ? "bg-rose-500/30" : "bg-amber-400/30";
      const watchIcon = L.divIcon({
        className: "custom-watch-marker",
        html: `
          <div class="relative flex items-center justify-center">
            <div class="w-7 h-7 ${markerBg} border-2 border-black rounded-full shadow-lg z-10 flex items-center justify-center text-[12px] font-bold">⌚</div>
            <div class="w-14 h-14 ${pingBg} rounded-full absolute animate-ping"></div>
          </div>
        `,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      });

      const watchMarker = L.marker([watchPos.lat, watchPos.lng], {
        icon: watchIcon,
      }).addTo(map);

      watchMarker.bindPopup(
        "<div class='text-zinc-900 font-bold text-xs p-1'>Presidium Watch Live Coordinates</div>"
      );
      watchMarkerRef.current = watchMarker;

      // Geofence Circle Overlay
      const circle = L.circle([geofenceCenter.lat, geofenceCenter.lng], {
        color: isBreached ? "#ef4444" : safeCircleColor,
        fillColor: isBreached ? "#ef4444" : safeCircleColor,
        fillOpacity: 0.2,
        weight: 2.5,
        dashArray: "6, 6",
        radius: radiusMeters,
      }).addTo(map);

      geofenceCircleRef.current = circle;

      // Click to set custom geofence center point
      map.on("click", (e) => {
        setGeofenceCenter({ lat: e.latlng.lat, lng: e.latlng.lng });
      });

      mapInstanceRef.current = map;

      // Ensure tile loading layout fits container
      setTimeout(() => {
        map.invalidateSize();
      }, 250);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update map layer states dynamically
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    if (watchMarkerRef.current) {
      watchMarkerRef.current.setLatLng([watchPos.lat, watchPos.lng]);
    }

    if (geofenceCircleRef.current) {
      geofenceCircleRef.current.setLatLng([
        geofenceCenter.lat,
        geofenceCenter.lng,
      ]);
      geofenceCircleRef.current.setRadius(radiusMeters);
      geofenceCircleRef.current.setStyle({
        color: isBreached ? "#ef4444" : safeCircleColor,
        fillColor: isBreached ? "#ef4444" : safeCircleColor,
      });
    }

    if (centerMarkerRef.current) {
      centerMarkerRef.current.setLatLng([
        geofenceCenter.lat,
        geofenceCenter.lng,
      ]);
    } else if (mapInstanceRef.current) {
      const centerIcon = L.divIcon({
        className: "custom-center-marker",
        html: `<div class="w-4 h-4 bg-emerald-400 border-2 border-black rounded-full shadow-md"></div>`,
        iconSize: [16, 16],
        iconAnchor: [8, 8],
      });
      const centerMarker = L.marker(
        [geofenceCenter.lat, geofenceCenter.lng],
        { icon: centerIcon }
      ).addTo(mapInstanceRef.current);
      centerMarker.bindPopup(
        "<div class='text-zinc-900 font-bold text-xs p-1'>Geofence Center Point</div>"
      );
      centerMarkerRef.current = centerMarker;
    }
  }, [watchPos, geofenceCenter, radiusMeters, isBreached, safeCircleColor]);

  const recenterToWatch = () => {
    setGeofenceCenter(watchPos);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([watchPos.lat, watchPos.lng], 15);
    }
  };

  return (
    <div 
      className={`border rounded-3xl p-6 relative overflow-hidden flex flex-col gap-6 shadow-xl transition-all duration-300 ${
        isCute
          ? "bg-[#180f1d]/90 border-rose-500/30"
          : "bg-[#121215]/90 border-zinc-800"
      }`}
    >
      {/* Map Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Shield className={isBreached ? "text-red-500" : isCute ? "text-rose-400" : "text-amber-400"} size={22} />
            <h3 className="text-lg font-bold text-white tracking-wide">Leaflet GPS & Geofencing System</h3>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Click anywhere on the map to set your custom Geofence center point (OpenStreetMap).
          </p>
        </div>

        {/* Live Breach / Safe Status Badge & Sound Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-2 rounded-2xl border text-xs font-bold transition flex items-center gap-1.5 ${
              soundEnabled
                ? isCute 
                  ? "bg-rose-500/20 border-rose-500/40 text-rose-300" 
                  : "bg-zinc-800 border-zinc-700 text-amber-400 hover:bg-zinc-700"
                : "bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-zinc-300"
            }`}
            title={soundEnabled ? "Audio Alarm Siren Enabled" : "Audio Alarm Muted"}
          >
            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
            <span className="hidden sm:inline">{soundEnabled ? "Sound ON" : "Sound MUTE"}</span>
          </button>

          <div className={`px-4 py-2 rounded-2xl border text-xs font-bold flex items-center gap-2 ${
            !devicePower
              ? "bg-zinc-800/80 border-zinc-700 text-zinc-400"
              : isBreached
              ? "bg-red-500/20 border-red-500/50 text-red-400 animate-pulse"
              : "bg-emerald-500/20 border-emerald-500/40 text-emerald-400"
          }`}>
            {!devicePower ? (
              <><span>●</span> Device Offline</>
            ) : isBreached ? (
              <><AlertTriangle size={16} /> GEOFENCE BREACH ALERT ({distance}m away)</>
            ) : (
              <><CheckCircle size={16} /> Inside Safe Zone ({distance}m from center)</>
            )}
          </div>
        </div>
      </div>

      {/* Leaflet Map Canvas with Dark Mode Tiles */}
      <div className="relative w-full h-[380px] rounded-2xl border border-zinc-800 overflow-hidden shadow-inner group dark-leaflet-tiles">
        <div ref={mapContainerRef} className="w-full h-full z-0 bg-black" />

        {/* Device Offline Screen */}
        {!devicePower && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-20 flex flex-col items-center justify-center text-center p-6">
            <MapPin size={40} className="text-zinc-600 mb-2" />
            <p className="text-base font-bold text-zinc-300">GPS Signal Offline</p>
            <p className="text-xs text-zinc-500 mt-1">Turn on watch power to reactivate Leaflet live tracking</p>
          </div>
        )}

        {/* Map Recenter Control */}
        {devicePower && (
          <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
            <button
              onClick={recenterToWatch}
              className={`p-2.5 border rounded-xl shadow-lg transition backdrop-blur-md flex items-center gap-2 text-xs font-bold ${
                isCute 
                  ? "bg-[#180f1d]/90 hover:bg-rose-500 hover:text-white border-rose-500/40 text-rose-300" 
                  : "bg-zinc-900/90 hover:bg-amber-400 hover:text-black border-zinc-700 text-zinc-200"
              }`}
            >
              <Navigation size={16} />
              Reset Center to Watch
            </button>
          </div>
        )}
      </div>

      {/* Geofence Parameters & Simulation Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        <div className={`border p-4 rounded-2xl md:col-span-2 ${
          isCute ? "bg-black/30 border-rose-500/20" : "bg-black/40 border-zinc-800"
        }`}>
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-2">
              <Sliders size={14} className={isCute ? "text-rose-400" : "text-amber-400"} /> Geofence Radius
            </label>
            <span className={`text-sm font-bold font-mono ${isCute ? "text-rose-300" : "text-amber-400"}`}>
              {radiusMeters} Meters
            </span>
          </div>
          <input
            type="range"
            min="50"
            max="1500"
            step="25"
            value={radiusMeters}
            onChange={(e) => setRadiusMeters(Number(e.target.value))}
            className={`w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer ${
              isCute ? "accent-rose-400" : "accent-amber-400"
            }`}
          />
          <div className="flex justify-between text-[10px] text-zinc-500 mt-1 font-mono">
            <span>50m (Strict)</span>
            <span>500m (Standard)</span>
            <span>1500m (Wide Area)</span>
          </div>
        </div>

        <div className={`border p-4 rounded-2xl flex flex-col justify-center gap-1 ${
          isCute ? "bg-black/30 border-rose-500/20" : "bg-black/40 border-zinc-800"
        }`}>
          <div className="flex justify-between text-xs">
            <span className="text-zinc-400">Watch Position:</span>
            <span className={`font-mono ${isCute ? "text-rose-300" : "text-zinc-200"}`}>
              {watchPos.lat.toFixed(4)}, {watchPos.lng.toFixed(4)}
            </span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-zinc-400">Distance from Center:</span>
            <span className={`font-mono font-bold ${isBreached ? 'text-red-400' : 'text-emerald-400'}`}>
              {distance}m
            </span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-zinc-400">Radius Limit:</span>
            <span className="font-mono text-zinc-300">{radiusMeters}m</span>
          </div>
        </div>
      </div>

      {/* Geofence Breach Test Simulation Bar */}
      <div className={`p-4 border rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 ${
        isCute ? "bg-black/40 border-rose-500/20" : "bg-black/50 border-zinc-800"
      }`}>
        <div className="flex items-center gap-2">
          <Footprints size={18} className={isCute ? "text-rose-400" : "text-amber-400"} />
          <div>
            <p className="text-xs font-bold text-zinc-200">Hardware Geofence Breach Simulation</p>
            <p className="text-[11px] text-zinc-400">Test live movement outside the allowed safe zone</p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => {
              if (onPositionChange) {
                // Move watch ~650m north-east outside geofence radius
                onPositionChange({ lat: 16.5005, lng: 80.5050 });
              }
            }}
            className="flex-1 sm:flex-none px-3.5 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/40 text-red-400 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5"
          >
            <AlertTriangle size={14} /> Simulate Walk Outside (+650m)
          </button>
          
          <button
            onClick={() => {
              if (onPositionChange) {
                // Return watch back to VIT AP University center
                onPositionChange({ lat: 16.4947, lng: 80.4992 });
              }
            }}
            className={`flex-1 sm:flex-none px-3.5 py-2 border rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              isCute
                ? "bg-rose-500/10 hover:bg-rose-500/20 border-rose-500/40 text-rose-300"
                : "bg-zinc-800 hover:bg-zinc-700 border-zinc-700 text-zinc-200"
            }`}
          >
            <RotateCcw size={14} /> Return to Campus Center
          </button>
        </div>
      </div>
    </div>
  );
}
