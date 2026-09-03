import React, { useState } from 'react';
import {
  User,
  Shield,
  Sliders,
  Server,
  RefreshCw,
  Save,
  Check,
  AlertTriangle,
  Info
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { INITIAL_ANALYSIS_HISTORY } from '../../services/mockData';

export default function SettingsPage() {
  const { user, updateUser } = useAuth();

  const [name, setName] = useState(user?.name || "Alex Morgan");
  const [email, setEmail] = useState(user?.email || "alex.morgan@scamshield.io");
  const [role, setRole] = useState(user?.role || "Security Analyst");
  const [sensitivity, setSensitivity] = useState("standard");
  const [apiUrl, setApiUrl] = useState("http://localhost:8000/api/v1/analyze");
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateUser({ name, email, role });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleResetData = () => {
    if (window.confirm("Reset all local analyses to initial demo state?")) {
      localStorage.setItem('scamshield_analysis_history', JSON.stringify(INITIAL_ANALYSIS_HISTORY));
      window.location.reload();
    }
  };

  return (
    <div style={{ maxWidth: "880px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div>
        <h1 style={{ fontSize: "1.85rem", fontWeight: "800", color: "#ffffff", letterSpacing: "-0.02em" }}>
          Platform Settings
        </h1>
        <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", marginTop: "0.25rem" }}>
          Configure user identity, AI sensitivity thresholds, and API connection readiness.
        </p>
      </div>

      {savedSuccess && (
        <div
          style={{
            padding: "0.9rem 1.25rem",
            borderRadius: "8px",
            background: "var(--risk-low-bg)",
            border: "1px solid var(--risk-low-border)",
            color: "var(--risk-low)",
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
            fontSize: "0.9rem"
          }}
        >
          <Check size={18} />
          <span>Profile preferences updated successfully.</span>
        </div>
      )}

      {/* User Profile Card */}
      <div className="card" style={{ padding: "1.75rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.5rem" }}>
          <User size={20} color="var(--cyan-primary)" />
          <h2 style={{ fontSize: "1.2rem", fontWeight: "700", color: "#ffffff" }}>
            Analyst Profile
          </h2>
        </div>

        <form onSubmit={handleSaveProfile} style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.82rem", fontWeight: "600", color: "var(--text-secondary)", marginBottom: "0.4rem" }}>
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ width: "100%" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.82rem", fontWeight: "600", color: "var(--text-secondary)", marginBottom: "0.4rem" }}>
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: "100%" }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.82rem", fontWeight: "600", color: "var(--text-secondary)", marginBottom: "0.4rem" }}>
              Designation / Role
            </label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              style={{ width: "100%" }}
            />
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "0.5rem" }}>
            <button type="submit" className="btn btn-primary btn-sm" style={{ padding: "0.6rem 1.4rem" }}>
              <Save size={16} />
              <span>Save Profile</span>
            </button>
          </div>
        </form>
      </div>

      {/* AI Sensitivity Controls */}
      <div className="card" style={{ padding: "1.75rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.5rem" }}>
          <Sliders size={20} color="var(--indigo-primary)" />
          <h2 style={{ fontSize: "1.2rem", fontWeight: "700", color: "#ffffff" }}>
            Scam Detection Sensitivity
          </h2>
        </div>

        <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", marginBottom: "1.25rem" }}>
          Calibrate how aggressively the heuristic classifier flags subtle psychological urgency and unverified shortlinks:
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
          {[
            { id: "strict", title: "Strict (Zero-Tolerance)", desc: "Flags any unsolicited link, bank mention, or urgency word as high severity." },
            { id: "standard", title: "Standard (Recommended)", desc: "Balances false-positive avoidance with robust scam detection." },
            { id: "relaxed", title: "Permissive", desc: "Flags only explicit credential harvesting patterns and confirmed malicious domains." },
          ].map((item) => (
            <div
              key={item.id}
              onClick={() => setSensitivity(item.id)}
              style={{
                padding: "1.1rem",
                borderRadius: "10px",
                cursor: "pointer",
                backgroundColor: sensitivity === item.id ? "rgba(0, 229, 255, 0.08)" : "rgba(255, 255, 255, 0.03)",
                border: "1.5px solid",
                borderColor: sensitivity === item.id ? "var(--cyan-primary)" : "var(--border-subtle)",
                transition: "all var(--transition-fast)"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.4rem" }}>
                <span style={{ fontSize: "0.95rem", fontWeight: "700", color: sensitivity === item.id ? "var(--cyan-primary)" : "#ffffff" }}>
                  {item.title}
                </span>
                {sensitivity === item.id && <Check size={16} color="var(--cyan-primary)" />}
              </div>
              <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", lineHeight: 1.5 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Backend API Connection Readiness (Zero Rebuilding Required) */}
      <div className="card" style={{ padding: "1.75rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1rem" }}>
          <Server size={20} color="var(--cyan-primary)" />
          <h2 style={{ fontSize: "1.2rem", fontWeight: "700", color: "#ffffff" }}>
            Backend API Integration Ready
          </h2>
        </div>

        <div
          style={{
            background: "rgba(0, 229, 255, 0.06)",
            border: "1px solid rgba(0, 229, 255, 0.2)",
            borderRadius: "8px",
            padding: "1rem",
            marginBottom: "1.25rem",
            fontSize: "0.86rem",
            color: "var(--text-secondary)",
            lineHeight: 1.6
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--cyan-primary)", fontWeight: "700", marginBottom: "0.3rem" }}>
            <Info size={16} />
            <span>Architecture Design Guarantee</span>
          </div>
          The frontend service in <code style={{ color: "#ffffff", background: "rgba(0,0,0,0.3)", padding: "2px 6px", borderRadius: "4px" }}>src/services/scamAnalyzer.js</code> exposes an asynchronous <code style={{ color: "#ffffff", background: "rgba(0,0,0,0.3)", padding: "2px 6px", borderRadius: "4px" }}>analyzeMessage()</code> contract matching the exact schema of a real FastAPI or Python microservice. Connecting a live backend later requires zero UI refactoring.
        </div>

        <div>
          <label style={{ display: "block", fontSize: "0.82rem", fontWeight: "600", color: "var(--text-secondary)", marginBottom: "0.4rem" }}>
            Target Microservice Endpoint (Optional Future Integration)
          </label>
          <input
            type="text"
            value={apiUrl}
            onChange={(e) => setApiUrl(e.target.value)}
            style={{ width: "100%", fontFamily: "var(--font-mono)", fontSize: "0.88rem" }}
          />
        </div>
      </div>

      {/* Reset Cache & Storage */}
      <div className="card" style={{ padding: "1.75rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h3 style={{ fontSize: "1.1rem", fontWeight: "700", color: "#ffffff" }}>
            Reset Demo Environment
          </h3>
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "0.2rem" }}>
            Re-populate history, metric tallies, and sample prompts with default SaaS mock data.
          </p>
        </div>

        <button
          type="button"
          onClick={handleResetData}
          className="btn btn-secondary btn-sm"
          style={{ color: "var(--risk-med)", borderColor: "var(--risk-med-border)" }}
        >
          <RefreshCw size={15} />
          <span>Reset Demo Data</span>
        </button>
      </div>
    </div>
  );
}
