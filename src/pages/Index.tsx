import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { Services } from "@/components/Services";
import FloatingCVButton from "@/components/FloatingCVButton";

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      <Navigation />
      <main>
        <HeroSection />
        <ProjectsSection />
        <About />
        <Services />
        <Contact />
      </main>
      <Footer />
      <FloatingCVButton />
    </div>
  );
};

export default Index;
