import { ArrowRight, Sparkles, Activity } from "lucide-react";
import HeroLoginCard from "./HeroLoginCard";
import { useAuth } from "../context/AuthContext";

function Hero() {
  const { openDrawer } = useAuth();

  return (
    <section
      id="home"
      className="min-h-screen flex items-center pt-28 pb-16 px-6 lg:px-12 relative overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center w-full relative z-10">

        {/* Left Column: Hero Title & CTAs (5 cols) */}
        <div className="lg:col-span-5 space-y-6">

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>Smart Wearable Assistance</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
            Empowering
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-300 to-blue-400">
              Independent Mobility.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-lg">
            PRAESIDIUM is an intelligent wearable designed to help visually
            impaired individuals navigate safely through real-time obstacle
            detection, vibration alerts, fall detection, and live guardian tracking.
          </p>

          <div className="flex flex-wrap gap-3.5 pt-2">
            <a 
              href="#features"
              className="bg-cyan-400 hover:bg-cyan-300 text-black font-bold px-7 py-3.5 rounded-2xl shadow-lg hover:shadow-cyan-400/30 hover:scale-105 transition-all duration-300 flex items-center gap-2.5 text-sm"
            >
              <span>Explore Features</span>
              <ArrowRight size={18} />
            </a>

            <button 
              onClick={() => openDrawer("signin")}
              className="border border-cyan-500/50 bg-slate-900/60 hover:bg-cyan-500/10 text-cyan-300 px-6 py-3.5 rounded-2xl font-semibold text-sm transition hover:border-cyan-400 flex items-center gap-2"
            >
              <Sparkles size={16} className="text-cyan-400" />
              <span>Guardian Portal</span>
            </button>
          </div>

          {/* Quick specs pill */}
          <div className="pt-4 flex items-center gap-6 text-xs text-gray-400 border-t border-slate-800/80">
            <div>
              <span className="font-bold text-cyan-400 text-sm">360°</span> Sensor Scan
            </div>
            <div className="w-px h-4 bg-slate-800" />
            <div>
              <span className="font-bold text-cyan-400 text-sm">&lt;50ms</span> Alert Latency
            </div>
            <div className="w-px h-4 bg-slate-800" />
            <div>
              <span className="font-bold text-emerald-400 text-sm">SOS</span> Live GPS
            </div>
          </div>

        </div>

        {/* Center Column: Dedicated Watch Showcase Space (3 cols) */}
        <div id="watch-origin" className="lg:col-span-3 min-h-[380px] lg:min-h-[460px] flex flex-col items-center justify-center relative my-4 lg:my-0">
          {/* Subtle Cyber Target Ring background */}
          <div id="watch-circle" className="w-64 h-64 lg:w-72 lg:h-72 rounded-full border border-cyan-500/20 bg-cyan-500/5 flex items-center justify-center animate-pulse pointer-events-none relative">
            <div className="w-48 h-48 rounded-full border border-cyan-400/30 bg-cyan-400/5 flex items-center justify-center" />
          </div>

          {/* Device Showcase Label */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-slate-900/90 border border-cyan-500/30 text-[11px] font-bold text-cyan-300 tracking-wider uppercase flex items-center gap-1.5 shadow-lg whitespace-nowrap">
            <Activity size={13} className="text-cyan-400" />
            <span>PRAESIDIUM Smart Band</span>
          </div>
        </div>

        {/* Right Column: Guardian Login Console (4 cols) */}
        <div className="lg:col-span-4 z-10 relative">
          <HeroLoginCard />
        </div>

      </div>
    </section>
  );
}

export default Hero;


