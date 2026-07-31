
import { ArrowRight } from "lucide-react";

function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center pt-24 px-8"
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">

        {/* Left Side */}
        <div>

          <p className="text-cyan-400 font-semibold mb-4">
            SMART WEARABLE FOR THE VISUALLY IMPAIRED
          </p>

          <h1 className="text-6xl font-extrabold leading-tight">
            Meet
            <span className="text-cyan-400"> PRAESIDIUM</span>
          </h1>

          <p className="text-gray-300 text-lg mt-8 leading-8">
            An AI-powered wearable designed to improve safety and independence
            through obstacle detection, SOS alerts, fall detection,
            geofencing, and battery monitoring.
          </p>

          <div className="flex gap-6 mt-10">
            <button className="bg-cyan-500 hover:bg-cyan-400 px-8 py-4 rounded-xl flex items-center gap-3">
              Explore
              <ArrowRight size={20} />
            </button>

            <button className="border border-cyan-500 px-8 py-4 rounded-xl hover:bg-cyan-500/20">
              Watch Demo
            </button>
          </div>

        </div>

        {/* Right Side */}
        <div className="flex justify-center">
          <img
            src="/device.png"
            alt="Praesidium Device"
            className="w-[450px] drop-shadow-[0_0_60px_rgba(34,211,238,0.4)]"
          />
        </div>

      </div>
    </section>
  );
}

export default Hero;