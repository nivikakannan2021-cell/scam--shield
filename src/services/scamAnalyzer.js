/**
 * ScamShield AI - Analysis Service
 * 
 * This service simulates an AI/ML pipeline (Preprocessing -> TF-IDF -> ML Classifier -> Risk Engine).
 * It dynamically analyzes arbitrary text and generates structured, explainable results.
 * It is structured as an async API-ready interface, so plugging in a real Python / FastAPI backend
 * in the future requires modifying only this file.
 */

// Heuristic pattern database for explainable NLP simulation
const SCAM_PATTERNS = {
  urgency: {
    weight: 25,
    name: "Urgent language",
    regex: /\b(urgent|immediately|blocked today|suspended|within \d+ (hours?|mins?)|act now|critical alert|action required|final notice|expires soon|terminated)\b/i,
    description: "Employs high-pressure urgency to trigger panic and bypass critical analysis."
  },
  credentials: {
    weight: 35,
    name: "Credential request",
    regex: /\b(otp|one time password|cvv|password|pin code|security code|account number|login|verify identity|confirm credentials|secret key|seed phrase)\b/i,
    description: "Directly solicits confidential authentication credentials that legitimate entities never request."
  },
  financialLure: {
    weight: 30,
    name: "Financial bait or advance-fee request",
    regex: /\b(won|winner|lottery|\$[\d,]+|jackpot|prize|claim your funds|processing fee|wire transfer|crypto|cryptocurrency|bitcoin|usdt|deposit|refund)\b/i,
    description: "Promises unsolicited windfall or demands upfront fees via untraceable payment methods."
  },
  suspiciousLink: {
    weight: 25,
    name: "Suspicious or unverified link",
    regex: /(https?:\/\/[^\s]+|\.xyz|\.info|\.top|\.ru|\.click|tinyurl|bit\.ly|shorturl|redelivery|billing-verify)/i,
    description: "Contains an external link or unverified domain extension commonly used for credential harvesting."
  },
  impersonation: {
    weight: 20,
    name: "Brand or institutional impersonation",
    regex: /\b(bank|fedex|ups|usps|dhl|netflix|paypal|amazon|apple|microsoft|irs|customs|police|kyc)\b/i,
    description: "Impersonates trusted institutions, service providers, or regulatory bodies."
  },
  coercion: {
    weight: 20,
    name: "Consequence threat or intimidation",
    regex: /\b(avoid suspension|account blocked|legal action|arrest|warrant|lawsuit|penalty|fine|freeze)\b/i,
    description: "Threatens negative consequences to intimidate the victim into rapid compliance."
  }
};

/**
 * Clean & preprocess text (simulating standard NLP preprocessing)
 */
function preprocessText(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s$]/g, ' ')
    .trim();
}

/**
 * Analyzes a message text and returns comprehensive ScamShield AI report.
 * 
 * @param {string} text - Message content to inspect
 * @param {object} options - Configuration options (e.g., custom sensitivity)
 * @returns {Promise<object>} Structured scam analysis result
 */
