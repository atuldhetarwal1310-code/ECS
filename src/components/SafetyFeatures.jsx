import { useTheme } from "../context/ThemeContext";

export default function SafetyFeatures() {
  const { isCute } = useTheme();

  const features = [
    {
      title: "Obstacle Detection",
      description: "Detects obstacles in real time using ultrasonic sonar sensors.",
    },
    {
      title: "Fall Detection",
      description: "Identifies sudden falls (>2.8g) and triggers emergency protocols.",
    },
    {
      title: "SOS Emergency",
      description: "One-button hardware emergency alert for immediate assistance.",
    },
    {
      title: "Live Location",
      description: "Streams wearer GPS coordinates to guardian portal & Supabase.",
    },
  ];

  return (
    <section
      id="safety"
      className="py-16 sm:py-24 px-4 sm:px-8 relative overflow-hidden transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto">

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-10 sm:mb-16 drop-shadow-xl text-white">
          Key{" "}
          <span 
            className={`text-transparent bg-clip-text ${
              isCute 
                ? "bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400" 
                : "bg-gradient-to-r from-white via-zinc-200 to-amber-300"
            }`}
          >
            Safety Features
          </span>
        </h2>

        {/* 2-column layout: left=feature cards, right=watch landing zone */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">

          {/* Left: Feature Cards in 2x2 sub-grid */}
          <div className="lg:col-span-8 grid sm:grid-cols-2 gap-4 sm:gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`glass-panel p-6 sm:p-8 transition-all duration-300 hover:scale-[1.02] border ${
                  isCute
                    ? "border-rose-500/20 hover:border-rose-400/50 hover:shadow-[0_10px_30px_rgba(244,63,94,0.2)]"
                    : "border-zinc-800 hover:border-zinc-600 hover:shadow-[0_15px_35px_rgba(0,0,0,0.6)]"
                }`}
              >
                <h3 className="text-lg sm:text-2xl font-bold mb-2 sm:mb-3 text-white">
                  {feature.title}
                </h3>

                <p className="text-zinc-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Right: Watch Landing Zone — GSAP-controlled watch locks here */}
          <div className="flex lg:col-span-4 flex-col items-center justify-center relative min-h-[250px] sm:min-h-[420px]">

            {/* Soft backdrop glow ring */}
            <div 
              className={`w-56 h-56 sm:w-72 sm:h-72 rounded-full border flex items-center justify-center relative pointer-events-none transition-colors duration-500 ${
                isCute
                  ? "border-rose-500/20 bg-gradient-to-br from-rose-500/5 to-transparent"
                  : "border-zinc-800 bg-gradient-to-br from-zinc-800/20 to-transparent"
              }`}
            >
              <div 
                className={`w-40 h-40 sm:w-52 sm:h-52 rounded-full border ${
                  isCute ? "border-rose-400/15" : "border-zinc-700/20"
                }`} 
              />
            </div>

            {/* Invisible GSAP anchor — watch lands centered here */}
            <div
              id="watch-landing"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 pointer-events-none"
              aria-hidden="true"
            />

            {/* Label */}
            <p className={`absolute bottom-4 text-[11px] font-bold tracking-widest uppercase font-mono ${
              isCute ? "text-rose-400/50" : "text-zinc-500"
            }`}>
              Hardware In-Field Telemetry
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}
