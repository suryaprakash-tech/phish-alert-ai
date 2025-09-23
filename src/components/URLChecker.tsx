import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, AlertTriangle, CheckCircle, Loader2, ExternalLink } from "lucide-react";
import { checkUrlWithPhishTank, PhishingCheckResult } from "@/services/phishTankApi";
import { useToast } from "@/hooks/use-toast";

export function URLChecker() {
  const [url, setUrl] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [result, setResult] = useState<PhishingCheckResult | null>(null);
  const { toast } = useToast();

  const isValidUrl = (urlString: string) => {
    try {
      new URL(urlString);
      return true;
    } catch {
      return false;
    }
  };

  const handleCheck = async () => {
    if (!url.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a URL to check"
      });
      return;
    }

    if (!isValidUrl(url)) {
      toast({
        variant: "destructive",
        title: "Invalid URL",
        description: "Please enter a valid URL (e.g., https://example.com)"
      });
      return;
    }

    setIsChecking(true);
    setResult(null);

    try {
      const checkResult = await checkUrlWithPhishTank(url);
      setResult(checkResult);
      
      toast({
        title: "Analysis Complete",
        description: checkResult.isPhishing 
          ? "⚠️ Potential phishing site detected" 
          : "✅ URL appears to be safe",
        variant: checkResult.isPhishing ? "destructive" : "default"
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to analyze URL. Please try again."
      });
    } finally {
      setIsChecking(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isChecking) {
      handleCheck();
    }
  };

  return (
    <section id="checker" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/20 to-transparent"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">URL Security Scanner</h2>
            <p className="text-lg text-muted-foreground">
              Analyze any URL with our advanced AI-powered detection system
            </p>
          </div>

          <Card className="mb-8 bg-card/50 backdrop-blur-lg border border-border/50 hover-lift animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 gradient-text">
                <Shield className="h-5 w-5" />
                AI Security Analysis
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Paste any URL below for instant AI-powered phishing detection
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="https://suspicious-site.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={isChecking}
                  className="flex-1 bg-input/50 border-border/50 focus:border-primary focus:neon-glow transition-all duration-300"
                />
                <Button 
                  onClick={handleCheck} 
                  disabled={isChecking}
                  className="bg-primary hover:bg-primary/90 neon-glow hover-lift relative overflow-hidden group"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="relative flex items-center">
                    {isChecking ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Scanning...
                      </>
                    ) : (
                      <>
                        <Shield className="h-4 w-4 mr-2" />
                        Scan URL
                      </>
                    )}
                  </span>
                </Button>
              </div>

              {isChecking && (
                <div className="text-center py-8 animate-fade-in">
                  <div className="relative">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
                    <div className="absolute inset-0 animate-ping">
                      <Loader2 className="h-8 w-8 text-primary/30 mx-auto" />
                    </div>
                  </div>
                  <p className="text-muted-foreground animate-pulse">
                    AI is analyzing URL patterns and threat signatures...
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {result && (
            <Card className={`border-2 backdrop-blur-lg animate-fade-in hover-lift ${
              result.isPhishing 
                ? 'border-destructive neon-glow-destructive bg-destructive/5' 
                : 'border-success neon-glow-success bg-success/5'
            }`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {result.isPhishing ? (
                    <>
                      <AlertTriangle className="h-5 w-5 text-destructive animate-pulse" />
                      <span className="text-destructive font-bold">⚠️ PHISHING DETECTED</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-5 w-5 text-success animate-pulse" />
                      <span className="text-success font-bold">✅ URL SECURE</span>
                    </>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert variant={result.isPhishing ? "destructive" : "default"} className="border-0 bg-transparent">
                  <AlertDescription className="text-base">
                    {result.details}
                  </AlertDescription>
                </Alert>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-muted/30 rounded-lg border border-border/50">
                    <p className="text-sm font-medium text-muted-foreground">Confidence Score</p>
                    <p className="text-3xl font-bold gradient-text">{result.confidence}%</p>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-lg border border-border/50">
                    <p className="text-sm font-medium text-muted-foreground">Verification Status</p>
                    <p className="text-lg font-semibold">{result.verified ? "✅ Verified" : "⏳ Pending"}</p>
                  </div>
                </div>

                {result.target && (
                  <div className="p-4 bg-muted/30 rounded-lg border border-border/50">
                    <p className="text-sm font-medium mb-2 text-muted-foreground">Targeted Service</p>
                    <p className="text-base font-semibold text-accent">{result.target}</p>
                  </div>
                )}

                <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/20 p-3 rounded-lg">
                  <ExternalLink className="h-4 w-4" />
                  <span className="break-all">{url}</span>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
}