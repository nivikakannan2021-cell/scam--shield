import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Target, Award, Cpu, Code2, Zap, ArrowRight, CheckCircle2 } from 'lucide-react';
import PublicNavbar from '../../components/layout/PublicNavbar';
import PublicFooter from '../../components/layout/PublicFooter';

export default function AboutPage() {
  const techStack = [
    {
      name: "React 19",
      role: "Component Architecture",
      desc: "Declarative component-driven UI utilizing modern React hooks and state management for instant interactive responsiveness."
    },
    {
      name: "Vite 6",
      role: "High-Performance Build Engine",
      desc: "Ultra-fast Hot Module Replacement (HMR) and optimized rollup production bundling with sub-millisecond execution times."
    },
    {
      name: "Modern JavaScript (ESNext)",
      role: "Client Heuristic Core",
      desc: "Pure modern ECMAScript standard logic implementing pattern algorithms and responsive data structures."
    },
    {
      name: "AI/ML Integration Ready",
      role: "Pluggable API Architecture",
      desc: "Asynchronous service abstraction layer prepared for direct REST / gRPC connection to production Python & PyTorch backends."
    }
  ];

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "var(--bg-primary)" }}>
      <PublicNavbar />

      <div className="cyber-grid-bg" />

      {/* Hero Header */}
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
            <Shield size={14} />
            <span>About ScamShield AI</span>
          </div>

          <h1 style={{ fontSize: "3rem", fontWeight: "800", color: "#ffffff", letterSpacing: "-0.02em", marginBottom: "1.25rem" }}>
            ScamShield AI
          </h1>

          <p style={{ fontSize: "1.25rem", color: "var(--cyan-primary)", fontWeight: "600", marginBottom: "1rem" }}>
            "An AI-assisted scam detection platform designed to help users identify suspicious content, understand the warning signs, and stay safe."
          </p>

          <p style={{ fontSize: "1.05rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
            Engineered at the intersection of cybersecurity, natural language heuristics, and accessible consumer defense.
          </p>
        </div>
      </section>

      {/* Mission & Project Objective */}
      <section style={{ padding: "2rem 0 5rem 0", position: "relative", zIndex: 10 }}>
        <div className="container" style={{ maxWidth: "1000px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2rem", marginBottom: "4rem" }}>
            {/* Mission */}
            <div className="card" style={{ padding: "2.5rem 2rem" }}>
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "12px",
                  background: "var(--cyan-dim)",
                  color: "var(--cyan-primary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1.25rem"
                }}
              >
                <Target size={26} />
              </div>
              <h2 style={{ fontSize: "1.5rem", fontWeight: "700", color: "#ffffff", marginBottom: "0.8rem" }}>
                Our Mission
              </h2>
              <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: 1.7 }}>
                To democratize enterprise-grade scam detection intelligence for everyday digital citizens. We believe that effective defense requires more than opaque black-box classifications—it requires educating users on attack vectors so they never fall victim to social engineering.
              </p>
            </div>

            {/* Project Objective */}
            <div className="card" style={{ padding: "2.5rem 2rem" }}>
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "12px",
                  background: "rgba(99, 102, 241, 0.15)",
                  color: "var(--indigo-primary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1.25rem"
                }}
              >
                <Award size={26} />
              </div>
              <h2 style={{ fontSize: "1.5rem", fontWeight: "700", color: "#ffffff", marginBottom: "0.8rem" }}>
                Project Objective
              </h2>
              <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: 1.7 }}>
                Build a zero-latency, highly accessible SaaS platform capable of parsing SMS alerts, emails, and chat messages. By highlighting psychological manipulation triggers, credential theft requests, and deceptive domains, ScamShield empowers proactive threat avoidance before any link is clicked.
              </p>
            </div>
          </div>

          {/* Technology Cards */}
          <div style={{ marginBottom: "4rem" }}>
            <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
              <span style={{ fontSize: "0.85rem", fontWeight: "700", color: "var(--cyan-primary)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                Under The Hood
              </span>
              <h2 style={{ fontSize: "2.2rem", fontWeight: "800", color: "#ffffff", marginTop: "0.4rem" }}>
                Built With Modern Frontend Engineering
              </h2>
              <p style={{ fontSize: "1rem", color: "var(--text-secondary)", marginTop: "0.5rem" }}>
                Lightweight, scalable, and engineered for effortless production API connectivity.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem" }}>
              {techStack.map((tech) => (
                <div
                  key={tech.name}
                  className="card card-hover"
                  style={{
                    padding: "1.75rem",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between"
                  }}
                >
                  <div>
                    <div style={{ display: "inline-block", padding: "0.25rem 0.6rem", borderRadius: "6px", background: "rgba(0, 229, 255, 0.1)", color: "var(--cyan-primary)", fontSize: "0.75rem", fontWeight: "700", marginBottom: "0.8rem" }}>
                      {tech.role}
                    </div>
                    <h3 style={{ fontSize: "1.2rem", fontWeight: "700", color: "#ffffff", marginBottom: "0.5rem" }}>
                      {tech.name}
                    </h3>
                    <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                      {tech.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Architecture Guarantee */}
          <div
            className="glass-panel"
            style={{
              padding: "2.5rem",
              border: "1px solid rgba(0, 229, 255, 0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "1.5rem"
            }}
          >
            <div>
              <h3 style={{ fontSize: "1.3rem", fontWeight: "700", color: "#ffffff", marginBottom: "0.4rem" }}>
                Ready to Experience ScamShield AI?
              </h3>
              <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)" }}>
                Start analyzing suspicious messages immediately or explore sample threat reports.
              </p>
            </div>

            <Link to="/app/analyze" className="btn btn-primary btn-lg">
              <span>Launch Threat Scanner</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
