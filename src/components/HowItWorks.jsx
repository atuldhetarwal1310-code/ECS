import { Footprints, Cpu, Zap, Radio, LayoutDashboard, ArrowRight } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function HowItWorks() {
  const { isCute } = useTheme();

  const steps = [
    {
      num: "01",
      icon: <Footprints className={isCute ? "text-rose-400" : "text-amber-400"} size={22} />,
      title: "Wearer Motion",
      desc: "Smart band tracks movement, step dynamics, and spatial heading.",
    },
    {
      icon: <Radio className={isCute ? "text-purple-400" : "text-zinc-200"} size={22} />,
      num: "02",
      title: "Sensor Array Scan",
      desc: "Ultrasonic, 9-axis IMU & GPS stream continuous real-time data.",
    },
    {
      num: "03",
      icon: <Cpu className={isCute ? "text-pink-400" : "text-emerald-400"} size={22} />,
      title: "ESP32 Core Processing",
      desc: "Onboard ESP32 chip evaluates freefall metrics & obstacle distance.",
    },
    {
      num: "04",
      icon: <Zap className={isCute ? "text-amber-400" : "text-amber-400"} size={22} />,
      title: "Haptic Alerts",
      desc: "Vibration motors trigger tactile pulses to guide wearer safety.",
    },
    {
      num: "05",
      icon: <LayoutDashboard className={isCute ? "text-emerald-400" : "text-zinc-200"} size={22} />,
      title: "Guardian Sync",
      desc: "Distress signals & GPS geofence breaches broadcast to portal.",
    },
  ];

  return (
    <section
      id="howitworks"
      className="py-24 px-6 sm:px-12 relative overflow-hidden border-y border-zinc-800/80 transition-colors duration-300"
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
            SYSTEM PIPELINE
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white">
            How{" "}
            <span 
              className={`text-transparent bg-clip-text ${
                isCute 
                  ? "bg-gradient-to-r from-rose-400 to-purple-400" 
                  : "bg-gradient-to-r from-white to-amber-300"
              }`}
            >
              PRAESIDIUM
            </span>{" "}
            Works
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            From sensor acquisition to haptic feedback and cloud guardian sync in under 50 milliseconds.
          </p>
        </div>

        {/* 5-Step Pipeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`rounded-3xl p-6 border transition-all duration-300 flex flex-col justify-between group relative overflow-hidden ${
                isCute
                  ? "bg-[#180f1d]/90 border-rose-500/20 hover:border-rose-400/50"
                  : "bg-[#121215]/90 border-zinc-800 hover:border-zinc-600"
              }`}
            >
              <div className="flex justify-between items-center mb-6">
                <span className={`text-2xl font-black font-mono transition ${
                  isCute ? "text-rose-900/60 group-hover:text-rose-400" : "text-zinc-800 group-hover:text-amber-400"
                }`}>
                  {step.num}
                </span>
                <div className={`p-2.5 rounded-xl border transition group-hover:scale-105 ${
                  isCute ? "bg-rose-950/40 border-rose-500/20" : "bg-zinc-900 border-zinc-700/60"
                }`}>
                  {step.icon}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-200 transition">
                  {step.title}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              {index < steps.length - 1 && (
                <div className={`hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-20 ${
                  isCute ? "text-rose-500/30" : "text-zinc-700"
                }`}>
                  <ArrowRight size={18} />
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
