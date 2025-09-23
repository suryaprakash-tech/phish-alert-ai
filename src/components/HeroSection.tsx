import { Shield, AlertTriangle, Globe, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function HeroSection() {
  const scrollToChecker = () => {
    const element = document.getElementById('checker');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted to-background"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex justify-center mb-6 animate-fade-in">
            <div className="relative">
              <Shield className="h-16 w-16 text-primary animate-glow pulse-neon" />
              <div className="absolute inset-0 animate-ping">
                <Shield className="h-16 w-16 text-primary/30" />
              </div>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 gradient-text animate-fade-in" style={{ animationDelay: '0.2s' }}>
            PhishAlert AI
          </h1>
          
          <p className="text-lg md:text-xl text-primary/80 mb-2 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            Real-Time Phishing Detection Powered by AI
          </p>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            Protect yourself from cyber threats with advanced AI-powered detection
          </p>
          
          <div className="mb-12 animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <Button 
              size="lg" 
              onClick={scrollToChecker}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold hover-lift neon-glow group relative overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Scan URL Now
              </span>
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <Card className="bg-card/30 backdrop-blur-lg border border-destructive/30 hover-lift group animate-fade-in" style={{ animationDelay: '1s' }}>
              <CardContent className="p-6 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-destructive/5 to-transparent"></div>
                <AlertTriangle className="h-12 w-12 text-destructive mx-auto mb-4 relative z-10 group-hover:animate-pulse" />
                <h3 className="text-lg font-semibold mb-2 relative z-10">Phishing Threats</h3>
                <p className="text-sm text-muted-foreground relative z-10">
                  Over 3.4 billion phishing emails are sent daily, targeting sensitive information
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/30 backdrop-blur-lg border border-primary/30 hover-lift group animate-fade-in" style={{ animationDelay: '1.2s' }}>
              <CardContent className="p-6 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>
                <Shield className="h-12 w-12 text-primary mx-auto mb-4 relative z-10 group-hover:neon-glow" />
                <h3 className="text-lg font-semibold mb-2 relative z-10">AI Protection</h3>
                <p className="text-sm text-muted-foreground relative z-10">
                  Advanced machine learning algorithms analyze URLs in real-time for maximum security
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/30 backdrop-blur-lg border border-success/30 hover-lift group animate-fade-in" style={{ animationDelay: '1.4s' }}>
              <CardContent className="p-6 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-success/5 to-transparent"></div>
                <Globe className="h-12 w-12 text-success mx-auto mb-4 relative z-10 group-hover:animate-spin" />
                <h3 className="text-lg font-semibold mb-2 relative z-10">Stay Secure</h3>
                <p className="text-sm text-muted-foreground relative z-10">
                  Verify URLs before clicking to protect your personal and financial information
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}