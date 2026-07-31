import {
  Shield,
  TriangleAlert,
  MapPin,
  BatteryCharging,
  Bell,
} from "lucide-react";


function Features() {
  const features = [
    {
      icon: <TriangleAlert size={40} />,
      title: "Obstacle Detection",
      desc: "Detects obstacles in front of the user using ultrasonic sensors.",
    },
    {
      icon: <Bell size={40} />,
      title: "SOS Emergency",
      desc: "One-click emergency alert with live location to guardians.",
    },
    {
      icon: <Shield size={40} />,
      title: "Fall Detection",
      desc: "Automatically detects falls and triggers emergency alerts.",
    },
    {
      icon: <MapPin size={40} />,
      title: "Geofencing",
      desc: "Notifies guardians when the user leaves a safe zone.",
    },
    {
      icon: <BatteryCharging size={40} />,
      title: "Battery Monitoring",
      desc: "Shows battery status and alerts when power is low.",
    },
  ];

  return (
    <section id="features" className="py-24 px-8">
      <h2 className="text-5xl font-bold text-center mb-16">
        Key <span className="text-cyan-400">Features</span>
      </h2>

      <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-slate-900 rounded-2xl p-8 border border-slate-700 hover:border-cyan-400 transition duration-300"
          >
            <div className="text-cyan-400 mb-6">{feature.icon}</div>

            <h3 className="text-2xl font-semibold mb-4">
              {feature.title}
            </h3>

            <p className="text-gray-400">
              {feature.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;