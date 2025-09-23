import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  Database, 
  Cpu, 
  Network, 
  Target,
  BarChart3,
  Shield,
  Code
} from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How Our AI/ML Model Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our phishing detection system combines advanced machine learning algorithms with comprehensive 
            threat intelligence to provide accurate, real-time URL security analysis.
          </p>
        </div>

        <Tabs defaultValue="model" className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="model" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              AI Model
            </TabsTrigger>
            <TabsTrigger value="datasets" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              Datasets
            </TabsTrigger>
            <TabsTrigger value="methodology" className="flex items-center gap-2">
              <Cpu className="h-4 w-4" />
              Methodology
            </TabsTrigger>
            <TabsTrigger value="integration" className="flex items-center gap-2">
              <Network className="h-4 w-4" />
              Integration
            </TabsTrigger>
          </TabsList>

          <TabsContent value="model" className="mt-8">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-primary" />
                    Machine Learning Architecture
                  </CardTitle>
                  <CardDescription>
                    Multi-layered neural network designed for URL threat detection
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Model Components:</h4>
                    <div className="space-y-2">
                      <Badge variant="outline">Random Forest Classifier</Badge>
                      <Badge variant="outline">Neural Network (TensorFlow)</Badge>
                      <Badge variant="outline">Natural Language Processing</Badge>
                      <Badge variant="outline">Feature Engineering Pipeline</Badge>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Key Features:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Domain reputation analysis</li>
                      <li>• URL structure pattern recognition</li>
                      <li>• Content-based classification</li>
                      <li>• Behavioral analysis algorithms</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-success" />
                    Performance Metrics
                  </CardTitle>
                  <CardDescription>
                    Validated performance across multiple test scenarios
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Accuracy</span>
                      <Badge className="bg-success text-success-foreground">95.8%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Precision</span>
                      <Badge className="bg-success text-success-foreground">94.2%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Recall</span>
                      <Badge className="bg-success text-success-foreground">96.1%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>F1-Score</span>
                      <Badge className="bg-success text-success-foreground">95.1%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>False Positive Rate</span>
                      <Badge variant="outline">2.1%</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="datasets" className="mt-8">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5 text-primary" />
                    Training Data Sources
                  </CardTitle>
                  <CardDescription>
                    Comprehensive datasets used for model training and validation
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Primary Sources:</h4>
                    <ul className="text-sm space-y-2">
                      <li className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-primary" />
                        <span><strong>PhishTank:</strong> 500K+ verified phishing URLs</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-primary" />
                        <span><strong>OpenPhish:</strong> Real-time phishing feed</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-primary" />
                        <span><strong>Alexa Top Sites:</strong> 1M+ legitimate URLs</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-primary" />
                        <span><strong>Custom Crawling:</strong> Domain characteristics</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-success" />
                    Data Processing Pipeline
                  </CardTitle>
                  <CardDescription>
                    Advanced preprocessing and feature extraction workflow
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">1</div>
                      <div>
                        <h5 className="font-medium">Data Collection</h5>
                        <p className="text-xs text-muted-foreground">Automated harvesting from multiple sources</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">2</div>
                      <div>
                        <h5 className="font-medium">Feature Extraction</h5>
                        <p className="text-xs text-muted-foreground">URL parsing, domain analysis, content features</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">3</div>
                      <div>
                        <h5 className="font-medium">Data Cleaning</h5>
                        <p className="text-xs text-muted-foreground">Deduplication, validation, normalization</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">4</div>
                      <div>
                        <h5 className="font-medium">Model Training</h5>
                        <p className="text-xs text-muted-foreground">Cross-validation and hyperparameter tuning</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="methodology" className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cpu className="h-5 w-5 text-primary" />
                  Detection Methodology
                </CardTitle>
                <CardDescription>
                  Comprehensive approach combining multiple analysis techniques
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid lg:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-primary">1. URL Analysis</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Domain age and reputation</li>
                      <li>• SSL certificate validation</li>
                      <li>• URL structure patterns</li>
                      <li>• Subdomain analysis</li>
                      <li>• Redirect chain inspection</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-primary">2. Content Analysis</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• HTML structure analysis</li>
                      <li>• Keyword pattern matching</li>
                      <li>• Image similarity detection</li>
                      <li>• Form field analysis</li>
                      <li>• JavaScript behavior</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-primary">3. Intelligence Feeds</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Real-time threat feeds</li>
                      <li>• Reputation databases</li>
                      <li>• Blacklist verification</li>
                      <li>• Community reporting</li>
                      <li>• Historical data analysis</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="integration" className="mt-8">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Network className="h-5 w-5 text-primary" />
                    API Integration
                  </CardTitle>
                  <CardDescription>
                    Easy integration with existing security infrastructure
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Supported Integrations:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <Badge variant="outline">REST API</Badge>
                      <Badge variant="outline">GraphQL</Badge>
                      <Badge variant="outline">Webhooks</Badge>
                      <Badge variant="outline">WebSocket</Badge>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Security Standards:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• OAuth 2.0 authentication</li>
                      <li>• Rate limiting protection</li>
                      <li>• HTTPS encryption</li>
                      <li>• API key management</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5 text-success" />
                    Implementation Example
                  </CardTitle>
                  <CardDescription>
                    Sample code for PhishTank API integration
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted/50 rounded-lg p-4">
                    <pre className="text-sm overflow-x-auto">
                      <code>{`// Example API call
const response = await fetch(
  'http://checkurl.phishtank.com/checkurl/',
  {
    method: 'POST',
    headers: {
      'User-Agent': 'phishtank/your_app'
    },
    body: new FormData([
      ['url', 'https://example.com'],
      ['format', 'json'],
      ['app_key', 'your_api_key']
    ])
  }
);

const result = await response.json();
console.log(result.results.valid);`}</code>
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}