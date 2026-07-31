export default function HowItWorks() {
  return (
    <section
      id="workflow"
      className="py-24 px-8 bg-[#06111F]"
    >
      <div className="max-w-7xl mx-auto">

        <h2 className="text-5xl font-bold text-center mb-20">
          How <span className="text-cyan-400">PRAESIDIUM Works</span>
        </h2>

        <div className="grid md:grid-cols-5 gap-6 text-center">

          <div className="bg-slate-900 rounded-3xl p-6">
            <h3 className="text-xl font-bold">
               User Walks
            </h3>
          </div>

          <div className="bg-slate-900 rounded-3xl p-6">
            <h3 className="text-xl font-bold">
               Sensors Detect
            </h3>
          </div>

          <div className="bg-slate-900 rounded-3xl p-6">
            <h3 className="text-xl font-bold">
               ESP32
            </h3>
          </div>

          <div className="bg-slate-900 rounded-3xl p-6">
            <h3 className="text-xl font-bold">
               Vibrations
            </h3>
          </div>

          <div className="bg-slate-900 rounded-3xl p-6">
            <h3 className="text-xl font-bold">
               Guardian Alert
            </h3>
          </div>

        </div>

      </div>
    </section>
  );
}