import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { 
  AlertTriangle, 
  Shield, 
  Lightbulb, 
  HelpCircle,
  Clock,
  CheckCircle,
  Search,
  AlertCircle
} from "lucide-react";

interface FeedbackItem {
  id: string;
  type: 'false-positive' | 'missed-threat' | 'improvement' | 'other';
  url?: string;
  description: string;
  status: 'resolved' | 'investigating' | 'pending';
  timestamp: Date;
}

export function FeedbackSection() {
  const { toast } = useToast();
  const [feedbackType, setFeedbackType] = useState<string>("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");

  const [recentFeedback] = useState<FeedbackItem[]>([
    {
      id: '1',
      type: 'false-positive',
      url: 'legitimate-bank.com',
      description: 'This is a legitimate banking website, not a phishing site',
      status: 'resolved',
      timestamp: new Date(Date.now() - 172800000) // 2 days ago
    },
    {
      id: '2',
      type: 'missed-threat',
      url: 'fake-paypal-signin.net',
      description: 'This phishing site was not detected by the system',
      status: 'investigating',
      timestamp: new Date(Date.now() - 86400000) // 1 day ago
    },
    {
      id: '3',
      type: 'improvement',
      description: 'Add support for checking shortened URLs like bit.ly',
      status: 'pending',
      timestamp: new Date(Date.now() - 43200000) // 12 hours ago
    },
    {
      id: '4',
      type: 'other',
      description: 'Dashboard loads slowly on mobile devices',
      status: 'resolved',
      timestamp: new Date(Date.now() - 21600000) // 6 hours ago
    }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!feedbackType || !description.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // Simulate feedback submission
    toast({
      title: "Feedback Submitted",
      description: "Thank you for your feedback. We'll review it shortly.",
    });

    // Reset form
    setFeedbackType("");
    setUrl("");
    setDescription("");
  };

  const getFeedbackTypeIcon = (type: string) => {
    switch (type) {
      case 'false-positive':
        return <Shield className="h-4 w-4" />;
      case 'missed-threat':
        return <AlertTriangle className="h-4 w-4" />;
      case 'improvement':
        return <Lightbulb className="h-4 w-4" />;
      default:
        return <HelpCircle className="h-4 w-4" />;
    }
  };

  const getFeedbackTypeColor = (type: string) => {
    switch (type) {
      case 'false-positive':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'missed-threat':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'improvement':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      default:
        return 'bg-muted/20 text-muted-foreground border-border';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved':
        return 'bg-success/10 text-success border-success/20';
      case 'investigating':
        return 'bg-warning/10 text-warning border-warning/20';
      default:
        return 'bg-muted/20 text-muted-foreground border-border';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'resolved':
        return <CheckCircle className="h-3 w-3" />;
      case 'investigating':
        return <Search className="h-3 w-3" />;
      default:
        return <AlertCircle className="h-3 w-3" />;
    }
  };

  const getTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diffInMs = now.getTime() - timestamp.getTime();
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInDays > 0) {
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    } else if (diffInHours > 0) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    } else {
      return 'Just now';
    }
  };

  return (
    <section className="py-12 bg-background/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4 gradient-text">Security Feedback Center</h2>
          <p className="text-lg text-muted-foreground">
            Help us improve PhishAlert AI by reporting issues and suggesting enhancements
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Submit Feedback Form */}
          <Card className="bg-card/50 backdrop-blur-lg border border-border/50">
            <CardHeader>
              <CardTitle className="gradient-text flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Submit Feedback
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="feedback-type">Feedback Type *</Label>
                  <Select value={feedbackType} onValueChange={setFeedbackType}>
                    <SelectTrigger className="bg-background/50">
                      <SelectValue placeholder="Select feedback type" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border border-border/50">
                      <SelectItem value="false-positive">False Positive</SelectItem>
                      <SelectItem value="missed-threat">Missed Threat</SelectItem>
                      <SelectItem value="improvement">Improvement</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="url">URL (Optional)</Label>
                  <Input
                    id="url"
                    type="url"
                    placeholder="https://example.com"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="bg-background/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Please provide details about your feedback..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="bg-background/50 min-h-[120px]"
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3"
                >
                  Submit Feedback
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Recent Feedback */}
          <Card className="bg-card/50 backdrop-blur-lg border border-border/50">
            <CardHeader>
              <CardTitle className="gradient-text flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Recent Feedback
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-[500px] overflow-y-auto">
                {recentFeedback.map((feedback) => (
                  <div 
                    key={feedback.id} 
                    className="p-4 bg-muted/20 rounded-lg border border-border/30 hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Badge className={`${getFeedbackTypeColor(feedback.type)} border`}>
                          <div className="flex items-center gap-1">
                            {getFeedbackTypeIcon(feedback.type)}
                            <span className="text-xs font-medium">
                              {feedback.type.replace('-', ' ').toUpperCase()}
                            </span>
                          </div>
                        </Badge>
                        <Badge className={`${getStatusColor(feedback.status)} border`}>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(feedback.status)}
                            <span className="text-xs font-medium">
                              {feedback.status.toUpperCase()}
                            </span>
                          </div>
                        </Badge>
                      </div>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {getTimeAgo(feedback.timestamp)}
                      </span>
                    </div>
                    
                    {feedback.url && (
                      <div className="font-bold text-sm mb-1 text-primary">
                        {feedback.url}
                      </div>
                    )}
                    
                    <p className="text-sm text-muted-foreground">
                      {feedback.description}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}