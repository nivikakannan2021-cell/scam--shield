/**
 * Mock data for ScamShield AI
 * Provides realistic pre-seeded analyses and test samples.
 */

export const SAMPLE_MESSAGES = {
  bankKyc: {
    title: "Urgent Bank KYC Scam",
    text: "URGENT! Your bank account will be blocked today due to incomplete KYC. Click the verification link immediately and enter your account number, password and OTP to avoid suspension."
  },
  lottery: {
    title: "International Mega Prize Fraud",
    text: "CONGRATULATIONS! You have been selected as the $2,500,000 cash winner in the 2026 Global Tech Draw! To claim your funds immediately, wire a refundable processing fee of $250 via cryptocurrency to our claims officer."
  },
  phishing: {
    title: "Streaming Account Suspension Phishing",
    text: "Account Alert: Your streaming membership failed to renew. Access will be terminated within 12 hours. Update billing info now at http://secure-stream-billing-verify.xyz/login to keep watching."
  },
  delivery: {
    title: "FedEx Delivery Impersonation",
    text: "FedEx Express: Package #US-883921 delivery failed due to unpaid customs fee ($2.30). Pay now to reschedule delivery: http://fedx-package-redelivery-portal.info/pay"
  },
  safe: {
    title: "Legitimate Project Update",
    text: "Hi Sarah, please find attached the revised design specifications for next week's sprint planning. Let's review them together during tomorrow's 10:00 AM sync."
  }
};

