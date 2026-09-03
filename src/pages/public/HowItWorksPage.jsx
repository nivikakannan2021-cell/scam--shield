import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Shield,
  ArrowRight,
  Cpu,
  Layers,
  Database,
  Code2,
  Sliders,
  CheckCircle2,
  Sparkles,
  HelpCircle,
  FileText
} from 'lucide-react';
import PublicNavbar from '../../components/layout/PublicNavbar';
import PublicFooter from '../../components/layout/PublicFooter';

export default function HowItWorksPage() {
  const [activeTab, setActiveTab] = useState('tfidf');
  const [demoText, setDemoText] = useState("URGENT! Your bank account will be blocked today due to incomplete KYC.");

  const pipelineSteps = [
    { id: 1, title: "USER MESSAGE", desc: "Raw text ingestion from SMS, email, or chat application", icon: FileText },
    { id: 2, title: "TEXT PREPROCESSING", desc: "Tokenization, stopword removal, case folding, and punctuation normalization", icon: Code2 },
    { id: 3, title: "TF-IDF VECTORIZATION", desc: "Term Frequency-Inverse Document Frequency numerical matrix generation", icon: Database },
    { id: 4, title: "MACHINE LEARNING", desc: "Trained classification model pattern recognition against known attack corpora", icon: Cpu },
    { id: 5, title: "SCAM PREDICTION", desc: "Categorical decision boundary output (SCAM, SUSPICIOUS, or SAFE)", icon: Sparkles },
    { id: 6, title: "RISK SCORING", desc: "Multi-signal calibrated 0-100 severity calculation", icon: Sliders },
    { id: 7, title: "EXPLANATION", desc: "Human-interpretable indicator attribution and psychological trigger mapping", icon: HelpCircle },
    { id: 8, title: "SAFETY RECOMMENDATION", desc: "Contextual preventative defense protocols and actionable instructions", icon: CheckCircle2 }
  ];

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "var(--bg-primary)" }}>
      <PublicNavbar />

      <div className="cyber-grid-bg" />

      {/* Header Section */}
      <section style={{ padding: "4.5rem 0 3rem 0", position: "relative", zIndex: 10 }}>
        <div className="container" style={{ textAlign: "center", maxWidth: "800px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.35rem 0.85rem",
              borderRadius: "9999px",
              background: "rgba(0, 229, 255, 0.08)",
              border: "1px solid rgba(0, 229, 255, 0.25)",
              color: "var(--cyan-primary)",
              fontSize: "0.82rem",
              fontWeight: "600",
              marginBottom: "1.25rem"
            }}
          >
            <Cpu size={14} />
            <span>AI Architecture & Explainability Pipeline</span>
          </div>

          <h1 style={{ fontSize: "3rem", fontWeight: "800", color: "#ffffff", letterSpacing: "-0.02em", marginBottom: "1rem" }}>
            How ScamShield AI Works
          </h1>

          <p style={{ fontSize: "1.15rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
            Explore the end-to-end natural language processing and machine learning pipeline that transforms raw deceptive messages into explainable threat intelligence.
          </p>
        </div>
      </section>

      {/* Pipeline Visual Flow */}
      <section style={{ padding: "2rem 0 5rem 0", position: "relative", zIndex: 10 }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "1.25rem",
              marginBottom: "4.5rem"
            }}
          >
            {pipelineSteps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.id}
                  className="card card-hover"
                  style={{
                    padding: "1.5rem",
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between"
                  }}
                >
                  <div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
                      <span
                        style={{
                          width: "32px",
                          height: "32px",
                          borderRadius: "8px",
                          background: "var(--cyan-dim)",
                          color: "var(--cyan-primary)",
                          fontSize: "0.85rem",
                          fontWeight: "800",
                          fontFamily: "var(--font-mono)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}
                      >
                        {step.id}
                      </span>
                      <Icon size={20} color="var(--text-muted)" />
                    </div>

                    <h3 style={{ fontSize: "0.95rem", fontWeight: "700", color: "#ffffff", letterSpacing: "0.04em", marginBottom: "0.4rem" }}>
                      {step.title}
                    </h3>
                    <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Deep Dive Pillars */}
          <div style={{ maxWidth: "960px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <h2 style={{ fontSize: "2.2rem", fontWeight: "800", color: "#ffffff" }}>
                Deep Dive: The Four Technical Foundations
              </h2>
              <p style={{ fontSize: "1rem", color: "var(--text-secondary)", marginTop: "0.5rem" }}>
                Understand the science powering our threat recognition accuracy.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "2rem" }}>
              {/* Card 1: TF-IDF */}
              <div className="card" style={{ padding: "2rem", borderLeft: "4px solid var(--cyan-primary)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                  <Database size={24} color="var(--cyan-primary)" />
                  <h3 style={{ fontSize: "1.3rem", fontWeight: "700", color: "#ffffff" }}>
                    TF-IDF Feature Representation
                  </h3>
                </div>
                <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "1rem" }}>
                  "TF-IDF converts text into numerical features that a machine learning model can understand."
                </p>
                <div style={{ fontSize: "0.88rem", color: "var(--text-muted)", background: "rgba(0,0,0,0.3)", padding: "1rem", borderRadius: "8px", border: "1px solid var(--border-subtle)" }}>
                  Words like "OTP", "blocked", and "KYC" carry high inverse document frequency weights compared to common words, signaling potential malicious intent immediately.
                </div>
              </div>

              {/* Card 2: Machine Learning */}
              <div className="card" style={{ padding: "2rem", borderLeft: "4px solid var(--indigo-primary)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                  <Cpu size={24} color="var(--indigo-primary)" />
                  <h3 style={{ fontSize: "1.3rem", fontWeight: "700", color: "#ffffff" }}>
                    Machine Learning Classification
                  </h3>
                </div>
                <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "1rem" }}>
                  "The model learns patterns from previously labeled safe and scam messages and uses those patterns to analyze new messages."
                </p>
                <div style={{ fontSize: "0.88rem", color: "var(--text-muted)", background: "rgba(0,0,0,0.3)", padding: "1rem", borderRadius: "8px", border: "1px solid var(--border-subtle)" }}>
                  Trained on thousands of authenticated phishing, smishing, and social engineering datasets to discern deceptive intent with high probability precision.
                </div>
              </div>

              {/* Card 3: Risk Scoring */}
              <div className="card" style={{ padding: "2rem", borderLeft: "4px solid var(--risk-med)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                  <Sliders size={24} color="var(--risk-med)" />
                  <h3 style={{ fontSize: "1.3rem", fontWeight: "700", color: "#ffffff" }}>
                    Multi-Signal Risk Scoring
                  </h3>
                </div>
                <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "1rem" }}>
                  "Multiple risk signals are combined to estimate the overall level of risk."
                </p>
                <div style={{ fontSize: "0.88rem", color: "var(--text-muted)", background: "rgba(0,0,0,0.3)", padding: "1rem", borderRadius: "8px", border: "1px solid var(--border-subtle)" }}>
                  Rather than relying on a single binary classification, ScamShield combines urgency heuristics, credential vulnerability weights, and domain spoofing signals into a calibrated 0-100 score.
                </div>
              </div>

              {/* Card 4: Explainability */}
              <div className="card" style={{ padding: "2rem", borderLeft: "4px solid var(--risk-low)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                  <HelpCircle size={24} color="var(--risk-low)" />
                  <h3 style={{ fontSize: "1.3rem", fontWeight: "700", color: "#ffffff" }}>
                    Transparent Explainability
                  </h3>
                </div>
                <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "1rem" }}>
                  "The system identifies suspicious indicators and provides an understandable explanation."
                </p>
                <div style={{ fontSize: "0.88rem", color: "var(--text-muted)", background: "rgba(0,0,0,0.3)", padding: "1rem", borderRadius: "8px", border: "1px solid var(--border-subtle)" }}>
                  Users don't just see a warning label—they see the exact phrases, tactics, and psychological mechanisms used by the attacker, cultivating durable digital resilience.
                </div>
              </div>
            </div>

            {/* Interactive Pipeline Sandbox */}
            <div className="glass-panel" style={{ marginTop: "3.5rem", padding: "2rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
                <Sparkles size={20} color="var(--cyan-primary)" />
                <h3 style={{ fontSize: "1.2rem", fontWeight: "700", color: "#ffffff" }}>
                  Interactive Feature Extraction Preview
                </h3>
              </div>
              <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", marginBottom: "1.25rem" }}>
                Type or modify a sample below to see how our NLP layer segments tokens and detects suspicious linguistic weights:
              </p>

              <input
                type="text"
                value={demoText}
                onChange={(e) => setDemoText(e.target.value)}
                style={{ width: "100%", marginBottom: "1.25rem" }}
              />

              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {demoText.split(/\s+/).map((word, i) => {
                  const isSuspicious = /urgent|blocked|kyc|bank|otp|verify|click|immediately|password/i.test(word);
                  return (
                    <span
                      key={i}
                      style={{
                        padding: "0.3rem 0.65rem",
                        borderRadius: "6px",
                        fontSize: "0.85rem",
                        fontFamily: "var(--font-mono)",
                        backgroundColor: isSuspicious ? "rgba(244, 63, 94, 0.15)" : "rgba(255, 255, 255, 0.05)",
                        border: isSuspicious ? "1px solid var(--risk-high-border)" : "1px solid var(--border-subtle)",
                        color: isSuspicious ? "var(--risk-high)" : "var(--text-secondary)",
                        fontWeight: isSuspicious ? "700" : "400"
                      }}
                    >
                      {word} {isSuspicious && "⚠️"}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Bottom CTA */}
            <div style={{ textAlign: "center", marginTop: "3.5rem" }}>
              <Link to="/app/analyze" className="btn btn-primary btn-lg">
                <span>Test With Your Own Message</span>
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
