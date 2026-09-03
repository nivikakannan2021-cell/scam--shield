import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Sparkles, ChevronRight } from 'lucide-react';

export default function SplashScreen() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // 2-second smooth progress animation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 100);

    const timer = setTimeout(() => {
      navigate('/home');
    }, 2200);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [navigate]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#060912",
        position: "relative",
        overflow: "hidden",
        padding: "2rem"
      }}
    >
      {/* Background cyber grid & radiant light */}
      <div className="cyber-grid-bg" />
      <div
        className="glow-orb"
        style={{
          width: "400px",
          height: "400px",
          backgroundColor: "rgba(0, 229, 255, 0.15)",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)"
        }}
      />

      {/* Main Content Box */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          maxWidth: "500px"
        }}
      >
        {/* Shield + AI Logo */}
        <div
          style={{
            position: "relative",
            width: "90px",
            height: "90px",
            borderRadius: "22px",
            background: "linear-gradient(135deg, rgba(0, 229, 255, 0.25) 0%, rgba(37, 99, 235, 0.25) 100%)",
            border: "1.5px solid rgba(0, 229, 255, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 35px rgba(0, 229, 255, 0.35)",
            marginBottom: "1.75rem",
            animation: "pulse-cyan 3s infinite ease-in-out"
          }}
        >
          <Shield size={46} color="#00e5ff" strokeWidth={1.8} />
          <div
            style={{
              position: "absolute",
              top: "-6px",
              right: "-6px",
              background: "#080c16",
              borderRadius: "50%",
              padding: "4px",
              border: "1px solid #00e5ff"
            }}
          >
            <Sparkles size={14} color="#00e5ff" />
          </div>
        </div>

        {/* Product Name */}
        <h1
          style={{
            fontSize: "2.4rem",
            fontWeight: "800",
            letterSpacing: "-0.03em",
            color: "#ffffff",
            marginBottom: "0.5rem"
          }}
        >
          ScamShield <span className="text-gradient-cyan">AI</span>
        </h1>

        {/* Tagline */}
        <p
          style={{
            fontSize: "1.1rem",
            fontWeight: "500",
            color: "var(--text-secondary)",
            letterSpacing: "0.02em",
            marginBottom: "2.5rem"
          }}
        >
          "Detect. Understand. Stay Safe."
        </p>

        {/* Loading Bar */}
        <div
          style={{
            width: "220px",
            height: "4px",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            borderRadius: "4px",
            overflow: "hidden",
            marginBottom: "1.2rem",
            position: "relative"
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${progress}%`,
              background: "linear-gradient(90deg, #00e5ff, #3b82f6)",
              borderRadius: "4px",
              boxShadow: "0 0 10px #00e5ff",
              transition: "width 0.1s linear"
            }}
          />
        </div>

        {/* Sub text status */}
        <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)", marginBottom: "1.5rem" }}>
          INITIALIZING THREAT INTELLIGENCE ENGINE...
        </div>

        {/* Fast skip button */}
        <button
          onClick={() => navigate('/home')}
          className="btn btn-secondary btn-sm"
          style={{
            fontSize: "0.8rem",
            padding: "0.35rem 0.8rem",
            color: "var(--text-muted)",
            borderColor: "rgba(255, 255, 255, 0.08)"
          }}
        >
          <span>Skip Intro</span>
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}
