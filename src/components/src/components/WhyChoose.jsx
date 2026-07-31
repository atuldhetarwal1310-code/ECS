export default function WhyChoose() {
  const reasons = [
    {
      title: "Real-Time Protection",
      description:
        "Instant obstacle detection and vibration alerts help users navigate safely.",
    },
    {
      title: "Smart Emergency Response",
      description:
        "Fall detection and SOS functionality ensure immediate assistance when needed.",
    },
    {
      title: "Affordable Innovation",
      description:
        "Designed using cost-effective hardware without compromising performance.",
    },
    {
      title: "Easy to Use",
      description:
        "A lightweight wearable with a simple interface suitable for everyday use.",
    },
  ];

  return (
    <section className="py-24 px-8 bg-[#081423]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-16">
          Why Choose <span className="text-cyan-400">PRAESIDIUM?</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {reasons.map((item, index) => (
            <div
              key={index}
              className="bg-slate-900 rounded-2xl p-8 border border-slate-800 hover:border-cyan-400 transition-all duration-300"
            >
              <h3 className="text-2xl font-semibold mb-4">
                {item.title}
              </h3>

              <p className="text-gray-400">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}