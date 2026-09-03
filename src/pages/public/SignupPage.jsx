import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, User, Mail, Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError('Please fill in all required fields');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    signup(name, email, password);
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
          maxWidth: "460px",
          padding: "2.5rem 2rem",
          position: "relative",
          zIndex: 10,
          border: "1px solid rgba(0, 229, 255, 0.25)",
          boxShadow: "0 20px 50px rgba(0, 0, 0, 0.6)"
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "1.75rem" }}>
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
            <ShieldCheck size={24} color="#00e5ff" />
          </div>

          <h2 style={{ fontSize: "1.5rem", fontWeight: "800", color: "#ffffff" }}>
            Create your ScamShield AI account
          </h2>
          <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", marginTop: "0.3rem" }}>
            Start analyzing suspicious messages with AI protection
          </p>
        </div>

        {error && (
          <div style={{ padding: "0.75rem", borderRadius: "8px", background: "var(--risk-high-bg)", border: "1px solid var(--risk-high-border)", color: "var(--risk-high)", fontSize: "0.85rem", marginBottom: "1.2rem", textAlign: "center" }}>
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
          <div>
            <label style={{ display: "block", fontSize: "0.82rem", fontWeight: "600", color: "var(--text-secondary)", marginBottom: "0.4rem" }}>
              Full Name
            </label>
            <div style={{ position: "relative" }}>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Alex Morgan"
                required
                style={{ width: "100%", paddingLeft: "2.5rem" }}
              />
              <User size={16} color="var(--text-muted)" style={{ position: "absolute", left: "0.85rem", top: "50%", transform: "translateY(-50%)" }} />
            </div>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.82rem", fontWeight: "600", color: "var(--text-secondary)", marginBottom: "0.4rem" }}>
              Work or Personal Email
            </label>
            <div style={{ position: "relative" }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex.morgan@company.com"
                required
                style={{ width: "100%", paddingLeft: "2.5rem" }}
              />
              <Mail size={16} color="var(--text-muted)" style={{ position: "absolute", left: "0.85rem", top: "50%", transform: "translateY(-50%)" }} />
            </div>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.82rem", fontWeight: "600", color: "var(--text-secondary)", marginBottom: "0.4rem" }}>
              Password
            </label>
            <div style={{ position: "relative" }}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a strong password"
                required
                style={{ width: "100%", paddingLeft: "2.5rem" }}
              />
              <Lock size={16} color="var(--text-muted)" style={{ position: "absolute", left: "0.85rem", top: "50%", transform: "translateY(-50%)" }} />
            </div>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.82rem", fontWeight: "600", color: "var(--text-secondary)", marginBottom: "0.4rem" }}>
              Confirm Password
            </label>
            <div style={{ position: "relative" }}>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                required
                style={{ width: "100%", paddingLeft: "2.5rem" }}
              />
              <Lock size={16} color="var(--text-muted)" style={{ position: "absolute", left: "0.85rem", top: "50%", transform: "translateY(-50%)" }} />
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: "0.6rem" }}>
            <span>Create Account</span>
            <ArrowRight size={16} />
          </button>
        </form>

        {/* Footer Link */}
        <div style={{ textAlign: "center", marginTop: "1.75rem", fontSize: "0.88rem", color: "var(--text-secondary)" }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: "var(--cyan-primary)", fontWeight: "600" }}>
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}
