import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Hardware from "./components/Hardware";
import HowItWorks from "./components/HowItWorks";
import SafetyFeatures from "./components/SafetyFeatures";
import WhyChoose from "./components/WhyChoose";
import Impact from "./components/Impact";
import Demo from "./components/Demo";
import Challenges from "./components/Challenges";
import FAQ from "./components/FAQ";
import VisionMission from "./components/VisionMission";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <Hardware />
      <HowItWorks />
      <SafetyFeatures />
      <WhyChoose />
      <Impact />
      <Demo />
      <Challenges />
      <FAQ />
      <VisionMission />
    </>
  );
}
