import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldAlert,
  Send,
  Trash2,
  Sparkles,
  Loader2,
  CheckCircle,
  FileText,
  AlertCircle,
  Info
} from 'lucide-react';
import { useAnalysis } from '../../context/AnalysisContext';
import { SAMPLE_MESSAGES } from '../../services/mockData';

export default function AnalyzePage() {
  const [messageText, setMessageText] = useState('');
  const [error, setError] = useState('');
  const { executeAnalysis, isAnalyzing, analysisStep } = useAnalysis();
  const navigate = useNavigate();

  const handleTrySample = () => {
    setMessageText(SAMPLE_MESSAGES.bankKyc.text);
    setError('');
  };

  const handleClear = () => {
    setMessageText('');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!messageText.trim()) {
      setError('Please paste or type a message to analyze.');
      return;
    }

    setError('');
    try {
      await executeAnalysis(messageText);
      navigate('/app/result');
    } catch (err) {
      setError('Analysis failed: ' + err.message);
    }
  };

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", position: "relative" }}>
      {/* Loading Modal / Overlay */}
      {isAnalyzing && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(6, 10, 20, 0.88)",
            backdropFilter: "blur(12px)",
            zIndex: 1000,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem"
          }}
        >
          <div
            className="glass-panel"
            style={{
              padding: "3rem 2.5rem",
              maxWidth: "480px",
              width: "100%",
              textAlign: "center",
              border: "1.5px solid rgba(0, 229, 255, 0.4)",
              boxShadow: "0 25px 60px rgba(0, 0, 0, 0.8), 0 0 35px rgba(0, 229, 255, 0.2)"
            }}
          >
            {/* Animated Cyber Ring */}
            <div
              style={{
                width: "72px",
                height: "72px",
                borderRadius: "50%",
                background: "rgba(0, 229, 255, 0.1)",
                border: "2px solid rgba(0, 229, 255, 0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 2rem auto",
                position: "relative"
              }}
            >
              <Loader2 size={38} color="var(--cyan-primary)" className="animate-spin" />
            </div>

            {/* Dynamic Step Text */}
            <div style={{ minHeight: "60px", marginBottom: "1.5rem" }}>
              {analysisStep === 1 && (
                <div>
                  <h3 style={{ fontSize: "1.35rem", fontWeight: "700", color: "#ffffff", marginBottom: "0.4rem" }}>
                    Analyzing your message...
                  </h3>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                    Normalizing tokens and constructing TF-IDF vectors
                  </p>
                </div>
              )}

              {analysisStep === 2 && (
                <div>
                  <h3 style={{ fontSize: "1.35rem", fontWeight: "700", color: "var(--cyan-primary)", marginBottom: "0.4rem" }}>
                    Checking suspicious patterns...
                  </h3>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                    Scanning for coercive urgency, credential solicitation, and spoofed domains
                  </p>
                </div>
              )}

              {analysisStep === 3 && (
                <div>
                  <h3 style={{ fontSize: "1.35rem", fontWeight: "700", color: "var(--indigo-primary)", marginBottom: "0.4rem" }}>
                    Calculating risk...
                  </h3>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                    Synthesizing multi-signal confidence scores & preventative guidance
                  </p>
                </div>
              )}
            </div>

            {/* Multi-step Progress dots */}
            <div style={{ display: "flex", justifyContent: "center", gap: "0.75rem", marginTop: "1rem" }}>
              <div
                style={{
                  width: "28px",
                  height: "6px",
                  borderRadius: "3px",
                  backgroundColor: analysisStep >= 1 ? "var(--cyan-primary)" : "rgba(255,255,255,0.1)",
                  boxShadow: analysisStep >= 1 ? "0 0 8px var(--cyan-primary)" : "none",
                  transition: "all 0.3s"
                }}
              />
              <div
                style={{
                  width: "28px",
                  height: "6px",
                  borderRadius: "3px",
                  backgroundColor: analysisStep >= 2 ? "var(--cyan-primary)" : "rgba(255,255,255,0.1)",
                  boxShadow: analysisStep >= 2 ? "0 0 8px var(--cyan-primary)" : "none",
                  transition: "all 0.3s"
                }}
              />
              <div
                style={{
                  width: "28px",
                  height: "6px",
                  borderRadius: "3px",
                  backgroundColor: analysisStep >= 3 ? "var(--cyan-primary)" : "rgba(255,255,255,0.1)",
                  boxShadow: analysisStep >= 3 ? "0 0 8px var(--cyan-primary)" : "none",
                  transition: "all 0.3s"
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Main Analysis Form Container */}
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "1.85rem", fontWeight: "800", color: "#ffffff", letterSpacing: "-0.02em" }}>
          Analyze a Suspicious Message
        </h1>
        <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", marginTop: "0.25rem" }}>
          Paste a suspicious message below and let ScamShield AI analyze it.
        </p>
      </div>

      {error && (
        <div
          style={{
            padding: "0.85rem 1rem",
            borderRadius: "8px",
            background: "var(--risk-high-bg)",
            border: "1px solid var(--risk-high-border)",
            color: "var(--risk-high)",
            fontSize: "0.9rem",
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
            marginBottom: "1.5rem"
          }}
        >
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      {/* Sample presets bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "0.75rem",
          marginBottom: "1rem"
        }}
      >
        <span style={{ fontSize: "0.85rem", fontWeight: "600", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "0.4rem" }}>
          <Sparkles size={15} color="var(--cyan-primary)" />
          Quick Test Scenarios:
        </span>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          <button
            type="button"
            onClick={handleTrySample}
            className="btn btn-secondary btn-sm"
            style={{
              borderColor: "rgba(0, 229, 255, 0.35)",
              color: "var(--cyan-primary)",
              background: "rgba(0, 229, 255, 0.08)"
            }}
          >
            Try Sample Scam (Bank KYC)
          </button>

          <button
            type="button"
            onClick={() => setMessageText(SAMPLE_MESSAGES.lottery.text)}
            className="btn btn-secondary btn-sm"
          >
            Lottery Prize Scam
          </button>

          <button
            type="button"
            onClick={() => setMessageText(SAMPLE_MESSAGES.delivery.text)}
            className="btn btn-secondary btn-sm"
          >
            Delivery Smishing
          </button>

          <button
            type="button"
            onClick={() => setMessageText(SAMPLE_MESSAGES.safe.text)}
            className="btn btn-secondary btn-sm"
          >
            Safe Workplace Message
          </button>
        </div>
      </div>

      {/* Textarea Card */}
      <div className="card" style={{ padding: "1.75rem", marginBottom: "1.5rem" }}>
        <form onSubmit={handleSubmit}>
          <div style={{ position: "relative" }}>
            <textarea
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="Paste or type the suspicious message here..."
              rows={8}
              style={{
                width: "100%",
                minHeight: "220px",
                resize: "vertical",
                fontSize: "1.05rem",
                lineHeight: 1.6,
                backgroundColor: "var(--bg-input)",
                border: "1.5px solid var(--border-light)",
                borderRadius: "12px",
                padding: "1.25rem",
                marginBottom: "0.75rem"
              }}
            />

            {/* Character & word counter */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: "0.82rem",
                color: "var(--text-muted)",
                padding: "0 0.25rem"
              }}
            >
              <span>
                {messageText.trim().length > 0
                  ? `${messageText.trim().split(/\s+/).length} words`
                  : "0 words"}
              </span>
              <span style={{ fontFamily: "var(--font-mono)" }}>
                {messageText.length} characters
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "1.5rem",
              paddingTop: "1.25rem",
              borderTop: "1px solid var(--border-subtle)",
              flexWrap: "wrap",
              gap: "1rem"
            }}
          >
            <button
              type="button"
              onClick={handleClear}
              disabled={!messageText}
              className="btn btn-secondary"
              style={{ opacity: messageText ? 1 : 0.5 }}
            >
              <Trash2 size={16} />
              <span>Clear</span>
            </button>

            <button
              type="submit"
              disabled={isAnalyzing || !messageText.trim()}
              className="btn btn-primary btn-lg"
              style={{ padding: "0.85rem 2rem", opacity: messageText.trim() ? 1 : 0.6 }}
            >
              <ShieldAlert size={18} />
              <span>Analyze Message</span>
            </button>
          </div>
        </form>
      </div>

      {/* Security note */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.6rem",
          fontSize: "0.85rem",
          color: "var(--text-muted)",
          padding: "0 0.5rem"
        }}
      >
        <Info size={16} color="var(--cyan-primary)" />
        <span>ScamShield AI performs zero-knowledge client analysis. No credentials or telephone numbers are transmitted to external ad trackers.</span>
      </div>
    </div>
  );
}
