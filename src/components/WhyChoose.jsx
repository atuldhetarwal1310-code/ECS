import { ShieldCheck, Zap, HeartHandshake, DollarSign } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function WhyChoose() {
  const { isCute } = useTheme();

  const reasons = [
    {
      icon: <ShieldCheck className={isCute ? "text-rose-400" : "text-amber-400"} size={26} />,
      title: "Real-Time Multi-Sensor Safety",
      description:
        "Instant obstacle ultrasonic scanning and haptic vibration feedback protect the wearer from collisions before they occur.",
    },
    {
      icon: <Zap className={isCute ? "text-amber-400" : "text-amber-400"} size={26} />,
      title: "Zero-Delay Emergency Response",
      description:
        "Instant fall detection algorithms (>2.8g) and one-click SOS distress beacons notify guardians with live GPS coordinates.",
    },
    {
      icon: <DollarSign className={isCute ? "text-emerald-400" : "text-emerald-400"} size={26} />,
      title: "Accessible & Cost-Effective",
      description:
        "Engineered with high-efficiency ESP32 microcontrollers to deliver premium assistive technology at a fraction of legacy equipment cost.",
    },
    {
      icon: <HeartHandshake className={isCute ? "text-purple-400" : "text-zinc-200"} size={26} />,
      title: "Seamless Guardian Ecosystem",
      description:
        "Web-based portal with dark Leaflet maps, customizable geofence radii, audio alarms, and live Supabase telemetry tracking.",
    },
  ];

  return (
    <section
      id="whychoose"
      className="py-24 px-6 sm:px-12 relative overflow-hidden transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto relative z-10">

        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span 
            className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider border ${
              isCute 
                ? "bg-rose-500/10 border-rose-500/30 text-rose-300" 
                : "bg-zinc-900 border-zinc-700 text-zinc-300"
            }`}
          >
            THE PRAESIDIUM ADVANTAGE
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white drop-shadow-xl">
            Why Choose{" "}
            <span 
              className={`text-transparent bg-clip-text ${
                isCute 
                  ? "bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400" 
                  : "bg-gradient-to-r from-white via-zinc-200 to-amber-300"
              }`}
            >
              PRAESIDIUM?
            </span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            Combining wearable hardware precision with real-time cloud guardian oversight.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {reasons.map((item, index) => (
            <div
              key={index}
              className={`glass-panel p-8 border transition-all duration-300 flex items-start gap-5 group hover:-translate-y-1 ${
                isCute
                  ? "border-rose-500/20 hover:border-rose-400/50 hover:shadow-[0_10px_30px_rgba(244,63,94,0.18)]"
                  : "border-zinc-800 hover:border-zinc-600 hover:shadow-[0_15px_35px_rgba(0,0,0,0.6)]"
              }`}
            >
              <div className={`p-3.5 rounded-2xl border shrink-0 transition group-hover:scale-105 ${
                isCute ? "bg-rose-950/40 border-rose-500/20" : "bg-zinc-900 border-zinc-700/60"
              }`}>
                {item.icon}
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-200 transition">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
