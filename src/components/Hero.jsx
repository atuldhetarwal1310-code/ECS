import { ArrowRight, Activity, Cpu } from "lucide-react";
import HeroLoginCard from "./HeroLoginCard";
import { useTheme } from "../context/ThemeContext";
import { useDevice } from "../context/DeviceContext";

function Hero() {
  const { isCute } = useTheme();
  const { isPaired, openPairingModal } = useDevice();

  return (
    <section
      id="home"
      className="min-h-screen flex items-center pt-24 sm:pt-28 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-12 relative overflow-hidden hardware-grid transition-colors duration-300"
    >
      {/* Background ambient lighting - Theme aware */}
      <div 
        className={`absolute top-1/4 left-10 w-72 sm:w-96 h-72 sm:h-96 rounded-full blur-3xl pointer-events-none transition-all duration-700 ${
          isCute ? "bg-rose-500/15" : "bg-zinc-800/30"
        }`} 
      />
      <div 
        className={`absolute bottom-10 right-10 w-72 sm:w-96 h-72 sm:h-96 rounded-full blur-3xl pointer-events-none transition-all duration-700 ${
          isCute ? "bg-purple-600/15" : "bg-amber-500/5"
        }`} 
      />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center w-full relative z-10">

        {/* Left Column: Hero Title & CTAs (5 cols) */}
        <div className="lg:col-span-5 space-y-5 sm:space-y-6 text-center lg:text-left">

          <div 
            className={`inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-mono font-bold tracking-wider uppercase border transition-all ${
              isCute
                ? "bg-rose-500/10 border-rose-500/30 text-rose-300"
                : "bg-zinc-900 border-zinc-700 text-zinc-300"
            }`}
          >
            <span className={`w-2 h-2 rounded-full animate-pulse ${isCute ? "bg-rose-400" : "bg-emerald-400"}`} />
            <span>Assistive Hardware Wearable Platform</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight text-white drop-shadow-xl">
            Empowering
            <br />
            <span 
              className={`text-transparent bg-clip-text animate-gradientFlow ${
                isCute
                  ? "bg-gradient-to-r from-rose-400 via-pink-400 to-amber-300"
                  : "bg-gradient-to-r from-white via-zinc-200 to-amber-300"
              }`}
            >
              Independent Mobility.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-lg mx-auto lg:mx-0">
            PRAESIDIUM is an assistive wearable engineered with real-time ultrasonic obstacle scanning, 9-axis IMU orientation, automatic fall impact detection, and live Supabase cloud sync.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-3.5 pt-2 justify-center lg:justify-start">
            <a 
              href="#demo"
              className={`font-extrabold px-6 sm:px-7 py-3 sm:py-3.5 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2.5 text-sm hover:scale-105 shadow-xl ${
                isCute
                  ? "bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 text-white shadow-rose-500/30 hover:shadow-rose-500/50"
                  : "bg-amber-400 hover:bg-amber-300 text-black shadow-amber-400/20 hover:shadow-amber-400/40"
              }`}
            >
              <span>Explore Live Telemetry</span>
              <ArrowRight size={18} />
            </a>

            <button 
              onClick={openPairingModal}
              className={`glass-panel px-5 sm:px-6 py-3 sm:py-3.5 rounded-2xl font-bold text-sm transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 border ${
                isCute
                  ? "border-rose-500/40 text-rose-200 hover:bg-rose-500/20"
                  : "border-zinc-700 text-zinc-200 hover:bg-zinc-800 hover:text-white"
              }`}
            >
              <Cpu size={16} className={isCute ? "text-rose-400" : "text-amber-400"} />
              <span>{isPaired ? "Hardware Paired" : "Pair Device"}</span>
            </button>
          </div>

          {/* Quick specs pill */}
          <div className="pt-4 flex items-center justify-center lg:justify-start gap-4 sm:gap-6 text-[10px] sm:text-xs text-zinc-400 border-t border-zinc-800/80 font-mono flex-wrap">
            <div>
              <span className={`font-bold text-xs sm:text-sm ${isCute ? "text-rose-300" : "text-amber-400"}`}>360°</span> IMU Scan
            </div>
            <div className="w-px h-4 bg-zinc-800 hidden sm:block" />
            <div>
              <span className={`font-bold text-xs sm:text-sm ${isCute ? "text-purple-300" : "text-zinc-200"}`}>&lt;50ms</span> Sync Latency
            </div>
            <div className="w-px h-4 bg-zinc-800 hidden sm:block" />
            <div>
              <span className="font-bold text-emerald-400 text-xs sm:text-sm">Supabase</span> Cloud
            </div>
          </div>

        </div>

        {/* Center Column: Dedicated Watch Showcase Space (3 cols) */}
        <div id="watch-origin" className="flex lg:col-span-3 min-h-[220px] sm:min-h-[380px] lg:min-h-[460px] flex-col items-center justify-center relative my-4 lg:my-0">
          {/* Subtle Target Ring background */}
          <div 
            id="watch-circle" 
            className={`w-48 h-48 sm:w-64 sm:h-64 lg:w-72 lg:h-72 rounded-full border flex items-center justify-center animate-pulse pointer-events-none relative transition-colors duration-500 ${
              isCute
                ? "border-rose-500/25 bg-rose-500/5 shadow-[0_0_40px_rgba(244,63,94,0.15)]"
                : "border-zinc-800 bg-zinc-900/30 shadow-[0_0_40px_rgba(0,0,0,0.5)]"
            }`}
          >
            <div 
              className={`w-32 h-32 sm:w-48 sm:h-48 rounded-full border ${
                isCute ? "border-rose-400/20 bg-rose-400/5" : "border-zinc-700/30 bg-zinc-800/10"
              }`} 
            />
          </div>

          {/* Device Showcase Label */}
          <button 
            onClick={openPairingModal}
            className={`absolute bottom-4 left-1/2 -translate-x-1/2 px-3.5 py-1.5 rounded-full border text-[11px] font-mono font-bold tracking-wider uppercase flex items-center gap-2 shadow-xl whitespace-nowrap backdrop-blur-md transition hover:scale-105 ${
              isCute
                ? "bg-[#180f1d]/90 border-rose-500/40 text-rose-200"
                : "bg-zinc-950/90 border-zinc-700 text-zinc-300 hover:text-white"
            }`}
          >
            <Activity size={14} className={isCute ? "text-rose-400 animate-pulse" : "text-emerald-400 animate-pulse"} />
            <span>PRAESIDIUM S1 Band • {isPaired ? "PAIRED" : "PAIR NOW"}</span>
          </button>
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
