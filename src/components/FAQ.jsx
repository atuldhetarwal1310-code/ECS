import { useState } from "react";

export default function FAQ() {
  const faqs = [
    {
      question: "What is PRAESIDIUM?",
      answer:
        "PRAESIDIUM is a smart wearable designed to help visually impaired individuals navigate safely using intelligent sensors and emergency features.",
    },
    {
      question: "How does obstacle detection work?",
      answer:
        "Ultrasonic sensors continuously scan the surroundings and alert the user through vibrations whenever an obstacle is detected.",
    },
    {
      question: "Does it support emergency situations?",
      answer:
        "Yes. PRAESIDIUM includes SOS functionality and fall detection to improve user safety.",
    },
    {
      question: "Who can use PRAESIDIUM?",
      answer:
        "It is designed primarily for visually impaired individuals but can also assist elderly users requiring additional mobility support.",
    },
  ];

  const [open, setOpen] = useState(null);

  return (
    <section className="py-24 px-8 bg-slate-950">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-14">
          Frequently Asked <span className="text-cyan-400">Questions</span>
        </h2>

        {faqs.map((faq, index) => (
          <div
            key={index}
            className="mb-5 border border-slate-800 rounded-xl overflow-hidden"
          >
            <button
              onClick={() => setOpen(open === index ? null : index)}
              className="w-full text-left px-6 py-5 bg-slate-900 hover:bg-slate-800 flex justify-between items-center"
            >
              <span className="font-semibold">{faq.question}</span>
              <span>{open === index ? "−" : "+"}</span>
            </button>

            {open === index && (
              <div className="px-6 py-5 text-gray-400 bg-slate-900 border-t border-slate-800">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}