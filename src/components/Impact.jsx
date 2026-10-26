import { Users, Eye, Globe, ShieldCheck } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function Impact() {
  const { isCute } = useTheme();

  const stats = [
    {
      number: "43M+",
      title: "Living with Complete Blindness",
      icon: <Eye className={isCute ? "text-rose-400" : "text-amber-400"} size={22} />,
    },
    {
      number: "295M+",
      title: "Moderate to Severe Vision Loss",
      icon: <Users className={isCute ? "text-pink-400" : "text-zinc-200"} size={22} />,
    },
    {
      number: "1B+",
      title: "Global Assistive Need",
      icon: <Globe className={isCute ? "text-purple-400" : "text-emerald-400"} size={22} />,
    },
    {
      number: "24/7",
      title: "Real-Time Guardian Protection",
      icon: <ShieldCheck className={isCute ? "text-amber-400" : "text-amber-400"} size={22} />,
    },
  ];

  return (
    <section
      id="impact"
      className="py-24 px-6 sm:px-12 border-b border-zinc-800/80 relative overflow-hidden hardware-grid transition-colors duration-300"
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
            GLOBAL ACCESSIBILITY MISSION
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white">
            Impact &{" "}
            <span 
              className={`text-transparent bg-clip-text ${
                isCute 
                  ? "bg-gradient-to-r from-rose-400 to-purple-400" 
                  : "bg-gradient-to-r from-white to-amber-300"
              }`}
            >
              Statistics
            </span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            PRAESIDIUM bridges technology gaps to restore navigation independence, safety, and confidence worldwide.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`backdrop-blur-xl rounded-3xl p-8 text-center border transition-all duration-300 flex flex-col items-center justify-between group ${
                isCute
                  ? "bg-[#180f1d]/80 border-rose-500/20 hover:border-rose-400/50 hover:shadow-[0_10px_30px_rgba(244,63,94,0.15)]"
                  : "bg-[#121215]/80 border-zinc-800 hover:border-zinc-600 hover:shadow-[0_15px_35px_rgba(0,0,0,0.6)]"
              }`}
            >
              <div className={`p-3 rounded-2xl border mb-4 group-hover:scale-105 transition ${
                isCute ? "bg-rose-950/40 border-rose-500/20" : "bg-zinc-900 border-zinc-700/60"
              }`}>
                {stat.icon}
              </div>

              <h3 className={`text-5xl font-black font-mono mb-2 tracking-tight transition ${
                isCute ? "text-rose-300 group-hover:text-rose-200" : "text-white group-hover:text-amber-300"
              }`}>
                {stat.number}
              </h3>

              <p className="text-xs sm:text-sm text-zinc-300 font-semibold leading-relaxed">
                {stat.title}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
