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
    <section className="py-24 px-8 bg-slate-950">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-16">
          Key <span className="text-cyan-400">Safety Features</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-slate-900 rounded-2xl p-8 border border-slate-800 hover:border-cyan-400 transition"
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
      </div>
    </section>
  );
}