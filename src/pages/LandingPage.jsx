import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import SafetyFeatures from "../components/SafetyFeatures";
import WhyChoose from "../components/WhyChoose";
import Impact from "../components/Impact";
import Demo from "../components/Demo";
import FAQ from "../components/FAQ";
import FloatingWatch from "../components/FloatingWatch";
import AuthDrawer from "../components/AuthDrawer";

export default function LandingPage() {
  return (
    <>
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
    </>
  );
}
