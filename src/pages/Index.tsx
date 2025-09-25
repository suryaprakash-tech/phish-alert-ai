import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { URLChecker } from "@/components/URLChecker";
import { SecurityDashboard } from "@/components/SecurityDashboard";
import { FeaturesSection } from "@/components/FeaturesSection";
import { AboutSection } from "@/components/AboutSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <URLChecker />
        <SecurityDashboard />
        <FeaturesSection />
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
