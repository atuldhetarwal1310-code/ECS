import {
  ShieldAlert,
  Compass,
  MapPin,
  BatteryCharging,
  BellRing,
  Radar,
  Cpu
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

function Features() {
  const { currentUser } = useAuth();
  const { isCute } = useTheme();

  const features = [
    {
      icon: <MapPin className={isCute ? "text-rose-400" : "text-amber-400"} size={28} />,
      badge: "LIVE GPS",
      title: "Leaflet Geofencing & GPS",
      desc: "Real-time coordinate streaming onto interactive dark Leaflet maps with custom breach radii & distance telemetry.",
    },
    {
      icon: <ShieldAlert className={isCute ? "text-pink-400" : "text-rose-400"} size={28} />,
      badge: "ACCELEROMETER",
      title: "Automated Fall Detection",
      desc: "High-G freefall impact sensors evaluate sudden falls (>2.8g) and trigger automated emergency guardian broadcasts.",
    },
    {
      icon: <Compass className={isCute ? "text-purple-400" : "text-emerald-400"} size={28} />,
      badge: "9-AXIS IMU",
      title: "Directional & Motion Gyro",
      desc: "Live compass heading, roll, pitch, and yaw telemetry monitoring wearer orientation & step motion states.",
    },
    {
      icon: <BellRing className={isCute ? "text-red-400" : "text-red-400"} size={28} />,
      badge: "ONE-TOUCH",
      title: "Emergency SOS Beacon",
      desc: "Dedicated hardware emergency button broadcasting distress signals and location coordinates to guardians.",
    },
    {
      icon: <Radar className={isCute ? "text-amber-400" : "text-zinc-200"} size={28} />,
      badge: "ULTRASONIC",
      title: "Obstacle Distance Scanner",
      desc: "Scans physical surroundings in real-time and provides directional haptic vibration pulses to avoid collisions.",
    },
    {
      icon: <BatteryCharging className={isCute ? "text-emerald-400" : "text-amber-400"} size={28} />,
      badge: "POWER SYSTEM",
      title: "Battery & Power Monitor",
      desc: "Continuous power consumption monitoring, low-battery warning alerts, and stable voltage telemetry.",
    },
  ];

  return (
    <section 
      id="features" 
      className="py-24 px-6 sm:px-12 relative overflow-hidden hardware-grid transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div 
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold tracking-widest uppercase border ${
              isCute
                ? "bg-rose-500/10 border-rose-500/30 text-rose-300"
                : "bg-zinc-900 border-zinc-700 text-zinc-300"
            }`}
          >
            <Cpu size={14} className={isCute ? "text-rose-400" : "text-amber-400"} />
            <span>Hardware & Telemetry Architecture</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            Engineered for{" "}
            <span 
              className={`text-transparent bg-clip-text ${
                isCute
                  ? "bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400"
                  : "bg-gradient-to-r from-white via-zinc-200 to-amber-300"
              }`}
            >
              Total Protection
            </span>
          </h2>

          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            PRAESIDIUM integrates precision sensors, ESP32 processing, and real-time cloud sync to empower independent navigation and guardian peace of mind.
          </p>
        </div>

        {/* Feature Card Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`backdrop-blur-xl rounded-3xl p-7 border transition-all duration-300 flex flex-col justify-between group relative overflow-hidden ${
                isCute
                  ? "bg-[#180f1d]/80 border-rose-500/20 hover:border-rose-400/50 hover:shadow-[0_10px_30px_rgba(244,63,94,0.15)]"
                  : "bg-[#121215]/80 border-zinc-800 hover:border-zinc-600 hover:shadow-[0_15px_35px_rgba(0,0,0,0.6)]"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className={`p-3 rounded-2xl border transition duration-300 group-hover:scale-105 ${
                    isCute ? "bg-rose-950/40 border-rose-500/30" : "bg-zinc-900 border-zinc-700/80"
                  }`}>
                    {feature.icon}
                  </div>
                  <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-md border ${
                    isCute 
                      ? "bg-rose-500/10 text-rose-300 border-rose-500/30" 
                      : "bg-zinc-900 text-zinc-300 border-zinc-700"
                  }`}>
                    {feature.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-200 transition">
                  {feature.title}
                </h3>

                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  {feature.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                <span>{currentUser ? 'TELEMETRY STREAMING' : 'READY TO PAIR'}</span>
                {currentUser ? (
                  <span className="text-emerald-400 font-bold">● ONLINE</span>
                ) : (
                  <span className="text-zinc-500 font-bold">○ STANDBY</span>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Features;