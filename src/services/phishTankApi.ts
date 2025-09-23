export interface PhishTankResponse {
  results: {
    url: string;
    valid: string;
    phish_id?: string;
    phish_detail_url?: string;
    submission_time?: string;
    verified?: string;
    verification_time?: string;
    online?: string;
    target?: string;
  };
}

export interface PhishingCheckResult {
  isPhishing: boolean;
  confidence: number;
  details: string;
  target?: string;
  verified: boolean;
}

// Note: This is a proxy function since direct PhishTank API calls would face CORS issues
// In a real implementation, this would call your backend service
export async function checkUrlWithPhishTank(url: string): Promise<PhishingCheckResult> {
  // Simulate API call with realistic delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Mock response based on common phishing patterns
  const suspiciousPatterns = [
    'bit.ly',
    'tinyurl.com',
    'secure-bank-login',
    'paypal-verify',
    'amazon-security',
    'microsoft-account',
    'google-docs-share',
    'facebook-security'
  ];
  
  const lowerUrl = url.toLowerCase();
  const hasSuspiciousPattern = suspiciousPatterns.some(pattern => 
    lowerUrl.includes(pattern)
  );
  
  // Check for suspicious domain patterns
  const isPhishing = hasSuspiciousPattern || Math.random() < 0.3; // 30% chance for demo
  
  return {
    isPhishing,
    confidence: isPhishing ? Math.floor(Math.random() * 30) + 70 : Math.floor(Math.random() * 20) + 80,
    details: isPhishing 
      ? "URL matches known phishing patterns or suspicious domain characteristics"
      : "URL appears to be legitimate based on security analysis",
    target: isPhishing ? getRandomTarget() : undefined,
    verified: Math.random() > 0.2 // 80% chance of being verified
  };
}

function getRandomTarget(): string {
  const targets = [
    "Banking Services",
    "PayPal",
    "Microsoft",
    "Google",
    "Amazon",
    "Facebook",
    "Apple ID",
    "Government Services"
  ];
  return targets[Math.floor(Math.random() * targets.length)];
}

// Real PhishTank API integration (for backend use)
export async function checkUrlWithPhishTankAPI(
  url: string, 
  appKey?: string
): Promise<PhishTankResponse> {
  const formData = new FormData();
  formData.append('url', encodeURIComponent(url));
  formData.append('format', 'json');
  if (appKey) {
    formData.append('app_key', appKey);
  }

  const response = await fetch('http://checkurl.phishtank.com/checkurl/', {
    method: 'POST',
    headers: {
      'User-Agent': 'phishtank/ai-phishing-detector'
    },
    body: formData
  });

  if (!response.ok) {
    throw new Error('PhishTank API request failed');
  }

  return response.json();
}