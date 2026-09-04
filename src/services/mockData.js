/**
 * Mock data for ScamShield AI
 * Provides realistic pre-seeded analyses, text samples, and screenshot/image samples.
 */

// Generate realistic SVG mock screenshots as data URIs
function createSvgScreenshot(title, subtitle, badgeText, contentLines, fakeUrl, highlightColor = "#f43f5e") {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 320" width="480" height="320">
    <defs>
      <linearGradient id="screenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0f172a"/>
        <stop offset="100%" stop-color="#090d16"/>
      </linearGradient>
      <linearGradient id="headerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="${highlightColor}" stop-opacity="0.2"/>
        <stop offset="100%" stop-color="#3b82f6" stop-opacity="0.1"/>
      </linearGradient>
    </defs>
    
    <!-- Phone / Screen Outer Frame -->
    <rect width="480" height="320" rx="16" fill="url(#screenGrad)" stroke="rgba(255,255,255,0.12)" stroke-width="2"/>
    
    <!-- Top System Bar -->
    <rect width="480" height="36" fill="rgba(0,0,0,0.4)"/>
    <circle cx="24" cy="18" r="4" fill="#f43f5e"/>
    <circle cx="38" cy="18" r="4" fill="#f59e0b"/>
    <circle cx="52" cy="18" r="4" fill="#10b981"/>
    <text x="240" y="22" fill="#94a3b8" font-size="11" font-family="-apple-system, sans-serif" text-anchor="middle" font-weight="600">SMS / SECURE MESSAGING</text>
    
    <!-- Alert Header Banner -->
    <rect x="20" y="48" width="440" height="42" rx="8" fill="url(#headerGrad)" stroke="${highlightColor}" stroke-opacity="0.3"/>
    <circle cx="42" cy="69" r="10" fill="${highlightColor}" fill-opacity="0.2"/>
    <text x="42" y="73" fill="${highlightColor}" font-size="12" font-family="sans-serif" text-anchor="middle" font-weight="bold">!</text>
    <text x="64" y="66" fill="#ffffff" font-size="13" font-family="-apple-system, sans-serif" font-weight="700">${title}</text>
    <text x="64" y="81" fill="#94a3b8" font-size="10" font-family="-apple-system, sans-serif">${subtitle}</text>
    
    <!-- Message Bubble -->
    <rect x="20" y="104" width="440" height="150" rx="10" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)"/>
    
    <!-- Sender Header -->
    <text x="36" y="128" fill="${highlightColor}" font-size="11" font-family="monospace" font-weight="bold">${badgeText}</text>
    <text x="420" y="128" fill="#64748b" font-size="10" font-family="sans-serif" text-anchor="end">10:42 AM</text>
    <line x1="36" y1="136" x2="444" y2="136" stroke="rgba(255,255,255,0.06)"/>
    
    <!-- Content Lines -->
    ${contentLines.map((line, i) => `<text x="36" y="${158 + i * 20}" fill="#f8fafc" font-size="12" font-family="-apple-system, sans-serif">${line}</text>`).join('')}
    
    <!-- Fake URL Link Box -->
    <rect x="36" y="214" width="408" height="26" rx="4" fill="rgba(0, 229, 255, 0.08)" stroke="rgba(0, 229, 255, 0.3)"/>
    <text x="48" y="231" fill="#00e5ff" font-size="11" font-family="monospace">${fakeUrl}</text>
    
    <!-- Bottom Footer -->
    <rect x="20" y="266" width="440" height="38" rx="6" fill="rgba(0,0,0,0.3)"/>
    <text x="36" y="289" fill="#64748b" font-size="10" font-family="sans-serif">Reply STOP to unsubscribe | Message and data rates may apply</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const SAMPLE_SCREENSHOTS = {
  bankKycScreenshot: {
    id: "screenshot-sample-bank",
    title: "Bank KYC SMS Screenshot",
    category: "Banking Phishing",
    imageSrc: createSvgScreenshot(
      "SECURITY NOTIFICATION - CHASE BANK",
      "Priority Urgent Alert • Account Freeze Notice",
      "[PRIORITY SMS ALERT - UNVERIFIED SENDER]",
      [
        "URGENT: Your Chase Checking Account will be blocked today due to pending KYC.",
        "To avoid immediate service suspension, verify your account details,",
        "password, and 6-digit OTP code through our secure portal immediately:"
      ],
      "http://chase-security-verify.xyz/login?ref=kyc-freeze",
      "#f43f5e"
    ),
    extractedText: "SECURITY NOTIFICATION - CHASE BANK\nPriority Urgent Alert • Account Freeze Notice\nURGENT: Your Chase Checking Account will be blocked today due to pending KYC. To avoid immediate service suspension, verify your account details, password, and 6-digit OTP code through our secure portal immediately: http://chase-security-verify.xyz/login?ref=kyc-freeze\nReply STOP to unsubscribe",
    ocrConfidence: 97.8,
    visualThreats: [
      "Spoofed bank entity header ('Chase Bank')",
      "Deceptive urgency badge ('Priority Urgent Alert')",
      "Non-HTTPS suspicious top-level domain ('.xyz')",
      "Credential request for OTP and password"
    ]
  },
  deliveryScreenshot: {
    id: "screenshot-sample-delivery",
    title: "Delivery Smishing Screenshot",
    category: "Courier Impersonation",
    imageSrc: createSvgScreenshot(
      "DHL EXPRESS COURIER ALERT",
      "Tracking ID #US-994821 • Customs Hold",
      "[DHL EXPRESS NOTIFICATION]",
      [
        "DHL Express: We were unable to deliver your package #US-994821.",
        "Reason: Unpaid international import tariff and customs clearance fee ($1.95).",
        "Please confirm your delivery address and pay the processing fee to release:"
      ],
      "http://dhl-package-redelivery.online/track?id=US994821",
      "#f59e0b"
    ),
    extractedText: "DHL EXPRESS COURIER ALERT\nTracking ID #US-994821 • Customs Hold\nDHL Express: We were unable to deliver your package #US-994821. Reason: Unpaid international import tariff and customs clearance fee ($1.95). Please confirm your delivery address and pay the processing fee to release: http://dhl-package-redelivery.online/track?id=US994821",
    ocrConfidence: 96.4,
    visualThreats: [
      "Counterfeit courier branding ('DHL Express')",
      "Micro-fee payment lure ($1.95) to capture credit card",
      "Typosquatted domain ('dhl-package-redelivery.online')"
    ]
  },
  cryptoScreenshot: {
    id: "screenshot-sample-crypto",
    title: "Crypto Giveaway Scam Screenshot",
    category: "Advance-Fee Investment Fraud",
    imageSrc: createSvgScreenshot(
      "ELON MUSK 5,000 BTC OFFICIAL GIVEAWAY",
      "Verified Promotion • First 1,000 Participants Only",
      "[PROMOTED AIRDROP ALERT]",
      [
        "To celebrate Tesla AI Day, Elon Musk is giving away 5,000 BTC & 50,000 ETH!",
        "Send 0.05 BTC to 1.0 BTC to the official wallet address below and receive",
        "DOUBLE (2x) the amount returned to your address within 10 minutes:"
      ],
      "http://tesla-crypto-giveaway-official.click/airdrop",
      "#f43f5e"
    ),
    extractedText: "ELON MUSK 5,000 BTC OFFICIAL GIVEAWAY\nVerified Promotion • First 1,000 Participants Only\nTo celebrate Tesla AI Day, Elon Musk is giving away 5,000 BTC & 50,000 ETH! Send 0.05 BTC to 1.0 BTC to the official wallet address below and receive DOUBLE (2x) the amount returned to your address within 10 minutes: http://tesla-crypto-giveaway-official.click/airdrop",
    ocrConfidence: 98.2,
    visualThreats: [
      "Celebrity and brand impersonation ('Tesla / Elon Musk')",
      "Too-good-to-be-true doubling promise (2x return in 10 mins)",
      "Irreversible cryptocurrency wallet transfer solicitation",
      "High-risk top-level domain ('.click')"
    ]
  }
};

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
    scanType: "text",
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
    id: "scam-006-img",
    scanType: "image",
    imagePreview: SAMPLE_SCREENSHOTS.bankKycScreenshot.imageSrc,
    imageName: "chase_kyc_sms_screenshot.png",
    timestamp: "2026-09-03T09:12:00Z",
    dateFormatted: "Today, 9:12 AM",
    message: "SECURITY NOTIFICATION - CHASE BANK: URGENT: Your Chase Checking Account will be blocked today due to pending KYC. Verify immediately: http://chase-security-verify.xyz",
    extractedOcrText: SAMPLE_SCREENSHOTS.bankKycScreenshot.extractedText,
    ocrConfidence: 97.8,
    riskScore: 88,
    riskLevel: "HIGH",
    prediction: "SCAM",
    scamProbability: 96.4,
    scamType: "Fake Verification Scam (Screenshot)",
    summary: "Screenshot OCR detected spoofed Chase Bank credentials solicitation with unverified .xyz link.",
    visualIndicators: [
      { name: "Spoofed Banking Interface", severity: "high", description: "Visual emulation of Chase Bank alert styling" },
      { name: "Deceptive Priority Header", severity: "high", description: "Artificial red urgency banner to induce hasty compliance" },
      { name: "Untrusted TLD Vector", severity: "medium", description: "High-risk '.xyz' domain embedded in image text" }
    ],
    indicators: [
      { name: "Urgent language", severity: "high", description: "Creates artificial panic with phrases like 'URGENT!' and 'blocked today'" },
      { name: "Credential request", severity: "high", description: "Directly solicits highly sensitive credentials (OTP, password, account number)" },
      { name: "Suspicious link", severity: "medium", description: "Directs victim to an unverified verification link" }
    ],
    highlightedTokens: ["SECURITY NOTIFICATION", "CHASE BANK", "blocked today", "pending KYC", "OTP", "chase-security-verify.xyz"],
    explanation: "Computer vision and OCR analysis confirmed that this image is a mobile screenshot of a spoofed banking alert. The domain 'chase-security-verify.xyz' does not belong to JPMorgan Chase & Co.",
    recommendations: [
      "Never click links from screenshots or forwarded text alerts.",
      "Log into Chase directly via the official mobile app or Chase.com.",
      "Block the sender number immediately."
    ]
  },
  {
    id: "scam-002",
    scanType: "text",
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
    scanType: "text",
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
    scanType: "text",
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
    scanType: "text",
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
  totalAnalyses: 129,
  highRisk: 25,
  mediumRisk: 37,
  lowRisk: 67,
  scamsPrevented: 62,
  averageRiskScore: 49.1,
  riskDistribution: [
    { level: "Low Risk", count: 67, percentage: 52, color: "#10b981" },
    { level: "Medium Risk", count: 37, percentage: 29, color: "#f59e0b" },
    { level: "High Risk", count: 25, percentage: 19, color: "#f43f5e" }
  ]
};
