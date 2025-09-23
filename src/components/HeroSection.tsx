import { Shield, AlertTriangle, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function HeroSection() {
  const scrollToChecker = () => {
    const element = document.getElementById('checker');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="py-20 bg-gradient-to-br from-background to-muted">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <Shield className="h-16 w-16 text-primary" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-br from-primary to-blue-600 bg-clip-text text-transparent">
            Real-time Phishing Detection via AI/ML
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            Protect yourself and your organization from cyber threats with our advanced AI-powered phishing detection system
          </p>
          
          <div className="mb-12">
            <Button 
              size="lg" 
              onClick={scrollToChecker}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg"
            >
              Check URL Now
            </Button>
          </div>

          {/* Phishing Awareness Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <Card className="bg-card/50 backdrop-blur border-destructive/20">
              <CardContent className="p-6 text-center">
                <AlertTriangle className="h-12 w-12 text-destructive mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Phishing Threats</h3>
                <p className="text-sm text-muted-foreground">
                  Over 3.4 billion phishing emails are sent daily, targeting sensitive information
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur border-primary/20">
              <CardContent className="p-6 text-center">
                <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">AI Protection</h3>
                <p className="text-sm text-muted-foreground">
                  Advanced machine learning algorithms analyze URLs in real-time for maximum security
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur border-success/20">
              <CardContent className="p-6 text-center">
                <Globe className="h-12 w-12 text-success mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Stay Secure</h3>
                <p className="text-sm text-muted-foreground">
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