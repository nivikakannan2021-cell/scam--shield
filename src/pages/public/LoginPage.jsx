import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Lock, Mail, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('alex.morgan@scamshield.io');
  const [password, setPassword] = useState('••••••••••••');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    login(email, password);
    navigate('/app/dashboard');
  };

  const handleGoogleMock = () => {
    login('google.user@scamshield.io', 'google-oauth');
    navigate('/app/dashboard');
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "var(--bg-primary)",
        position: "relative",
        padding: "2rem 1.5rem",
        overflow: "hidden"
      }}
    >
      <div className="cyber-grid-bg" />
      <div
        className="glow-orb"
        style={{
          width: "350px",
          height: "350px",
          backgroundColor: "rgba(0, 229, 255, 0.12)",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)"
        }}
      />

      {/* Return to Home */}
      <Link
        to="/home"
        style={{
          position: "absolute",
          top: "2rem",
          left: "2rem",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          color: "var(--text-muted)",
          fontSize: "0.88rem",
          fontWeight: "500",
          zIndex: 20
        }}
      >
        <Shield size={16} color="var(--cyan-primary)" />
        <span>Back to ScamShield AI</span>
      </Link>

      {/* Auth Card */}
      <div
        className="glass-panel"
        style={{
          width: "100%",
          maxWidth: "440px",
          padding: "2.5rem 2rem",
          position: "relative",
          zIndex: 10,
          border: "1px solid rgba(0, 229, 255, 0.25)",
          boxShadow: "0 20px 50px rgba(0, 0, 0, 0.6)"
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, rgba(0, 229, 255, 0.2) 0%, rgba(37, 99, 235, 0.2) 100%)",
              border: "1px solid rgba(0, 229, 255, 0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1rem auto",
              boxShadow: "0 0 20px rgba(0, 229, 255, 0.3)"
            }}
          >
            <Shield size={24} color="#00e5ff" />
          </div>

          <h2 style={{ fontSize: "1.6rem", fontWeight: "800", color: "#ffffff" }}>
            Welcome back
          </h2>
          <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", marginTop: "0.3rem" }}>
            Log in to access your ScamShield AI threat console
          </p>
        </div>

        {error && (
          <div style={{ padding: "0.75rem", borderRadius: "8px", background: "var(--risk-high-bg)", border: "1px solid var(--risk-high-border)", color: "var(--risk-high)", fontSize: "0.85rem", marginBottom: "1.2rem", textAlign: "center" }}>
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div>
            <label style={{ display: "block", fontSize: "0.82rem", fontWeight: "600", color: "var(--text-secondary)", marginBottom: "0.4rem" }}>
              Email Address
            </label>
            <div style={{ position: "relative" }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                required
                style={{ width: "100%", paddingLeft: "2.5rem" }}
              />
              <Mail size={16} color="var(--text-muted)" style={{ position: "absolute", left: "0.85rem", top: "50%", transform: "translateY(-50%)" }} />
            </div>
          </div>

          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.4rem" }}>
              <label style={{ fontSize: "0.82rem", fontWeight: "600", color: "var(--text-secondary)" }}>
                Password
              </label>
              <a href="#forgot" onClick={(e) => { e.preventDefault(); alert("Demo Mode: Any password allows login!"); }} style={{ fontSize: "0.78rem", color: "var(--cyan-primary)" }}>
                Forgot password?
              </a>
            </div>
            <div style={{ position: "relative" }}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                style={{ width: "100%", paddingLeft: "2.5rem" }}
              />
              <Lock size={16} color="var(--text-muted)" style={{ position: "absolute", left: "0.85rem", top: "50%", transform: "translateY(-50%)" }} />
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: "0.5rem" }}>
            <span>Log In</span>
            <ArrowRight size={16} />
          </button>
        </form>

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", margin: "1.5rem 0", gap: "0.75rem" }}>
          <div style={{ flex: 1, height: "1px", background: "var(--border-subtle)" }} />
          <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase" }}>or</span>
          <div style={{ flex: 1, height: "1px", background: "var(--border-subtle)" }} />
        </div>

        {/* Continue with Google (Mock button) */}
        <button
          type="button"
          onClick={handleGoogleMock}
          className="btn btn-secondary"
          style={{ width: "100%", display: "flex", alignItems: "center", gap: "0.75rem", justifyContent: "center" }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
            <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
            <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
            <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
          </svg>
          <span>Continue with Google</span>
        </button>

        {/* Footer Link */}
        <div style={{ textAlign: "center", marginTop: "1.75rem", fontSize: "0.88rem", color: "var(--text-secondary)" }}>
          Don't have an account?{' '}
          <Link to="/signup" style={{ color: "var(--cyan-primary)", fontWeight: "600" }}>
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
