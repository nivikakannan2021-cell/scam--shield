import React from 'react';

export default function CircularGauge({ score = 0, riskLevel = "LOW", size = 200 }) {
  const radius = 78;
  const circumference = 2 * Math.PI * radius;
  // Use 75% arc (270 degrees) for an open gauge or full 360 ring
  const strokeDashoffset = circumference - (Math.min(Math.max(score, 0), 100) / 100) * circumference;

  let colorGradient = {
    start: "#10b981",
    end: "#00e676",
    glow: "rgba(16, 185, 129, 0.3)"
  };

  const normalized = String(riskLevel).toUpperCase();
  if (normalized === "HIGH" || score >= 70) {
    colorGradient = {
      start: "#f43f5e",
      end: "#e11d48",
      glow: "rgba(244, 63, 94, 0.35)"
    };
  } else if (normalized === "MEDIUM" || score >= 40) {
    colorGradient = {
      start: "#f59e0b",
      end: "#d97706",
      glow: "rgba(245, 158, 11, 0.3)"
    };
  }

  const gradientId = `gauge-grad-${normalized}`;

  return (
    <div style={{ position: "relative", width: size, height: size, margin: "0 auto" }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        style={{ transform: "rotate(-90deg)", filter: `drop-shadow(0 0 12px ${colorGradient.glow})` }}
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colorGradient.start} />
            <stop offset="100%" stopColor={colorGradient.end} />
          </linearGradient>
        </defs>

        {/* Background Track */}
        <circle
          cx="100"
          cy="100"
          r={radius}
          fill="transparent"
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth="12"
        />

        {/* Secondary subtle tick ring */}
        <circle
          cx="100"
          cy="100"
          r={radius - 12}
          fill="transparent"
          stroke="rgba(255, 255, 255, 0.03)"
          strokeWidth="1"
          strokeDasharray="4, 6"
        />

        {/* Value Progress Arc */}
        <circle
          cx="100"
          cy="100"
          r={radius}
          fill="transparent"
          stroke={`url(#${gradientId})`}
          strokeWidth="12"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{
            transition: "stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1)"
          }}
        />
      </svg>

      {/* Center Label (not rotated) */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none"
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: "2px" }}>
          <span style={{ fontSize: "2.5rem", fontWeight: "800", fontFamily: "var(--font-mono)", color: "var(--text-main)", lineHeight: 1 }}>
            {score}
          </span>
          <span style={{ fontSize: "1.1rem", color: "var(--text-muted)", fontWeight: "500" }}>
            / 100
          </span>
        </div>
        <span
          style={{
            marginTop: "0.4rem",
            fontSize: "0.75rem",
            fontWeight: "700",
            letterSpacing: "0.08em",
            color: colorGradient.start,
            textTransform: "uppercase"
          }}
        >
          {riskLevel} RISK
        </span>
      </div>
    </div>
  );
}
