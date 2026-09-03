import React from 'react';
import { Link } from 'react-router-dom';
import {
  Shield,
  ShieldAlert,
  ArrowRight,
  Cpu,
  Gauge,
  FileSearch,
  Tag,
  AlertTriangle,
  CheckCircle,
  HelpCircle,
  Eye,
  Lock,
  Zap,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import PublicNavbar from '../../components/layout/PublicNavbar';
import PublicFooter from '../../components/layout/PublicFooter';
import CircularGauge from '../../components/common/CircularGauge';
import RiskBadge from '../../components/common/RiskBadge';

export default function HomePage() {
  const featureList = [
    {
      num: "01",
      title: "AI Scam Detection",
      icon: Cpu,
      desc: "Multi-layered natural language processing identifies deceptive linguistic hooks, urgency manipulation, and phishing triggers."
    },
    {
      num: "02",
      title: "Risk Scoring",
      icon: Gauge,
      desc: "Calibrated 0-100 numerical risk scoring synthesizes severity across threat vectors into an intuitive, accessible metric."
    },
    {
      num: "03",
      title: "Explainable Results",
      icon: HelpCircle,
      desc: "Transparent breakdown of why a message was flagged, translating technical signals into clear, actionable reasoning."
    },
    {
      num: "04",
      title: "Scam Type Detection",
      icon: Tag,
      desc: "Categorizes attack taxonomies including KYC fraud, smishing lures, advance-fee prize claims, and spoofed courier notifications."
    },
    {
      num: "05",
      title: "Suspicious Indicators",
      icon: AlertTriangle,
      desc: "Highlights exact deceptive phrases, unauthorized credential requests, and counterfeit domain extension patterns."
    },
    {
      num: "06",
      title: "Safety Recommendations",
      icon: CheckCircle,
      desc: "Gives immediate preventative steps tailored to the specific threat to protect your financial credentials and personal data."
    }
  ];

  const pipelineSteps = [
    { title: "Message", desc: "User inputs text or SMS" },
    { title: "Text Analysis", desc: "Tokenization & normalization" },
    { title: "AI Detection", desc: "TF-IDF feature extraction" },
    { title: "Risk Assessment", desc: "ML probability scoring" },
    { title: "Explanation", desc: "Indicator breakdown" },
    { title: "Safety Guidance", desc: "Actionable defense tips" },
  ];

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "var(--bg-primary)" }}>
      <PublicNavbar />

      {/* Hero Section */}
      <section
        style={{
          position: "relative",
          padding: "5rem 0 6rem 0",
          overflow: "hidden"
        }}
      >
        <div className="cyber-grid-bg" />
        <div
          className="glow-orb"
          style={{
            width: "500px",
            height: "500px",
            background: "radial-gradient(circle, rgba(0, 229, 255, 0.12) 0%, rgba(37, 99, 235, 0.04) 70%, transparent 100%)",
            top: "-100px",
            right: "10%"
          }}
        />

        <div className="container" style={{ position: "relative", zIndex: 10 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.1fr 0.9fr",
              gap: "3.5rem",
              alignItems: "center"
            }}
            className="hero-grid"
          >
            {/* Left Hero Content */}
            <div>
              {/* Trust Pill */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.4rem 0.9rem",
                  borderRadius: "9999px",
                  background: "rgba(0, 229, 255, 0.08)",
                  border: "1px solid rgba(0, 229, 255, 0.25)",
                  color: "var(--cyan-primary)",
                  fontSize: "0.82rem",
                  fontWeight: "600",
                  marginBottom: "1.5rem"
                }}
              >
                <Sparkles size={14} />
                <span>AI-Assisted Scam Detection Platform</span>
              </div>

              {/* Main Heading */}
              <h1
                style={{
                  fontSize: "3.4rem",
                  fontWeight: "800",
                  lineHeight: 1.15,
                  letterSpacing: "-0.03em",
                  color: "#ffffff",
                  marginBottom: "1.25rem"
                }}
                className="hero-title"
              >
                Protect Yourself <br />
                <span className="text-gradient-cyan">Before You Click.</span>
              </h1>

              {/* Subtitle */}
              <p
                style={{
                  fontSize: "1.15rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.6,
                  marginBottom: "2rem",
                  maxWidth: "560px"
                }}
              >
                ScamShield AI analyzes suspicious messages, identifies scam indicators, explains the risks, and gives you practical safety recommendations.
              </p>

              {/* CTAs */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginBottom: "2.5rem" }}>
                <Link to="/app/analyze" className="btn btn-primary btn-lg">
                  <span>Analyze a Message</span>
                  <ArrowRight size={18} />
                </Link>

                <Link to="/how-it-works" className="btn btn-secondary btn-lg">
                  <span>See How It Works</span>
                </Link>
              </div>

              {/* Trust statement */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  fontSize: "0.85rem",
                  color: "var(--text-muted)",
                  paddingTop: "1.2rem",
                  borderTop: "1px solid var(--border-subtle)"
                }}
              >
                <Lock size={15} color="var(--risk-low)" />
                <span>AI-assisted scam analysis • Explainable results • Safety guidance</span>
              </div>
            </div>

            {/* Right Hero Visual: Security Dashboard Preview */}
            <div>
              <div
                className="glass-panel"
                style={{
                  padding: "1.75rem",
                  boxShadow: "0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(0, 229, 255, 0.15)",
                  border: "1px solid rgba(0, 229, 255, 0.25)",
                  position: "relative"
                }}
              >
                {/* Visual Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", paddingBottom: "0.8rem", borderBottom: "1px solid var(--border-subtle)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                    <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "var(--risk-high)", boxShadow: "0 0 8px var(--risk-high)" }} />
                    <span style={{ fontSize: "0.82rem", fontWeight: "700", letterSpacing: "0.05em", color: "var(--text-muted)", textTransform: "uppercase" }}>
                      LIVE INTELLIGENCE SCAN
                    </span>
                  </div>
                  <RiskBadge level="HIGH" size="small" />
                </div>

                {/* Score & Prediction Highlight */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "130px 1fr",
                    gap: "1.25rem",
                    alignItems: "center",
                    marginBottom: "1.5rem",
                    background: "rgba(10, 15, 27, 0.6)",
                    padding: "1rem",
                    borderRadius: "12px",
                    border: "1px solid var(--border-subtle)"
                  }}
                >
                  <CircularGauge score={82} riskLevel="HIGH" size={120} />

                  <div>
                    <div style={{ fontSize: "0.78rem", fontWeight: "700", color: "var(--risk-high)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                      SCAM CONFIRMED
                    </div>
                    <div style={{ fontSize: "1.4rem", fontWeight: "800", color: "#ffffff", marginTop: "0.1rem" }}>
                      94.2% <span style={{ fontSize: "0.85rem", fontWeight: "500", color: "var(--text-secondary)" }}>Scam Probability</span>
                    </div>
                    <div style={{ fontSize: "0.95rem", fontWeight: "600", color: "var(--cyan-primary)", marginTop: "0.3rem" }}>
                      Fake Verification Scam
                    </div>
                  </div>
                </div>

                {/* Suspicious Indicators list */}
                <div style={{ marginBottom: "1.25rem" }}>
                  <div style={{ fontSize: "0.8rem", fontWeight: "700", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.6rem" }}>
                    Suspicious Indicators Detected
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.86rem", color: "var(--text-main)", background: "rgba(244, 63, 94, 0.08)", padding: "0.45rem 0.75rem", borderRadius: "6px", border: "1px solid rgba(244, 63, 94, 0.2)" }}>
                      <AlertTriangle size={15} color="var(--risk-high)" />
                      <span>Urgent language ("URGENT!", "blocked today")</span>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.86rem", color: "var(--text-main)", background: "rgba(244, 63, 94, 0.08)", padding: "0.45rem 0.75rem", borderRadius: "6px", border: "1px solid rgba(244, 63, 94, 0.2)" }}>
                      <AlertTriangle size={15} color="var(--risk-high)" />
                      <span>Credential request (OTP, password, account #)</span>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.86rem", color: "var(--text-main)", background: "rgba(245, 158, 11, 0.08)", padding: "0.45rem 0.75rem", borderRadius: "6px", border: "1px solid rgba(245, 158, 11, 0.2)" }}>
                      <AlertTriangle size={15} color="var(--risk-med)" />
                      <span>Suspicious unverified verification link</span>
                    </div>
                  </div>
                </div>

                {/* Safety Recommendation */}
                <div
                  style={{
                    background: "rgba(16, 185, 129, 0.08)",
                    border: "1px solid rgba(16, 185, 129, 0.25)",
                    padding: "0.85rem 1rem",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.65rem"
                  }}
                >
                  <CheckCircle size={18} color="var(--risk-low)" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <div>
                    <div style={{ fontSize: "0.75rem", fontWeight: "700", color: "var(--risk-low)", textTransform: "uppercase" }}>Safety Recommendation</div>
                    <div style={{ fontSize: "0.88rem", fontWeight: "600", color: "var(--text-main)", marginTop: "0.1rem" }}>
                      "Never share OTP, PIN, CVV or passwords."
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section style={{ padding: "6rem 0", backgroundColor: "var(--bg-secondary)", borderTop: "1px solid var(--border-subtle)" }}>
        <div className="container">
          <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 4rem auto" }}>
            <span style={{ fontSize: "0.85rem", fontWeight: "700", color: "var(--cyan-primary)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Core Capabilities
            </span>
            <h2 style={{ fontSize: "2.5rem", fontWeight: "800", color: "#ffffff", marginTop: "0.5rem", letterSpacing: "-0.02em" }}>
              More Than Just Scam Detection
            </h2>
            <p style={{ fontSize: "1.05rem", color: "var(--text-secondary)", marginTop: "0.75rem" }}>
              Comprehensive threat intelligence designed to dissect fraudulent attempts and empower users with explainable reasoning.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "1.5rem"
            }}
          >
            {featureList.map((feat) => {
              const Icon = feat.icon;
              return (
                <div
                  key={feat.num}
                  className="card card-hover"
                  style={{
                    padding: "2rem",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between"
                  }}
                >
                  <div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
                      <div
                        style={{
                          width: "48px",
                          height: "48px",
                          borderRadius: "12px",
                          background: "var(--cyan-dim)",
                          border: "1px solid var(--border-focus)",
                          color: "var(--cyan-primary)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}
                      >
                        <Icon size={24} />
                      </div>
                      <span style={{ fontSize: "1.2rem", fontWeight: "800", fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>
                        {feat.num}
                      </span>
                    </div>

                    <h3 style={{ fontSize: "1.25rem", fontWeight: "700", color: "#ffffff", marginBottom: "0.75rem" }}>
                      {feat.title}
                    </h3>
                    <p style={{ fontSize: "0.92rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                      {feat.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Preview Section */}
      <section style={{ padding: "6rem 0", backgroundColor: "var(--bg-primary)", position: "relative" }}>
        <div className="container">
          <div style={{ textAlign: "center", maxWidth: "650px", margin: "0 auto 3.5rem auto" }}>
            <span style={{ fontSize: "0.85rem", fontWeight: "700", color: "var(--cyan-primary)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Intelligent Pipeline
            </span>
            <h2 style={{ fontSize: "2.5rem", fontWeight: "800", color: "#ffffff", marginTop: "0.5rem" }}>
              How ScamShield AI Works
            </h2>
            <p style={{ fontSize: "1.05rem", color: "var(--text-secondary)", marginTop: "0.75rem" }}>
              From initial raw message input to deep NLP feature extraction and calibrated defensive guidance.
            </p>
          </div>

          {/* Horizontal Process Bar on Desktop, Stacked on Mobile */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(6, 1fr)",
              gap: "1rem",
              position: "relative"
            }}
            className="pipeline-grid"
          >
            {pipelineSteps.map((step, idx) => (
              <div
                key={step.title}
                className="card"
                style={{
                  padding: "1.25rem 1rem",
                  textAlign: "center",
                  position: "relative",
                  borderColor: idx === 0 ? "rgba(0, 229, 255, 0.4)" : "var(--border-subtle)"
                }}
              >
                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    background: "var(--cyan-dim)",
                    color: "var(--cyan-primary)",
                    fontSize: "0.8rem",
                    fontWeight: "700",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 0.75rem auto"
                  }}
                >
                  {idx + 1}
                </div>

                <div style={{ fontSize: "0.95rem", fontWeight: "700", color: "#ffffff", marginBottom: "0.3rem" }}>
                  {step.title}
                </div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                  {step.desc}
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
            <Link to="/how-it-works" className="btn btn-outline-cyan">
              <span>Explore The Technical Architecture & TF-IDF Model</span>
              <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Why ScamShield AI Section */}
      <section style={{ padding: "6rem 0", backgroundColor: "var(--bg-secondary)", borderTop: "1px solid var(--border-subtle)" }}>
        <div className="container">
          <div style={{ textAlign: "center", maxWidth: "720px", margin: "0 auto 4rem auto" }}>
            <span style={{ fontSize: "0.85rem", fontWeight: "700", color: "var(--cyan-primary)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Our Philosophy
            </span>
            <h2 style={{ fontSize: "2.5rem", fontWeight: "800", color: "#ffffff", marginTop: "0.5rem", lineHeight: 1.2 }}>
              Don't Just Know It's a Scam.<br />
              <span className="text-gradient-cyan">Know Why.</span>
            </h2>
            <p style={{ fontSize: "1.1rem", color: "var(--text-secondary)", marginTop: "1rem", lineHeight: 1.6 }}>
              Simply telling users that a message is suspicious is not always enough. ScamShield AI explains the warning signs so users can recognize similar scams in the future.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "2rem"
            }}
          >
            {/* Card 1: Detect */}
            <div className="card" style={{ padding: "2.5rem 2rem", textAlign: "center" }}>
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "16px",
                  background: "rgba(0, 229, 255, 0.12)",
                  color: "var(--cyan-primary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1.5rem auto",
                  border: "1px solid rgba(0, 229, 255, 0.3)"
                }}
              >
                <Eye size={28} />
              </div>
              <h3 style={{ fontSize: "1.4rem", fontWeight: "800", color: "#ffffff", marginBottom: "0.8rem" }}>
                Detect
              </h3>
              <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Instant scanning reveals hidden phishing links, psychological manipulation, spoofed brand names, and unverified payment solicitations.
              </p>
            </div>

            {/* Card 2: Understand */}
            <div className="card" style={{ padding: "2.5rem 2rem", textAlign: "center", borderColor: "rgba(0, 229, 255, 0.3)" }}>
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "16px",
                  background: "rgba(99, 102, 241, 0.15)",
                  color: "var(--indigo-primary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1.5rem auto",
                  border: "1px solid rgba(99, 102, 241, 0.3)"
                }}
              >
                <HelpCircle size={28} />
              </div>
              <h3 style={{ fontSize: "1.4rem", fontWeight: "800", color: "#ffffff", marginBottom: "0.8rem" }}>
                Understand
              </h3>
              <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Learn the social engineering triggers and machine learning confidence probabilities so you develop lifelong threat awareness.
              </p>
            </div>

            {/* Card 3: Protect */}
            <div className="card" style={{ padding: "2.5rem 2rem", textAlign: "center" }}>
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "16px",
                  background: "rgba(16, 185, 129, 0.12)",
                  color: "var(--risk-low)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1.5rem auto",
                  border: "1px solid rgba(16, 185, 129, 0.3)"
                }}
              >
                <Shield size={28} />
              </div>
              <h3 style={{ fontSize: "1.4rem", fontWeight: "800", color: "#ffffff", marginBottom: "0.8rem" }}>
                Protect
              </h3>
              <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Follow concrete defensive recommendations, secure accounts before compromise, and share threat insights with colleagues and family.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        style={{
          padding: "6rem 0",
          backgroundColor: "var(--bg-primary)",
          position: "relative",
          overflow: "hidden"
        }}
      >
        <div
          className="glow-orb"
          style={{
            width: "400px",
            height: "400px",
            background: "rgba(0, 229, 255, 0.15)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)"
          }}
        />

        <div className="container" style={{ position: "relative", zIndex: 10 }}>
          <div
            className="glass-panel"
            style={{
              padding: "4rem 2rem",
              textAlign: "center",
              maxWidth: "840px",
              margin: "0 auto",
              border: "1.5px solid rgba(0, 229, 255, 0.35)",
              boxShadow: "0 20px 60px rgba(0, 229, 255, 0.1)"
            }}
          >
            <h2 style={{ fontSize: "2.6rem", fontWeight: "800", color: "#ffffff", marginBottom: "1rem" }}>
              Have a Suspicious Message?
            </h2>
            <p style={{ fontSize: "1.2rem", color: "var(--text-secondary)", marginBottom: "2.5rem" }}>
              Analyze it before you click.
            </p>
            <Link to="/app/analyze" className="btn btn-primary btn-lg" style={{ padding: "1rem 2.2rem", fontSize: "1.1rem" }}>
              <span>Analyze a Message</span>
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      <PublicFooter />

      <style>{`
        @media (max-width: 992px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          .hero-title { font-size: 2.6rem !important; }
          .pipeline-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .hero-title { font-size: 2.2rem !important; }
          .pipeline-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
