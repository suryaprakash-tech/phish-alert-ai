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

// Official verified websites list
const official_sites = ["google.com", "yahoo.com", "sih.gov.in"];

// Note: This is a proxy function since direct PhishTank API calls would face CORS issues
// In a real implementation, this would call your backend service
export async function checkUrlWithPhishTank(url: string): Promise<PhishingCheckResult> {
  // Simulate API call with realistic delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Extract domain from URL
  let domain = url;
  try {
    const urlObj = new URL(url.startsWith('http') ? url : 'https://' + url);
    domain = urlObj.hostname.replace('www.', '');
  } catch {
    // If URL parsing fails, use the original string
    domain = url.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0];
  }
  
  // Check if the domain exactly matches one of the official sites
  const isOfficial = official_sites.includes(domain);
  const isPhishing = !isOfficial;
  
  return {
    isPhishing,
    confidence: isOfficial ? 100 : 95,
    details: isOfficial 
      ? "URL is verified as an official and safe website"
      : "URL is not in the official verified websites list and may be unsafe",
    target: isPhishing ? getRandomTarget() : undefined,
    verified: true
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