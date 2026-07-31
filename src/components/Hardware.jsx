import esp32 from "../assets/esp32.png";
export default function Hardware() {
  return (
    <section
      id="hardware"
      className="py-24 px-8 bg-[#08152A]"
    >
      <div className="max-w-7xl mx-auto">

        <h2 className="text-5xl font-bold text-center mb-16">
          Hardware <span className="text-cyan-400">Components</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-slate-900 rounded-3xl p-8 border border-cyan-500/20">
            <h3 className="text-2xl font-bold mb-3">
              ESP32
              
            </h3>

            <p className="text-gray-400">
              Main controller with Bluetooth connectivity.
            </p>
          </div>

          <div className="bg-slate-900 rounded-3xl p-8 border border-cyan-500/20">
            <h3 className="text-2xl font-bold mb-3">
              Ultrasonic Sensors
            </h3>

            <p className="text-gray-400">
              Detect obstacles in front of the user.
            </p>
          </div>

          <div className="bg-slate-900 rounded-3xl p-8 border border-cyan-500/20">
            <h3 className="text-2xl font-bold mb-3">
              MPU6050
            </h3>

            <p className="text-gray-400">
              Detects falls using an accelerometer and gyroscope.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}