import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Lock, Cpu, ArrowUpRight } from 'lucide-react';

export default function PublicFooter() {
  return (
    <footer
      style={{
        backgroundColor: "var(--bg-secondary)",
        borderTop: "1px solid var(--border-subtle)",
        padding: "4rem 0 2rem 0",
        position: "relative",
        overflow: "hidden"
      }}
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "3rem",
            marginBottom: "3.5rem"
          }}
        >
          {/* Brand & Tagline */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1rem" }}>
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  background: "var(--cyan-dim)",
                  border: "1px solid var(--border-focus)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Shield size={18} color="#00e5ff" />
              </div>
              <span style={{ fontSize: "1.2rem", fontWeight: "800", color: "#ffffff" }}>
                ScamShield <span style={{ color: "var(--cyan-primary)" }}>AI</span>
              </span>
            </div>

            <p style={{ fontSize: "0.95rem", color: "var(--cyan-primary)", fontWeight: "600", marginBottom: "0.75rem" }}>
              "Detect. Understand. Stay Safe."
            </p>

            <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", lineHeight: 1.6, maxWidth: "340px" }}>
              An AI-assisted scam detection SaaS platform engineered to help individuals and teams identify fraud patterns, understand risk factors, and stay secure.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 style={{ fontSize: "0.85rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-main)", marginBottom: "1.2rem" }}>
              Navigation
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "0.9rem" }}>
              <li>
                <Link to="/home" style={{ color: "var(--text-secondary)", transition: "color 0.2s" }} onMouseOver={e => e.target.style.color="#00e5ff"} onMouseOut={e => e.target.style.color="var(--text-secondary)"}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" style={{ color: "var(--text-secondary)", transition: "color 0.2s" }} onMouseOver={e => e.target.style.color="#00e5ff"} onMouseOut={e => e.target.style.color="var(--text-secondary)"}>
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/about" style={{ color: "var(--text-secondary)", transition: "color 0.2s" }} onMouseOver={e => e.target.style.color="#00e5ff"} onMouseOut={e => e.target.style.color="var(--text-secondary)"}>
                  About ScamShield AI
                </Link>
              </li>
              <li>
                <Link to="/app/analyze" style={{ color: "var(--text-secondary)", transition: "color 0.2s" }} onMouseOver={e => e.target.style.color="#00e5ff"} onMouseOut={e => e.target.style.color="var(--text-secondary)"}>
                  Analyze a Message
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Compliance */}
          <div>
            <h4 style={{ fontSize: "0.85rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-main)", marginBottom: "1.2rem" }}>
              Legal & Trust
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "0.9rem" }}>
              <li>
                <a href="#privacy" onClick={(e) => { e.preventDefault(); alert("Privacy Policy: ScamShield AI does not store sensitive credentials or personally identifiable information."); }} style={{ color: "var(--text-secondary)", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                  <span>Privacy Policy</span>
                  <ArrowUpRight size={14} color="var(--text-muted)" />
                </a>
              </li>
              <li>
                <a href="#terms" onClick={(e) => { e.preventDefault(); alert("Terms of Service: ScamShield AI provides AI-assisted recommendations and risk scores for educational & threat assessment purposes."); }} style={{ color: "var(--text-secondary)", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                  <span>Terms of Service</span>
                  <ArrowUpRight size={14} color="var(--text-muted)" />
                </a>
              </li>
              <li>
                <span style={{ color: "var(--text-muted)", fontSize: "0.82rem", display: "inline-flex", alignItems: "center", gap: "6px" }}>
                  <Lock size={13} color="var(--risk-low)" /> Client-Side Privacy First
                </span>
              </li>
              <li>
                <span style={{ color: "var(--text-muted)", fontSize: "0.82rem", display: "inline-flex", alignItems: "center", gap: "6px" }}>
                  <Cpu size={13} color="var(--cyan-primary)" /> ML Model API Ready
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: "1px solid var(--border-subtle)",
            paddingTop: "2rem",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
            fontSize: "0.85rem",
            color: "var(--text-muted)"
          }}
        >
          <div>
            © {new Date().getFullYear()} ScamShield AI Inc. All rights reserved.
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
            <span>Built for Modern Threat Intelligence</span>
            <span style={{ color: "var(--cyan-primary)", fontWeight: "600" }}>v2.4 Production Ready</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