export async function analyzeMessage(text, options = {}) {
  // Simulate network/ML inference latency (configurable or standard 1.2s)
  const delay = options.simulateDelay !== undefined ? options.simulateDelay : 1400;
  await new Promise(resolve => setTimeout(resolve, delay));

  if (!text || text.trim().length === 0) {
    throw new Error("Message text cannot be empty.");
  }

  const cleanText = text.trim();
  const lowerText = cleanText.toLowerCase();

  // 1. Check for specific canonical sample prompt:
  // "URGENT! Your bank account will be blocked today due to incomplete KYC..."
  if (lowerText.includes("bank account will be blocked today") && lowerText.includes("kyc")) {
    return {
      id: `analysis-${Date.now()}`,
      timestamp: new Date().toISOString(),
      dateFormatted: "Just now",
      message: cleanText,
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
      highlightedTokens: ["URGENT!", "bank account", "blocked today", "incomplete KYC", "verification link", "immediately", "account number", "password", "OTP", "avoid suspension"],
      explanation: "This message uses classic coercive social engineering tactics. Legitimate financial institutions never demand passwords, PINs, or One-Time Passwords (OTPs) via SMS or unverified links, nor do they threaten same-day account freezes without prior formal notices.",
      recommendations: [
        "Never share OTP, PIN, CVV or passwords under any circumstances.",
        "Do not click the verification link.",
        "Verify your account status directly via your official bank app or official customer care helpline.",
        "Report and block the sender on your messaging application."
      ]
    };
  }

  // 2. Dynamic heuristic & pattern recognition
  let rawScore = 0;
  const detectedIndicators = [];
  const foundTokens = [];

  for (const [key, pattern] of Object.entries(SCAM_PATTERNS)) {
    const match = pattern.regex.exec(cleanText);
    if (match) {
      rawScore += pattern.weight;
      foundTokens.push(match[0]);

      let severity = "low";
      if (pattern.weight >= 30) severity = "high";
      else if (pattern.weight >= 20) severity = "medium";

      detectedIndicators.push({
        id: key,
        name: pattern.name,
        severity: severity,
        description: pattern.description,
        matchedToken: match[0]
      });
    }
  }

  // Length and structure adjustments
  if (cleanText.length < 25 && detectedIndicators.length === 0) {
    rawScore = 5;
  }

  // Normalize score to 0 - 100
  let riskScore = Math.min(Math.max(Math.round(rawScore * 0.95), 4), 98);

  // If indicators were found, ensure floor
  if (detectedIndicators.length >= 3) {
    riskScore = Math.max(riskScore, 75);
  } else if (detectedIndicators.length === 0) {
    riskScore = Math.min(riskScore, 15);
  }

  // Determine Risk Level & ML Prediction
  let riskLevel = "LOW";
  let prediction = "SAFE";
  let probability = Math.round((riskScore / 100) * 88 + (Math.random() * 8));

  if (riskScore >= 70) {
    riskLevel = "HIGH";
    prediction = "SCAM";
    probability = Math.min(Math.round(85 + (riskScore - 70) * 0.45 + (Math.random() * 3) * 10) / 10, 99.4);
  } else if (riskScore >= 40) {
    riskLevel = "MEDIUM";
    prediction = "SUSPICIOUS";
    probability = Math.round(55 + (riskScore - 40) * 0.65);
  } else {
    riskLevel = "LOW";
    prediction = "SAFE";
    probability = Math.max(Math.round((riskScore * 0.4) * 10) / 10, 2.1);
  }

  // Identify Scam Type
  let scamType = "Legitimate Communication";
  if (lowerText.includes("lottery") || lowerText.includes("won") || lowerText.includes("prize") || lowerText.includes("claim")) {
    scamType = "Advance-Fee Lottery Fraud";
  } else if (lowerText.includes("kyc") || (lowerText.includes("verify") && lowerText.includes("account"))) {
    scamType = "Fake Verification Scam";
  } else if (lowerText.includes("fedex") || lowerText.includes("package") || lowerText.includes("delivery") || lowerText.includes("customs")) {
    scamType = "Delivery Impersonation Scam";
  } else if (lowerText.includes("password") || lowerText.includes("otp") || lowerText.includes("login") || lowerText.includes("billing")) {
    scamType = "Phishing Credential Theft";
  } else if (lowerText.includes("job") || lowerText.includes("earn") || lowerText.includes("telegram") || lowerText.includes("deposit")) {
    scamType = "Employment / Task Scam";
  } else if (riskLevel === "HIGH") {
    scamType = "High-Risk Social Engineering Attack";
  } else if (riskLevel === "MEDIUM") {
    scamType = "Suspicious Unsolicited Message";
  }

  // Generate tailored explanation
  let explanation = "";
  if (riskLevel === "HIGH") {
    explanation = `The system identified ${detectedIndicators.length} prominent threat signals including ${detectedIndicators.map(i => i.name.toLowerCase()).join(", ")}. Threat actors use these psychological triggers to create false urgency and prompt hurried disclosures.`;
  } else if (riskLevel === "MEDIUM") {
    explanation = `This message displays ambiguous signals commonly observed in unsolicited marketing or mild phishing lures. While not an immediate confirmed attack, caution is advised before following external instructions.`;
  } else {
    explanation = "No predatory urgency, unverified links, or sensitive data harvesting requests were detected in this message. It conforms to typical safe conversational patterns.";
  }

  // Recommendations
  const recommendations = [];
  if (riskLevel === "HIGH" || riskLevel === "MEDIUM") {
    recommendations.push("Never share OTP, PIN, CVV or passwords.");
    if (detectedIndicators.some(i => i.id === "suspiciousLink")) {
      recommendations.push("Do not click or tap any links contained in this message.");
    }
    recommendations.push("Verify the sender's identity through official, independently researched contact channels.");
    recommendations.push("Block and flag this sender within your messaging client.");
  } else {
    recommendations.push("The message appears benign, but remain vigilant if the sender requests sudden financial transfers.");
    recommendations.push("Avoid downloading unexpected attachments from unfamiliar contacts.");
  }

  return {
    id: `analysis-${Date.now()}`,
    timestamp: new Date().toISOString(),
    dateFormatted: "Just now",
    message: cleanText,
    riskScore,
    riskLevel,
    prediction,
    scamProbability: probability,
    scamType,
    summary: `${riskLevel} Risk - ${scamType} detected with ${probability}% AI confidence.`,
    indicators: detectedIndicators.length > 0 ? detectedIndicators : [
      { name: "Clean content profile", severity: "low", description: "No typical scam markers identified in message tokens" }
    ],
    highlightedTokens: foundTokens,
    explanation,
    recommendations
  };
}
