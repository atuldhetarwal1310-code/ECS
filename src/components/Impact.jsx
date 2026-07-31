export default function Impact() {
  const stats = [
    {
      number: "43M+",
      title: "People Living with Blindness",
    },
    {
      number: "295M+",
      title: "Moderate to Severe Vision Impairment",
    },
    {
      number: "1B+",
      title: "People with Vision Impairment",
    },
    {
      number: "24/7",
      title: "Smart Safety Assistance",
    },
  ];

  return (
    <section className="py-24 px-8 bg-slate-950">
      <div className="max-w-7xl mx-auto">

        <h2 className="text-5xl font-bold text-center mb-4">
          Impact & <span className="text-cyan-400">Statistics</span>
        </h2>

        <p className="text-center text-gray-400 mb-16 max-w-3xl mx-auto">
          PRAESIDIUM aims to improve mobility, confidence, and safety for
          visually impaired individuals through intelligent wearable technology.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-slate-900 rounded-2xl p-8 text-center border border-slate-800 hover:border-cyan-400 transition"
            >
              <h3 className="text-5xl font-bold text-cyan-400 mb-4">
                {stat.number}
              </h3>

              <p className="text-gray-300">
                {stat.title}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}