import { useState } from "react";
import { 
  Compass, 
  ShieldAlert, 
  MapPin, 
  RotateCcw, 
  AlertTriangle, 
  Activity,
  Zap,
  Cpu
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useDevice } from "../context/DeviceContext";

export default function Demo() {
  const { isCute } = useTheme();
  const { isPaired, openPairingModal } = useDevice();

  // Interactive Demo State
  const [demoCompass, setDemoCompass] = useState(135);
  const [demoFallTriggered, setDemoFallTriggered] = useState(false);
  const [demoGeofenceBreach, setDemoGeofenceBreach] = useState(false);

  const simulateImpact = () => {
    setDemoFallTriggered(true);
    setTimeout(() => {
      setDemoFallTriggered(false);
    }, 3500);
  };

  return (
    <section
      id="demo"
      className="py-24 px-6 sm:px-12 relative overflow-hidden hardware-grid border-b border-zinc-800/80 transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto relative z-10">

        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div 
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider border ${
              isCute
                ? "bg-rose-500/10 border-rose-500/30 text-rose-300"
                : "bg-zinc-900 border-zinc-700 text-zinc-300"
            }`}
          >
            <Zap size={14} className={isCute ? "text-rose-400 animate-pulse" : "text-amber-400 animate-pulse"} />
            <span>Interactive Hardware Playground</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-black text-white">
            Experience{" "}
            <span 
              className={`text-transparent bg-clip-text ${
                isCute 
                  ? "bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400" 
                  : "bg-gradient-to-r from-white via-zinc-200 to-amber-300"
              }`}
            >
              PRAESIDIUM
            </span>{" "}
            Telemetry
          </h2>

          <p className="text-zinc-400 text-sm sm:text-base">
            Test live hardware simulations directly in your browser. Rotate the virtual IMU sensor, trigger fall impact detection, or toggle geofence alerts.
          </p>
        </div>

        {/* Telemetry Playground Container */}
        <div 
          className={`border rounded-3xl p-6 sm:p-8 relative overflow-hidden transition-all duration-300 ${
            isCute
              ? "bg-[#180f1d]/90 border-rose-500/30 shadow-[0_15px_40px_rgba(244,63,94,0.15)]"
              : "bg-[#121215]/90 border-zinc-800 shadow-[0_20px_50px_rgba(0,0,0,0.7)]"
          }`}
        >
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* 1. Compass & IMU Simulator */}
            <div className={`p-6 rounded-2xl border flex flex-col justify-between ${
              isCute ? "bg-black/30 border-rose-500/20" : "bg-black/40 border-zinc-800"
            }`}>
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`flex items-center gap-2 ${isCute ? "text-rose-400" : "text-amber-400"}`}>
                    <Compass size={18} />
                    <h3 className="text-xs font-mono font-bold text-zinc-200 uppercase tracking-wider">9-Axis Gyro Telemetry</h3>
                  </div>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                    isCute ? "bg-rose-500/10 text-rose-300 border-rose-500/30" : "bg-zinc-800 text-zinc-300 border-zinc-700"
                  }`}>
                    LIVE
                  </span>
                </div>

                <div className="flex flex-col items-center justify-center my-6">
                  <div className={`relative w-28 h-28 rounded-full border-2 flex items-center justify-center shadow-inner ${
                    isCute ? "border-rose-500/30 bg-[#211027]" : "border-zinc-700 bg-zinc-900"
                  }`}>
                    <div 
                      className={`w-1.5 h-12 rounded-full transition-transform duration-500 ${
                        isCute 
                          ? "bg-gradient-to-t from-rose-400 to-purple-500" 
                          : "bg-gradient-to-t from-zinc-300 to-red-500"
                      }`}
                      style={{ transform: `rotate(${demoCompass}deg)` }}
                    />
                    <div className="w-3 h-3 bg-white rounded-full absolute shadow-md" />
                  </div>
                  <p className="text-2xl font-black text-white font-mono mt-4">{demoCompass}° SE</p>
                  <p className="text-[11px] text-zinc-500">Live Heading Bearing</p>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-2">Adjust Heading Bearing</label>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={demoCompass}
                  onChange={(e) => setDemoCompass(Number(e.target.value))}
                  className={`w-full h-1.5 rounded-lg appearance-none cursor-pointer bg-zinc-800 ${
                    isCute ? "accent-rose-400" : "accent-amber-400"
                  }`}
                />
              </div>
            </div>

            {/* 2. Fall Impact Detector Simulator */}
            <div className={`p-6 rounded-2xl border flex flex-col justify-between ${
              isCute ? "bg-black/30 border-rose-500/20" : "bg-black/40 border-zinc-800"
            }`}>
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-rose-400">
                    <ShieldAlert size={18} />
                    <h3 className="text-xs font-mono font-bold text-zinc-200 uppercase tracking-wider">Fall Impact Simulator</h3>
                  </div>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                    demoFallTriggered ? 'bg-red-500/20 text-red-400 border-red-500/50' : 'bg-zinc-800 text-zinc-400 border-zinc-700'
                  }`}>
                    {demoFallTriggered ? 'IMPACT DETECTED' : 'ARMED'}
                  </span>
                </div>

                <div className="my-6 text-center space-y-3">
                  <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center transition-all ${
                    demoFallTriggered 
                      ? 'bg-red-500/20 text-red-400 border-2 border-red-500 animate-pulse' 
                      : isCute ? 'bg-rose-950/40 text-rose-300 border border-rose-500/30' : 'bg-zinc-900 text-zinc-300 border border-zinc-800'
                  }`}>
                    <Activity size={34} className={demoFallTriggered ? 'animate-bounce' : ''} />
                  </div>
                  <p className="text-xs text-zinc-300 font-medium">
                    {demoFallTriggered ? '⚠️ Freefall > 3.2g Detected! Broadcasting Guardian Alert...' : 'Wearer in Normal Walking Motion State'}
                  </p>
                </div>
              </div>

              <button
                onClick={simulateImpact}
                disabled={demoFallTriggered}
                className="w-full py-2.5 px-4 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 font-bold text-xs rounded-xl transition flex items-center justify-center gap-2"
              >
                <AlertTriangle size={15} />
                {demoFallTriggered ? "Impact Broadcast Active..." : "Simulate Hard Fall (>2.8g)"}
              </button>
            </div>

            {/* 3. Geofence Alert Preview */}
            <div className={`p-6 rounded-2xl border flex flex-col justify-between ${
              isCute ? "bg-black/30 border-rose-500/20" : "bg-black/40 border-zinc-800"
            }`}>
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-emerald-400">
                    <MapPin size={18} />
                    <h3 className="text-xs font-mono font-bold text-zinc-200 uppercase tracking-wider">Geofence Boundary</h3>
                  </div>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                    demoGeofenceBreach ? 'bg-red-500/20 text-red-400 border-red-500/50' : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                  }`}>
                    {demoGeofenceBreach ? 'BREACHED' : 'SAFE ZONE'}
                  </span>
                </div>

                <div className={`my-6 p-4 rounded-xl border text-center space-y-2 ${
                  isCute ? "bg-rose-950/20 border-rose-500/20" : "bg-zinc-900 border-zinc-800"
                }`}>
                  <p className="text-xs text-zinc-400 font-mono">Location Pin: VIT AP University</p>
                  <p className={`text-sm font-bold font-mono ${demoGeofenceBreach ? 'text-red-400' : 'text-emerald-400'}`}>
                    {demoGeofenceBreach ? '🚨 650m Outside Radius (LIMIT: 300m)' : '✓ Inside 300m Campus Safe Zone'}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => setDemoGeofenceBreach(!demoGeofenceBreach)}
                  className={`w-full py-2.5 px-4 border font-bold text-xs rounded-xl transition flex items-center justify-center gap-2 ${
                    demoGeofenceBreach 
                      ? isCute ? "bg-rose-500/20 border-rose-400 text-rose-200" : "bg-zinc-800 border-zinc-700 text-zinc-200" 
                      : "bg-red-500/10 border-red-500/30 text-red-300 hover:bg-red-500/20"
                  }`}
                >
                  {demoGeofenceBreach ? (
                    <><RotateCcw size={15} /> Return to Campus Center</>
                  ) : (
                    <><AlertTriangle size={15} /> Simulate Walk Outside Geofence</>
                  )}
                </button>

                <button
                  onClick={openPairingModal}
                  className={`w-full py-2 px-3 rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-1.5 border transition ${
                    isCute ? "bg-purple-950/40 border-purple-500/30 text-purple-300" : "bg-zinc-900 border-zinc-700 text-zinc-300"
                  }`}
                >
                  <Cpu size={13} />
                  <span>{isPaired ? "View Hardware Sync" : "Pair Real Hardware"}</span>
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
