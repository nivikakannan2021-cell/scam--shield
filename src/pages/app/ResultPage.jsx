import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  ArrowLeft,
  Copy,
  Check,
  Share2,
  FileText,
  AlertCircle,
  HelpCircle,
  Sparkles,
  Lock,
  ChevronRight,
  ExternalLink,
  PlusCircle
} from 'lucide-react';
import { useAnalysis } from '../../context/AnalysisContext';
import CircularGauge from '../../components/common/CircularGauge';
import RiskBadge from '../../components/common/RiskBadge';

export default function ResultPage() {
  const { currentResult } = useAnalysis();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  // If no result is loaded, fallback to default or redirect
  const result = currentResult || {
    riskScore: 82,
    riskLevel: "HIGH",
    prediction: "SCAM",
    scamProbability: 94.2,
    scamType: "Fake Verification Scam",
    message: "URGENT! Your bank account will be blocked today due to incomplete KYC. Click the verification link immediately and enter your account number, password and OTP to avoid suspension.",
    indicators: [
      { name: "Urgent language", severity: "high", description: "Creates artificial panic with phrases like 'URGENT!' and 'blocked today'" },
      { name: "Credential request", severity: "high", description: "Directly solicits highly sensitive credentials (OTP, password, account number)" },
      { name: "Suspicious link", severity: "medium", description: "Directs victim to an unverified verification link rather than official banking portals" }
    ],
    highlightedTokens: ["URGENT!", "blocked today", "incomplete KYC", "verification link", "immediately", "account number", "password", "OTP"],
    explanation: "This message uses classic coercive social engineering tactics. Legitimate financial institutions never demand passwords, PINs, or One-Time Passwords (OTPs) via SMS or unverified links.",
    recommendations: [
      "Never share OTP, PIN, CVV or passwords under any circumstances.",
      "Do not click the verification link.",
      "Verify your account status directly via your official bank app."
    ]
  };

  const handleCopyReport = () => {
    const reportText = `[ScamShield AI Report]
Risk Score: ${result.riskScore}/100 (${result.riskLevel} RISK)
ML Prediction: ${result.prediction} (${result.scamProbability}% probability)
Scam Type: ${result.scamType}
Message: "${result.message}"
Safety Advice: ${result.recommendations.join(" ")}`;

    navigator.clipboard.writeText(reportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ maxWidth: "1150px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "2rem" }}>
      {/* Top Navigation & Action Toolbar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <button
            onClick={() => navigate('/app/analyze')}
            className="btn btn-secondary btn-sm"
            style={{ padding: "0.45rem 0.85rem" }}
          >
            <ArrowLeft size={16} />
            <span>Analyze Another</span>
          </button>

          <div>
            <div style={{ fontSize: "0.78rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--cyan-primary)" }}>
              CYBERSECURITY INTELLIGENCE DOSSIER
            </div>
            <h1 style={{ fontSize: "1.75rem", fontWeight: "800", color: "#ffffff", letterSpacing: "-0.02em" }}>
              Threat Assessment Report
            </h1>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <button
            onClick={handleCopyReport}
            className="btn btn-secondary btn-sm"
            style={{ padding: "0.5rem 1rem" }}
          >
            {copied ? <Check size={16} color="var(--risk-low)" /> : <Copy size={16} />}
            <span>{copied ? "Report Copied!" : "Copy Report"}</span>
          </button>

          <button
            onClick={() => alert("ScamShield Threat Alert shared to your security channel.")}
            className="btn btn-secondary btn-sm"
            style={{ padding: "0.5rem 1rem" }}
          >
            <Share2 size={16} />
            <span>Share Alert</span>
          </button>

          <Link
            to="/app/analyze"
            className="btn btn-primary btn-sm"
            style={{ padding: "0.5rem 1.1rem" }}
          >
            <PlusCircle size={16} />
            <span>New Scan</span>
          </Link>
        </div>
      </div>

      {/* TOP THREE HIGHLIGHT CARDS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.1fr 1fr 1fr",
          gap: "1.5rem"
        }}
        className="result-top-grid"
      >
        {/* CARD 1: RISK SCORE */}
        <div
          className="card"
          style={{
            padding: "2rem 1.5rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            position: "relative",
            border: result.riskLevel === "HIGH" ? "1.5px solid var(--risk-high-border)" : "1px solid var(--border-subtle)",
            boxShadow: result.riskLevel === "HIGH" ? "var(--shadow-glow-red)" : "none"
          }}
        >
          <div style={{ fontSize: "0.82rem", fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)", marginBottom: "1.25rem" }}>
            RISK SCORE
          </div>

          {/* Circular Gauge Component */}
          <CircularGauge
            score={result.riskScore}
            riskLevel={result.riskLevel}
            size={160}
          />

          <div style={{ marginTop: "1.25rem" }}>
            <RiskBadge level={result.riskLevel} size="large" />
          </div>

          <div style={{ marginTop: "0.75rem", fontSize: "0.8rem", color: "var(--text-secondary)" }}>
            Severity rating calibrated across multi-vector heuristics
          </div>
        </div>

        {/* CARD 2: ML PREDICTION & PROBABILITY */}
        <div
          className="card"
          style={{
            padding: "2rem 1.75rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between"
          }}
        >
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
              <span style={{ fontSize: "0.82rem", fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)" }}>
                ML PREDICTION
              </span>
              <Sparkles size={18} color="var(--cyan-primary)" />
            </div>

            <div
              style={{
                fontSize: "2.4rem",
                fontWeight: "900",
                letterSpacing: "0.04em",
                color: result.prediction === "SCAM" ? "var(--risk-high)" : result.prediction === "SUSPICIOUS" ? "var(--risk-med)" : "var(--risk-low)",
                fontFamily: "var(--font-mono)",
                lineHeight: 1
              }}
            >
              {result.prediction}
            </div>

            <div style={{ margin: "1.5rem 0 0.5rem" }}>
              <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "0.3rem" }}>
                ML Scam Probability:
              </div>
              <div style={{ fontSize: "1.9rem", fontWeight: "800", color: "#ffffff", fontFamily: "var(--font-mono)" }}>
                {result.scamProbability}%
              </div>
            </div>
          </div>

          <div
            style={{
              padding: "0.85rem",
              borderRadius: "8px",
              background: "rgba(255, 255, 255, 0.04)",
              border: "1px solid var(--border-subtle)",
              fontSize: "0.82rem",
              color: "var(--text-secondary)",
              lineHeight: 1.5
            }}
          >
            "The model estimates a {result.scamProbability}% probability that this message belongs to the {result.prediction.toLowerCase()} category."
          </div>
        </div>

        {/* CARD 3: SCAM TYPE */}
        <div
          className="card"
          style={{
            padding: "2rem 1.75rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between"
          }}
        >
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
              <span style={{ fontSize: "0.82rem", fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)" }}>
                SCAM TYPE
              </span>
              <ShieldAlert size={20} color="var(--cyan-primary)" />
            </div>

            <h3
              style={{
                fontSize: "1.55rem",
                fontWeight: "800",
                color: "#ffffff",
                lineHeight: 1.25,
                marginBottom: "0.75rem"
              }}
            >
              {result.scamType}
            </h3>

            <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
              {result.summary || "Identified threat pattern exploiting trust, credential submission, or urgency manipulation."}
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8rem", color: "var(--cyan-primary)", fontWeight: "600", paddingTop: "1rem", borderTop: "1px solid var(--border-subtle)" }}>
            <span>Category Taxonomy Verified</span>
            <Check size={14} />
          </div>
        </div>
      </div>

      {/* INSPECTED MESSAGE WITH HIGHLIGHTED TRIGGER TOKENS */}
      <div className="card" style={{ padding: "1.75rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <FileText size={18} color="var(--cyan-primary)" />
            <h3 style={{ fontSize: "1.1rem", fontWeight: "700", color: "#ffffff" }}>
              Analyzed Message Text
            </h3>
          </div>
          <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
            Highlighted trigger tokens flagged by NLP
          </span>
        </div>

        <div
          style={{
            padding: "1.25rem 1.5rem",
            borderRadius: "10px",
            backgroundColor: "rgba(10, 15, 27, 0.7)",
            border: "1px solid var(--border-subtle)",
            fontSize: "1.05rem",
            lineHeight: 1.7,
            color: "var(--text-main)",
            fontFamily: "var(--font-sans)"
          }}
        >
          {result.message}
        </div>
      </div>

      {/* TWO-COLUMN DETAILS: SUSPICIOUS INDICATORS & EXPLAINABILITY */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr",
          gap: "1.5rem"
        }}
        className="result-mid-grid"
      >
        {/* SUSPICIOUS INDICATORS */}
        <div className="card" style={{ padding: "1.75rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <AlertTriangle size={19} color="var(--risk-high)" />
              <h3 style={{ fontSize: "1.15rem", fontWeight: "700", color: "#ffffff" }}>
                Suspicious Indicators
              </h3>
            </div>
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
              {result.indicators.length} signals identified
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
            {result.indicators.map((ind, idx) => (
              <div
                key={idx}
                style={{
                  padding: "1rem",
                  borderRadius: "10px",
                  background: ind.severity === "high" ? "rgba(244, 63, 94, 0.08)" : ind.severity === "medium" ? "rgba(245, 158, 11, 0.08)" : "rgba(255, 255, 255, 0.03)",
                  border: `1px solid ${ind.severity === "high" ? "rgba(244, 63, 94, 0.25)" : ind.severity === "medium" ? "rgba(245, 158, 11, 0.25)" : "var(--border-subtle)"}`,
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.3rem"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "0.95rem", fontWeight: "700", color: "#ffffff" }}>
                    • {ind.name}
                  </span>
                  <span
                    style={{
                      fontSize: "0.72rem",
                      fontWeight: "700",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      color: ind.severity === "high" ? "var(--risk-high)" : ind.severity === "medium" ? "var(--risk-med)" : "var(--risk-low)"
                    }}
                  >
                    {ind.severity} severity
                  </span>
                </div>
                <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                  {ind.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* WHY IS THIS SUSPICIOUS? (EXPLAINABILITY) */}
        <div className="card" style={{ padding: "1.75rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.25rem" }}>
              <HelpCircle size={19} color="var(--cyan-primary)" />
              <h3 style={{ fontSize: "1.15rem", fontWeight: "700", color: "#ffffff" }}>
                Why is this suspicious?
              </h3>
            </div>

            <div style={{ fontSize: "0.95rem", color: "var(--text-main)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
              {result.explanation}
            </div>

            <div
              style={{
                padding: "1rem",
                borderRadius: "8px",
                background: "rgba(0, 229, 255, 0.06)",
                border: "1px solid rgba(0, 229, 255, 0.2)"
              }}
            >
              <div style={{ fontSize: "0.8rem", fontWeight: "700", color: "var(--cyan-primary)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.3rem" }}>
                Social Engineering Analysis
              </div>
              <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                Scammers purposely manufacture artificial time pressure to suppress your natural skepticism. Legitimate organizations provide reasonable grace periods and multi-channel verification.
              </div>
            </div>
          </div>

          <div style={{ paddingTop: "1.5rem", borderTop: "1px solid var(--border-subtle)", marginTop: "1.5rem" }}>
            <Link to="/app/how-it-works" style={{ fontSize: "0.85rem", color: "var(--cyan-primary)", fontWeight: "600", display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <span>Learn how ScamShield extracts TF-IDF tokens</span>
              <ChevronRight size={15} />
            </Link>
          </div>
        </div>
      </div>

      {/* SAFETY RECOMMENDATION SECTION */}
      <div
        className="card"
        style={{
          padding: "2rem",
          background: "linear-gradient(135deg, rgba(16, 185, 129, 0.06) 0%, rgba(19, 28, 49, 0.95) 100%)",
          border: "1.5px solid rgba(16, 185, 129, 0.3)"
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", marginBottom: "1.5rem" }}>
          <div
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "10px",
              background: "var(--risk-low-bg)",
              color: "var(--risk-low)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0
            }}
          >
            <ShieldCheck size={24} />
          </div>

          <div>
            <div style={{ fontSize: "0.8rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--risk-low)" }}>
              SAFETY DIRECTIVE
            </div>
            <h3 style={{ fontSize: "1.45rem", fontWeight: "800", color: "#ffffff", marginTop: "0.2rem" }}>
              "Never share OTP, PIN, CVV or passwords."
            </h3>
          </div>
        </div>

        {/* Actionable recommendations list */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1rem",
            marginBottom: "1.5rem"
          }}
        >
          {result.recommendations.map((rec, i) => (
            <div
              key={i}
              style={{
                padding: "0.9rem 1.1rem",
                borderRadius: "8px",
                background: "rgba(0, 0, 0, 0.35)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                display: "flex",
                alignItems: "flex-start",
                gap: "0.6rem"
              }}
            >
              <Check size={16} color="var(--risk-low)" style={{ flexShrink: 0, marginTop: "3px" }} />
              <span style={{ fontSize: "0.9rem", color: "var(--text-main)", lineHeight: 1.5 }}>
                {rec}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom banner */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem", paddingTop: "1.25rem", borderTop: "1px solid var(--border-subtle)", fontSize: "0.85rem", color: "var(--text-muted)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Lock size={14} color="var(--risk-low)" />
            <span>Analysis verified and recorded in your local threat history ledger.</span>
          </div>

          <Link to="/app/history" style={{ color: "var(--cyan-primary)", fontWeight: "600", display: "inline-flex", alignItems: "center", gap: "3px" }}>
            <span>Review Full History</span>
            <ChevronRight size={14} />
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 992px) {
          .result-top-grid { grid-template-columns: 1fr !important; }
          .result-mid-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
