import React from 'react';

export default function StatCard({ title, value, subtitle, icon: Icon, color = "cyan", badge }) {
  const colorStyles = {
    cyan: {
      iconBg: "rgba(0, 229, 255, 0.12)",
      iconColor: "var(--cyan-primary)",
      borderHover: "rgba(0, 229, 255, 0.3)"
    },
    red: {
      iconBg: "var(--risk-high-bg)",
      iconColor: "var(--risk-high)",
      borderHover: "var(--risk-high-border)"
    },
    amber: {
      iconBg: "var(--risk-med-bg)",
      iconColor: "var(--risk-med)",
      borderHover: "var(--risk-med-border)"
    },
    emerald: {
      iconBg: "var(--risk-low-bg)",
      iconColor: "var(--risk-low)",
      borderHover: "var(--risk-low-border)"
    }
  };

  const currentTheme = colorStyles[color] || colorStyles.cyan;

  return (
    <div
      className="card card-hover"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "1.35rem"
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1rem" }}>
        <div>
          <span style={{ fontSize: "0.82rem", fontWeight: "600", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            {title}
          </span>
          <div style={{ fontSize: "2rem", fontWeight: "800", fontFamily: "var(--font-mono)", color: "var(--text-main)", marginTop: "0.25rem", lineHeight: 1.1 }}>
            {value}
          </div>
        </div>

        <div
          style={{
            width: "44px",
            height: "44px",
            borderRadius: "10px",
            background: currentTheme.iconBg,
            color: currentTheme.iconColor,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          {Icon && <Icon size={22} />}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "0.75rem", borderTop: "1px solid var(--border-subtle)", fontSize: "0.8rem", color: "var(--text-secondary)" }}>
        <span>{subtitle}</span>
        {badge && (
          <span style={{ fontWeight: "600", color: currentTheme.iconColor }}>
            {badge}
          </span>
        )}
      </div>
    </div>
  );
}