export const INITIAL_ANALYSIS_HISTORY = [
  {
    id: "scam-001",
    timestamp: "2026-09-03T10:45:00Z",
    dateFormatted: "Today, 10:45 AM",
    message: "URGENT! Your bank account will be blocked today due to incomplete KYC. Click the verification link immediately and enter your account number, password and OTP to avoid suspension.",
    riskScore: 82,
    riskLevel: "HIGH",
    prediction: "SCAM",
    scamProbability: 94.2,
    scamType: "Fake Verification Scam",
    summary: "High-urgency credential harvesting attack impersonating a banking institution under the guise of mandatory KYC compliance.",
    indicators: [
      { name: "Urgent language", severity: "high", description: "Creates artificial panic with phrases like 'URGENT!' and 'blocked today'" },
      { name: "Credential request", severity: "high", description: "Directly solicits highly sensitive credentials (OTP, password, account number)" },
      { name: "Suspicious link", severity: "medium", description: "Directs victim to an unverified verification link rather than official banking portals" },
      { name: "Consequence threat", severity: "medium", description: "Threatens immediate service suspension to bypass logical critical thinking" }
    ],
    highlightedTokens: ["URGENT!", "blocked today", "incomplete KYC", "verification link", "immediately", "account number", "password", "OTP", "avoid suspension"],
    explanation: "This message uses classic coercive social engineering tactics. Legitimate financial institutions never demand passwords, PINs, or One-Time Passwords (OTPs) via SMS or unverified links, nor do they threaten same-day account freezes without prior formal notices.",
    recommendations: [
      "Never share OTP, PIN, CVV or passwords under any circumstances.",
      "Do not click any embedded links in unexpected urgent alerts.",
      "Contact your bank directly using the verified customer support phone number on the back of your debit card.",
      "Forward this message to your mobile provider's spam reporting number (7726)."
    ]
  },
  {
    id: "scam-002",
    timestamp: "2026-09-02T16:20:00Z",
    dateFormatted: "Yesterday, 4:20 PM",
    message: "CONGRATULATIONS! You have been selected as the $2,500,000 cash winner in the 2026 Global Tech Draw! To claim your funds immediately, wire a refundable processing fee of $250 via cryptocurrency.",
    riskScore: 94,
    riskLevel: "HIGH",
    prediction: "SCAM",
    scamProbability: 98.6,
    scamType: "Advance-Fee Lottery Fraud",
    summary: "Pretext lottery scam requiring upfront cryptocurrency payment to release a fictitious multi-million dollar prize.",
    indicators: [
      { name: "Advance fee requirement", severity: "high", description: "Demands upfront payment before releasing supposed funds" },
      { name: "Unsolicited windfall", severity: "high", description: "Claims massive winnings for a competition you never entered" },
      { name: "Irreversible payment method", severity: "high", description: "Specifies cryptocurrency to prevent transaction chargebacks" }
    ],
    highlightedTokens: ["CONGRATULATIONS!", "$2,500,000 cash winner", "claim your funds", "refundable processing fee", "cryptocurrency"],
    explanation: "Legitimate lotteries and sweepstakes never require winners to pay 'processing fees', taxes, or shipping costs upfront via cryptocurrency or wire transfer.",
    recommendations: [
      "Delete and block the sender immediately.",
      "Never send cryptocurrency, wire transfers, or gift cards to unverified strangers.",
      "Remember: You cannot win a contest or lottery that you never entered."
    ]
  },
  {
    id: "scam-003",
    timestamp: "2026-09-01T14:15:00Z",
    dateFormatted: "Sep 01, 2026",
    message: "Account Alert: Your streaming membership failed to renew. Access will be terminated within 12 hours. Update billing info now at http://secure-stream-billing-verify.xyz/login to keep watching.",
    riskScore: 78,
    riskLevel: "HIGH",
    prediction: "SCAM",
    scamProbability: 91.5,
    scamType: "Phishing Credential Theft",
    summary: "Fake subscription renewal failure directing to an unofficial domain intended to harvest credit card and login credentials.",
    indicators: [
      { name: "Suspicious domain extension", severity: "high", description: "Uses '.xyz' TLD masquerading as an official streaming service" },
      { name: "12-hour countdown deadline", severity: "medium", description: "Creates time pressure to induce hurried login submissions" },
      { name: "Unencrypted HTTP link", severity: "medium", description: "Lacks basic modern HTTPS transport encryption" }
    ],
    highlightedTokens: ["Account Alert", "terminated within 12 hours", "Update billing info", "http://secure-stream-billing-verify.xyz/login"],
    explanation: "The domain 'secure-stream-billing-verify.xyz' is not associated with legitimate streaming providers. Threat actors purchase cheap generic domains with hyphens to trick users on mobile screens.",
    recommendations: [
      "Open your streaming app or browser directly and type the verified URL manually.",
      "Check your billing status inside your authentic account dashboard.",
      "Never enter login credentials on domains with mismatched or unofficial top-level extensions."
    ]
  },
  {
    id: "scam-004",
    timestamp: "2026-08-30T11:05:00Z",
    dateFormatted: "Aug 30, 2026",
    message: "FedEx Express: Package #US-883921 delivery failed due to unpaid customs fee ($2.30). Pay now to reschedule delivery: http://fedx-package-redelivery-portal.info/pay",
    riskScore: 64,
    riskLevel: "MEDIUM",
    prediction: "SUSPICIOUS",
    scamProbability: 76.8,
    scamType: "Delivery Service Impersonation",
    summary: "Smishing attack utilizing micro-fee baiting ($2.30) to capture payment card details through a fake tracking portal.",
    indicators: [
      { name: "Typosquatted brand name", severity: "high", description: "'fedx' misspelling designed to mimic FedEx" },
      { name: "Micro-charge lure", severity: "medium", description: "Small fee ($2.30) lowers victim suspicion while stealing full card details" },
      { name: "Impersonal tracking code", severity: "low", description: "Generic package number with no recipient or sender details" }
    ],
    highlightedTokens: ["delivery failed", "unpaid customs fee", "Pay now to reschedule", "http://fedx-package-redelivery-portal.info/pay"],
    explanation: "Attackers commonly use minor charge amounts to induce quick compliance. Entering card details gives the malicious portal access to your full card number, expiration, and CVV.",
    recommendations: [
      "Inspect the carrier domain carefully: legitimate FedEx tracking lives on fedex.com.",
      "Track your parcels solely through official carrier apps or by entering the tracking code on official websites.",
      "Do not enter payment details on unverified third-party redelivery portals."
    ]
  },
  {
    id: "scam-005",
    timestamp: "2026-08-28T09:30:00Z",
    dateFormatted: "Aug 28, 2026",
    message: "Hi Sarah, please find attached the revised design specifications for next week's sprint planning. Let's review them together during tomorrow's 10:00 AM sync.",
    riskScore: 12,
    riskLevel: "LOW",
    prediction: "SAFE",
    scamProbability: 5.4,
    scamType: "Legitimate Communication",
    summary: "Standard routine professional collaboration with no coercive urgency, credential solicitation, or suspicious external vectors.",
    indicators: [
      { name: "No credential solicitation", severity: "low", description: "Does not ask for passwords, OTPs, or financial payment" },
      { name: "Normal business context", severity: "low", description: "Follows established workplace discussion conventions" },
      { name: "No malicious link constructs", severity: "low", description: "No deceptive shortlinks or suspicious domain patterns" }
    ],
    highlightedTokens: ["sprint planning", "tomorrow's 10:00 AM sync"],
    explanation: "This message exhibits normal conversational patterns typical of legitimate workplace communication. No high-pressure triggers, obfuscated URLs, or sensitive data requests were identified.",
    recommendations: [
      "No immediate threat detected.",
      "Verify file attachments using your organization's standard antivirus scanners before executing unknown macros."
    ]
  }
];

export const INITIAL_METRICS = {
  totalAnalyses: 128,
  highRisk: 24,
  mediumRisk: 37,
  lowRisk: 67,
  scamsPrevented: 61,
  averageRiskScore: 48.6,
  riskDistribution: [
    { level: "Low Risk", count: 67, percentage: 52, color: "#10b981" },
    { level: "Medium Risk", count: 37, percentage: 29, color: "#f59e0b" },
    { level: "High Risk", count: 24, percentage: 19, color: "#f43f5e" }
  ]
};
