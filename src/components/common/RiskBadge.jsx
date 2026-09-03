import React from 'react';
import { ShieldAlert, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function RiskBadge({ level = "LOW", size = "normal" }) {
  const normalized = String(level).toUpperCase();

  let badgeClass = "risk-badge low";
  let Icon = ShieldCheck;
  let label = "LOW RISK";

  if (normalized === "HIGH" || normalized === "SCAM") {
    badgeClass = "risk-badge high";
    Icon = ShieldAlert;
    label = "HIGH RISK";
  } else if (normalized === "MEDIUM" || normalized === "SUSPICIOUS") {
    badgeClass = "risk-badge medium";
    Icon = AlertTriangle;
    label = "MEDIUM RISK";
  } else {
    badgeClass = "risk-badge low";
    Icon = ShieldCheck;
    label = "LOW RISK";
  }

  const iconSize = size === "large" ? 18 : size === "small" ? 12 : 14;

  return (
    <span
      className={badgeClass}
      style={{
        fontSize: size === "large" ? "0.9rem" : size === "small" ? "0.7rem" : "0.78rem",
        padding: size === "large" ? "0.4rem 0.9rem" : size === "small" ? "0.2rem 0.5rem" : "0.3rem 0.75rem"
      }}
    >
      <Icon size={iconSize} />
      <span>{label}</span>
    </span>
  );
}
