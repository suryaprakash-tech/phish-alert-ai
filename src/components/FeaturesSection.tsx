import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Zap, 
  Brain, 
  Shield, 
  Clock, 
  Database, 
  TrendingUp,
  Users,
  Globe
} from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: Zap,
      title: "Real-time Detection",
      description: "Instant URL analysis with sub-second response times for immediate threat identification.",
      color: "text-yellow-500"
    },
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "Advanced machine learning algorithms trained on millions of phishing patterns and legitimate sites.",
      color: "text-primary"
    },
    {
      icon: Shield,
      title: "Multi-layer Security",
      description: "Combines multiple detection methods including domain analysis, content inspection, and reputation scoring.",
      color: "text-success"
    },
    {
      icon: Clock,
      title: "24/7 Protection",
      description: "Continuous monitoring and updates to protect against the latest phishing threats and attack vectors.",
      color: "text-blue-500"
    },
    {
      icon: Database,
      title: "Threat Intelligence",
      description: "Leverages PhishTank database and other threat intelligence sources for comprehensive coverage.",
      color: "text-purple-500"
    },
    {
      icon: TrendingUp,
      title: "High Accuracy",
      description: "Over 95% accuracy rate in identifying phishing sites with minimal false positives.",
      color: "text-green-500"
    },
    {
      icon: Users,
      title: "User-Friendly",
      description: "Simple interface designed for both technical and non-technical users with clear, actionable results.",
      color: "text-orange-500"
    },
    {
      icon: Globe,
      title: "Global Coverage",
      description: "Analyzes URLs from all regions and languages, providing worldwide phishing protection.",
      color: "text-cyan-500"
    }
  ];

  return (
    <section id="features" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Advanced Security Features
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our AI-powered platform combines cutting-edge technology with comprehensive threat intelligence 
            to provide unmatched phishing detection capabilities.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className="bg-background/60 backdrop-blur border-border/50 hover:border-primary/20 transition-colors">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <IconComponent className={`h-8 w-8 ${feature.color}`} />
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Statistics Section */}
        <div className="mt-16 grid md:grid-cols-4 gap-8 text-center">
          <div>
            <h3 className="text-3xl font-bold text-primary">95%+</h3>
            <p className="text-muted-foreground">Detection Accuracy</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-primary">&lt;1s</h3>
            <p className="text-muted-foreground">Response Time</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-primary">1M+</h3>
            <p className="text-muted-foreground">URLs Analyzed</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-primary">24/7</h3>
            <p className="text-muted-foreground">Threat Monitoring</p>
          </div>
        </div>
      </div>
    </section>
  );
}