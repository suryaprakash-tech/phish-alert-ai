import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  BarChart3, 
  TrendingUp, 
  Users, 
  Globe,
  Clock,
  Database,
  Wifi,
  WifiOff
} from "lucide-react";

interface DetectionStat {
  id: string;
  url: string;
  result: 'safe' | 'phishing';
  timestamp: Date;
  confidence: number;
  target?: string;
}

interface DashboardMetrics {
  totalScans: number;
  phishingDetected: number;
  safeUrls: number;
  avgConfidence: number;
  dailyScans: number;
  offlineDetections: number;
}

export function SecurityDashboard() {
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    totalScans: 1247,
    phishingDetected: 89,
    safeUrls: 1158,
    avgConfidence: 94.2,
    dailyScans: 156,
    offlineDetections: 23
  });

  const [recentDetections, setRecentDetections] = useState<DetectionStat[]>([
    {
      id: '1',
      url: 'google.com',
      result: 'safe',
      timestamp: new Date(),
      confidence: 100
    },
    {
      id: '2',
      url: 'fake-paypal-login.com',
      result: 'phishing',
      timestamp: new Date(Date.now() - 300000),
      confidence: 95,
      target: 'PayPal'
    },
    {
      id: '3',
      url: 'yahoo.com',
      result: 'safe',
      timestamp: new Date(Date.now() - 600000),
      confidence: 100
    },
    {
      id: '4',
      url: 'suspicious-bank.net',
      result: 'phishing',
      timestamp: new Date(Date.now() - 900000),
      confidence: 98,
      target: 'Banking Services'
    }
  ]);

  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const safetyRate = ((metrics.safeUrls / metrics.totalScans) * 100).toFixed(1);
  const threatRate = ((metrics.phishingDetected / metrics.totalScans) * 100).toFixed(1);

  return (
    <section id="dashboard" className="py-20 relative bg-background/50">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/10 to-transparent"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">Security Dashboard</h2>
          <p className="text-lg text-muted-foreground">
            Real-time analytics and threat intelligence for comprehensive security monitoring
          </p>
        </div>

        {/* Connection Status */}
        <Alert className={`mb-6 border-2 ${isOnline ? 'border-success bg-success/5' : 'border-warning bg-warning/5'}`}>
          <div className="flex items-center gap-2">
            {isOnline ? <Wifi className="h-4 w-4 text-success" /> : <WifiOff className="h-4 w-4 text-warning" />}
            <AlertDescription>
              {isOnline ? 'Online - Real-time protection active' : 'Offline - Using cached threat patterns'}
            </AlertDescription>
          </div>
        </Alert>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-card/50 backdrop-blur-lg border border-border/50 hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Scans</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold gradient-text">{metrics.totalScans.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline h-3 w-3 mr-1" />
                +{metrics.dailyScans} today
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-lg border border-border/50 hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Threats Detected</CardTitle>
              <AlertTriangle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">{metrics.phishingDetected}</div>
              <p className="text-xs text-muted-foreground">
                {threatRate}% of total scans
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-lg border border-border/50 hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Safe URLs</CardTitle>
              <CheckCircle className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">{metrics.safeUrls.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                {safetyRate}% safety rate
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-lg border border-border/50 hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Confidence</CardTitle>
              <Shield className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold gradient-text">{metrics.avgConfidence}%</div>
              <Progress value={metrics.avgConfidence} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        {/* Dashboard Tabs */}
        <Tabs defaultValue="detections" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="detections">Recent Detections</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="patterns">Threat Patterns</TabsTrigger>
          </TabsList>

          <TabsContent value="detections" className="space-y-4">
            <Card className="bg-card/50 backdrop-blur-lg border border-border/50">
              <CardHeader>
                <CardTitle className="gradient-text">Recent Security Detections</CardTitle>
                <CardDescription>Latest URL security analysis results with explainable alerts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentDetections.map((detection) => (
                    <div key={detection.id} className="flex items-center justify-between p-4 bg-muted/20 rounded-lg border border-border/30">
                      <div className="flex items-center space-x-4">
                        {detection.result === 'safe' ? (
                          <CheckCircle className="h-5 w-5 text-success" />
                        ) : (
                          <AlertTriangle className="h-5 w-5 text-destructive" />
                        )}
                        <div>
                          <p className="font-medium">{detection.url}</p>
                          <p className="text-sm text-muted-foreground">
                            {detection.result === 'phishing' && detection.target && `Targets: ${detection.target} • `}
                            Confidence: {detection.confidence}%
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={detection.result === 'safe' ? 'default' : 'destructive'}>
                          {detection.result === 'safe' ? 'SAFE' : 'THREAT'}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">
                          <Clock className="inline h-3 w-3 mr-1" />
                          {detection.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-card/50 backdrop-blur-lg border border-border/50">
                <CardHeader>
                  <CardTitle className="gradient-text">Detection Trends</CardTitle>
                  <CardDescription>Security analysis trends over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Safe URLs</span>
                      <span className="text-success font-bold">{safetyRate}%</span>
                    </div>
                    <Progress value={parseFloat(safetyRate)} className="h-2" />
                    
                    <div className="flex justify-between items-center">
                      <span>Phishing Detected</span>
                      <span className="text-destructive font-bold">{threatRate}%</span>
                    </div>
                    <Progress value={parseFloat(threatRate)} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-lg border border-border/50">
                <CardHeader>
                  <CardTitle className="gradient-text">System Performance</CardTitle>
                  <CardDescription>Real-time system status and capabilities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Database className="h-4 w-4 text-primary" />
                        <span>Pattern Database</span>
                      </div>
                      <Badge variant="default">Up to Date</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-primary" />
                        <span>Real-time API</span>
                      </div>
                      <Badge variant={isOnline ? "default" : "secondary"}>
                        {isOnline ? "Online" : "Offline"}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-primary" />
                        <span>Active Users</span>
                      </div>
                      <span className="font-bold">247</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="patterns" className="space-y-4">
            <Card className="bg-card/50 backdrop-blur-lg border border-border/50">
              <CardHeader>
                <CardTitle className="gradient-text">Cached Threat Patterns</CardTitle>
                <CardDescription>Offline detection capabilities for low-connectivity environments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-muted/20 rounded-lg border border-border/30">
                    <h4 className="font-semibold mb-2">Known Phishing Indicators</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Suspicious domain patterns</li>
                      <li>• URL shortening services</li>
                      <li>• Misspelled brand names</li>
                      <li>• Non-HTTPS protocols</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-muted/20 rounded-lg border border-border/30">
                    <h4 className="font-semibold mb-2">Verified Safe Domains</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• google.com ✓</li>
                      <li>• yahoo.com ✓</li>
                      <li>• sih.gov.in ✓</li>
                      <li>• + {metrics.offlineDetections} more cached</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-success/10 border border-success/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-4 w-4 text-success" />
                    <span className="font-semibold text-success">Offline Protection Active</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Local threat patterns ensure security even without internet connectivity
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

      </div>
    </section>
  );
}