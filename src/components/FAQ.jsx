import { useState } from "react";
import { ChevronDown, Radio, Heart } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function FAQ() {
  const { isCute } = useTheme();

  const faqs = [
    {
      question: "What is PRAESIDIUM Smart Watch?",
      answer:
        "PRAESIDIUM is an assistive wearable designed to help visually impaired individuals navigate safely using real-time ultrasonic obstacle scanning, fall impact sensors, live GPS geofencing, and directional motion telemetry.",
    },
    {
      question: "How does the Geofence Boundary Alert system work?",
      answer:
        "Guardians can define a custom safe boundary radius on Leaflet dark maps (e.g. 300 meters around VIT AP University). If the watch bearer moves outside this perimeter, instant visual notifications and audible sirens trigger on the guardian portal.",
    },
    {
      question: "How does automated Fall Detection work?",
      answer:
        "The watch features a high-g accelerometer that constantly analyzes body motion. When a sudden freefall impact exceeding 2.8g is detected, the watch automatically broadcasts distress telemetry and coordinates to emergency contacts.",
    },
    {
      question: "How does the device connect and sync with Supabase?",
      answer:
        "PRAESIDIUM connects to the web application via Web Bluetooth (BLE) or WiFi. Sensor telemetry (compass heading, pitch, roll, sonar distance, fall events) streams directly to your Supabase cloud backend in real time.",
    },
  ];

  const [open, setOpen] = useState(0);

  return (
    <section
      id="faq"
      className="py-24 px-6 sm:px-12 relative overflow-hidden transition-colors duration-300"
    >
      <div className="max-w-4xl mx-auto relative z-10">

        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span 
            className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider border ${
              isCute 
                ? "bg-rose-500/10 border-rose-500/30 text-rose-300" 
                : "bg-zinc-900 border-zinc-700 text-zinc-300"
            }`}
          >
            SUPPORT & KNOWLEDGE BASE
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white">
            Frequently Asked{" "}
            <span 
              className={`text-transparent bg-clip-text ${
                isCute 
                  ? "bg-gradient-to-r from-rose-400 to-purple-400" 
                  : "bg-gradient-to-r from-white to-amber-300"
              }`}
            >
              Questions
            </span>
          </h2>
        </div>

        <div className="space-y-4 mb-20">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`rounded-2xl overflow-hidden transition duration-300 border backdrop-blur-xl ${
                isCute
                  ? "bg-[#180f1d]/80 border-rose-500/20 hover:border-rose-400/50"
                  : "bg-[#121215]/80 border-zinc-800 hover:border-zinc-600"
              }`}
            >
              <button
                onClick={() => setOpen(open === index ? null : index)}
                className="w-full text-left px-6 py-5 flex justify-between items-center gap-4 transition hover:bg-white/5"
              >
                <span className="font-bold text-sm sm:text-base text-white">{faq.question}</span>
                <ChevronDown
                  size={18}
                  className={`transition-transform duration-300 shrink-0 ${
                    isCute ? "text-rose-400" : "text-amber-400"
                  } ${open === index ? "rotate-180" : ""}`}
                />
              </button>

              {open === index && (
                <div className={`px-6 py-4 text-xs sm:text-sm text-zinc-300 border-t leading-relaxed animate-fadeIn ${
                  isCute ? "bg-black/30 border-rose-500/20" : "bg-black/40 border-zinc-800"
                }`}>
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <footer className="pt-10 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-zinc-500 font-mono">
          <div className="flex items-center gap-2">
            {isCute ? <Heart size={15} className="text-rose-400" /> : <Radio size={15} className="text-amber-400" />}
            <span className="text-zinc-300 font-bold">PRAESIDIUM Smart Wearables © 2026</span>
          </div>

          <div className="flex items-center gap-4 text-zinc-400">
            <span>Leaflet GPS</span>
            <span>•</span>
            <span>ESP32 Hardware</span>
            <span>•</span>
            <span>Supabase Cloud</span>
          </div>
        </footer>

      </div>
    </section>
  );
}