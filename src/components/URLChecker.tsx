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
    <section id="checker" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">URL Security Checker</h2>
            <p className="text-lg text-muted-foreground">
              Enter any URL to check if it's a potential phishing site
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Analyze URL
              </CardTitle>
              <CardDescription>
                Paste the suspicious URL below for real-time AI analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="https://example.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={isChecking}
                  className="flex-1"
                />
                <Button 
                  onClick={handleCheck} 
                  disabled={isChecking}
                  className="bg-primary hover:bg-primary/90"
                >
                  {isChecking ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Shield className="h-4 w-4 mr-2" />
                      Check URL
                    </>
                  )}
                </Button>
              </div>

              {isChecking && (
                <div className="text-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
                  <p className="text-muted-foreground">
                    Analyzing URL with AI/ML algorithms...
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {result && (
            <Card className={`border-2 ${result.isPhishing ? 'border-destructive' : 'border-success'}`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {result.isPhishing ? (
                    <>
                      <AlertTriangle className="h-5 w-5 text-destructive" />
                      <span className="text-destructive">Phishing Detected</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-5 w-5 text-success" />
                      <span className="text-success">URL Safe</span>
                    </>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert variant={result.isPhishing ? "destructive" : "default"}>
                  <AlertDescription>
                    {result.details}
                  </AlertDescription>
                </Alert>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">Confidence Score</p>
                    <p className="text-2xl font-bold">{result.confidence}%</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Verification Status</p>
                    <p className="text-sm">{result.verified ? "✅ Verified" : "⏳ Pending"}</p>
                  </div>
                </div>

                {result.target && (
                  <div>
                    <p className="text-sm font-medium mb-1">Targeted Service</p>
                    <p className="text-sm text-muted-foreground">{result.target}</p>
                  </div>
                )}

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
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