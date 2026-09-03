import React from 'react';
import { ShieldAlert, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function RiskChart({ distribution }) {
  // distribution = [{ label: 'Low Risk', key: 'low', count: 67, percentage: 52, color: '#10b981' }, ...]
  const total = distribution.reduce((sum, item) => sum + item.count, 0) || 100;

  return (
    <div className="card" style={{ padding: "1.5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <div>
          <h3 style={{ fontSize: "1.1rem", fontWeight: "700", color: "var(--text-main)" }}>
            Risk Distribution
          </h3>
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "0.2rem" }}>
            Classification breakdown across all analyzed threats
          </p>
        </div>
        <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)", background: "rgba(255,255,255,0.05)", padding: "0.3rem 0.7rem", borderRadius: "6px" }}>
          Total: {total} messages
        </div>
      </div>

      {/* Multi-segment Horizontal Proportion Bar */}
      <div style={{ marginBottom: "1.75rem" }}>
        <div
          style={{
            height: "16px",
            width: "100%",
            borderRadius: "8px",
            overflow: "hidden",
            display: "flex",
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.4)"
          }}
        >
          {distribution.map((item) => (
            <div
              key={item.key}
              title={`${item.label}: ${item.count} (${item.percentage}%)`}
              style={{
                width: `${item.percentage}%`,
                backgroundColor: item.color,
                transition: "width 1s cubic-bezier(0.4, 0, 0.2, 1)",
                position: "relative"
              }}
            />
          ))}
        </div>
      </div>

      {/* Individual Risk Breakdown Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "1rem" }}>
        {distribution.map((item) => {
          let Icon = ShieldCheck;
          let bg = "var(--risk-low-bg)";
          let border = "var(--risk-low-border)";

          if (item.key === "high") {
            Icon = ShieldAlert;
            bg = "var(--risk-high-bg)";
            border = "var(--risk-high-border)";
          } else if (item.key === "medium") {
            Icon = AlertTriangle;
            bg = "var(--risk-med-bg)";
            border = "var(--risk-med-border)";
          }

          return (
            <div
              key={item.key}
              style={{
                padding: "1rem",
                borderRadius: "10px",
                background: bg,
                border: `1px solid ${border}`,
                display: "flex",
                flexDirection: "column",
                gap: "0.4rem"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: item.color, fontWeight: "600", fontSize: "0.85rem" }}>
                  <Icon size={16} />
                  <span>{item.key.toUpperCase()}</span>
                </div>
                <span style={{ fontSize: "1.2rem", fontWeight: "800", fontFamily: "var(--font-mono)", color: "var(--text-main)" }}>
                  {item.percentage}%
                </span>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: "0.2rem" }}>
                <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Total Scanned:</span>
                <span style={{ fontSize: "0.95rem", fontWeight: "600", color: "var(--text-secondary)", fontFamily: "var(--font-mono)" }}>
                  {item.count}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
