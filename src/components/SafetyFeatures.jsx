export default function SafetyFeatures() {
  const features = [
    {
      title: "Obstacle Detection",
      description: "Detects obstacles in real time using ultrasonic sensors.",
    },
    {
      title: "Fall Detection",
      description: "Identifies sudden falls and triggers emergency actions.",
    },
    {
      title: "SOS Emergency",
      description: "One-button emergency alert for immediate assistance.",
    },
    {
      title: "Live Location",
      description: "Shares the user's GPS location with guardians.",
    },
  ];

  return (
    <section
      id="safety"
      className="py-24 px-8 bg-slate-950"
    >
      <div className="max-w-7xl mx-auto">

        <h2 className="text-5xl font-bold text-center mb-16">
          Key <span className="text-cyan-400">Safety Features</span>
        </h2>

        {/* 2-column layout: left=feature cards, right=watch landing zone */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">

          {/* Left: Feature Cards in 2x2 sub-grid */}
          <div className="lg:col-span-8 grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-slate-900 rounded-2xl p-8 border border-slate-800 hover:border-cyan-400 hover:scale-105 transition-all duration-300"
              >
                <h3 className="text-2xl font-semibold mb-4">
                  {feature.title}
                </h3>

                <p className="text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Right: Watch Landing Zone — GSAP-controlled watch locks here */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center relative min-h-[420px]">

            {/* Soft backdrop glow ring */}
            <div className="w-72 h-72 rounded-full border border-cyan-500/15 bg-gradient-to-br from-cyan-500/5 to-transparent flex items-center justify-center relative pointer-events-none">
              <div className="w-52 h-52 rounded-full border border-cyan-400/10" />
            </div>

            {/* Invisible GSAP anchor — watch lands centered here */}
            <div
              id="watch-landing"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 pointer-events-none"
              aria-hidden="true"
            />

            {/* Label */}
            <p className="absolute bottom-4 text-[11px] font-bold tracking-widest uppercase text-cyan-400/40">
              Device In-Field View
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}
