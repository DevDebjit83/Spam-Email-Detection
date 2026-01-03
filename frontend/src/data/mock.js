// Mock data for Email Spam Detection App

export const mockSpamResults = {
  spam: {
    isSpam: true,
    confidence: 94.7,
    label: "SPAM DETECTED",
    message: "This email contains suspicious patterns commonly associated with spam.",
    detectedPatterns: [
      "Suspicious sender domain",
      "Excessive promotional keywords",
      "Known phishing patterns",
      "Suspicious links detected"
    ]
  },
  notSpam: {
    isSpam: false,
    confidence: 98.2,
    label: "SAFE EMAIL",
    message: "This email appears to be legitimate and safe.",
    detectedPatterns: [
      "Verified sender domain",
      "Normal communication patterns",
      "No malicious links",
      "Trusted sender history"
    ]
  }
};

export const mockFeatures = [
  {
    id: 1,
    title: "NLP-Based Filtering",
    description: "Advanced Natural Language Processing algorithms analyze email content for semantic spam patterns.",
    icon: "Brain"
  },
  {
    id: 2,
    title: "99.2% Accuracy",
    description: "Our ML model achieves industry-leading accuracy through continuous learning and refinement.",
    icon: "Target"
  },
  {
    id: 3,
    title: "Real-Time Analysis",
    description: "Instant spam detection with sub-second response times for seamless email protection.",
    icon: "Zap"
  },
  {
    id: 4,
    title: "Zero Data Storage",
    description: "Your emails are analyzed in real-time and never stored on our servers. Complete privacy guaranteed.",
    icon: "Shield"
  },
  {
    id: 5,
    title: "Multi-Language Support",
    description: "Detect spam in 50+ languages with our multilingual NLP engine.",
    icon: "Globe"
  },
  {
    id: 6,
    title: "API Integration",
    description: "Easy-to-use REST API for seamless integration with your existing email infrastructure.",
    icon: "Code"
  }
];

export const mockSteps = [
  {
    id: 1,
    title: "Email Input",
    description: "Paste or type your email content into our secure analyzer.",
    icon: "Mail"
  },
  {
    id: 2,
    title: "Feature Extraction",
    description: "Our AI extracts key features: sender info, content patterns, links, and metadata.",
    icon: "Cpu"
  },
  {
    id: 3,
    title: "ML Classification",
    description: "Advanced neural networks classify the email using trained spam patterns.",
    icon: "Network"
  },
  {
    id: 4,
    title: "Instant Results",
    description: "Get clear spam/safe verdict with confidence score and detailed analysis.",
    icon: "CheckCircle"
  }
];

export const mockStats = [
  { label: "Emails Analyzed", value: "2.5M+", suffix: "" },
  { label: "Spam Blocked", value: "847K", suffix: "+" },
  { label: "Accuracy Rate", value: "99.2", suffix: "%" },
  { label: "Response Time", value: "<50", suffix: "ms" }
];

export const sampleEmails = {
  spam: `Subject: URGENT!!! You've Won $1,000,000!!!

Dear Winner,

Congratulations! You have been selected as our GRAND PRIZE WINNER!

Click here immediately to claim your $1,000,000 prize: http://suspicious-link.xyz/claim

ACT NOW! This offer expires in 24 hours!

Send us your bank details to receive your winnings.

Best regards,
Lottery Commission`,
  safe: `Subject: Team Meeting Tomorrow at 2 PM

Hi Team,

Just a reminder that we have our weekly standup meeting tomorrow at 2 PM in the main conference room.

Please come prepared to share:
- Your progress this week
- Any blockers you're facing
- Plans for next week

Let me know if you have any conflicts.

Best,
Sarah`
};
