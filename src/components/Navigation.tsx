import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navigation() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-primary" />
            <h1 className="text-xl font-bold">PhishGuard AI</h1>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <Button 
              variant="ghost" 
              onClick={() => scrollToSection('home')}
              className="text-foreground hover:text-primary"
            >
              Home
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => scrollToSection('checker')}
              className="text-foreground hover:text-primary"
            >
              URL Checker
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => scrollToSection('features')}
              className="text-foreground hover:text-primary"
            >
              Features
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => scrollToSection('about')}
              className="text-foreground hover:text-primary"
            >
              About
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}