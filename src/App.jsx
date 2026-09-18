import FloatingWatch from "./components/FloatingWatch";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import SafetyFeatures from "./components/SafetyFeatures";
import WhyChoose from "./components/WhyChoose";
import Impact from "./components/Impact";
import Demo from "./components/Demo";
import FAQ from "./components/FAQ";
import AuthDrawer from "./components/AuthDrawer";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#0F172A] to-[#1E3A8A] text-white relative">
        <Navbar />
        <Hero />
        <Features />
        <HowItWorks />
        <SafetyFeatures />
        <WhyChoose />
        <Impact />
        <Demo />
        <FAQ />
        <FloatingWatch />
        <AuthDrawer />
      </div>
    </AuthProvider>
  );
}

export default App;