import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Hardware from "./components/Hardware";
import HowItWorks from "./components/HowItWorks";
import SafetyFeatures from "./components/SafetyFeatures";
import WhyChoose from "./components/WhyChoose";
import Impact from "./components/Impact";
import Demo from "./components/Demo";
import FAQ from "./components/FAQ";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#0F172A] to-[#1E3A8A] text-white">
      <Navbar />
      <Hero />
      <Features />
      <Hardware />
      <HowItWorks />
      <SafetyFeatures />
      <WhyChoose />
      <Impact />
      <Demo />
      <FAQ />
      
    </div>
  );
}

export default App;