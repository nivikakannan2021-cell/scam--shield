import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Bell, Menu, PlusCircle, CheckCircle2, ShieldAlert } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function AppHeader({ onToggleSidebar }) {
  const location = useLocation();
  const { user } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);

  const getPageTitle = (pathname) => {
    if (pathname.includes('/app/dashboard')) return "Security Dashboard";
    if (pathname.includes('/app/analyze')) return "Analyze Suspicious Message";
    if (pathname.includes('/app/result')) return "Threat Intelligence Report";
    if (pathname.includes('/app/history')) return "Scan History & Logs";
    if (pathname.includes('/app/how-it-works')) return "AI Pipeline Architecture";
    if (pathname.includes('/app/settings')) return "Account & Engine Settings";
    return "ScamShield AI Platform";
  };

  return (
    <header className="app-header">
      {/* Left: Mobile Toggle & Page Title */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <button
          onClick={onToggleSidebar}
          style={{
            display: "none",
            color: "var(--text-main)",
            padding: "0.4rem",
            borderRadius: "6px"
          }}
          className="show-mobile-btn"
          aria-label="Toggle menu"
        >
          <Menu size={22} />
        </button>

        <div>
          <h1 style={{ fontSize: "1.2rem", fontWeight: "700", color: "#ffffff", letterSpacing: "-0.01em" }}>
            {getPageTitle(location.pathname)}
          </h1>
        </div>
      </div>

      {/* Right: Actions, Notifications, Avatar */}
      <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", position: "relative" }}>
        {/* Quick Action Button */}
        {!location.pathname.includes('/app/analyze') && (
          <Link
            to="/app/analyze"
            className="btn btn-primary btn-sm hide-mobile"
            style={{ padding: "0.45rem 0.95rem" }}
          >
            <PlusCircle size={16} />
            <span>Analyze Message</span>
          </Link>
        )}

        {/* Notifications Icon with Badge */}
        <div style={{ position: "relative" }}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "9px",
              background: showNotifications ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.05)",
              border: "1px solid var(--border-light)",
              color: "var(--text-main)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              transition: "all var(--transition-fast)"
            }}
            aria-label="Notifications"
          >
            <Bell size={18} />
            {/* Unread dot */}
            <span
              style={{
                position: "absolute",
                top: "8px",
                right: "8px",
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "var(--cyan-primary)",
                boxShadow: "0 0 8px var(--cyan-primary)"
              }}
            />
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div
              className="glass-panel"
              style={{
                position: "absolute",
                right: 0,
                top: "48px",
                width: "320px",
                padding: "1rem",
                zIndex: 200,
                boxShadow: "0 10px 30px rgba(0,0,0,0.6)",
                border: "1px solid var(--border-light)"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.8rem", paddingBottom: "0.5rem", borderBottom: "1px solid var(--border-subtle)" }}>
                <span style={{ fontSize: "0.85rem", fontWeight: "700", color: "var(--text-main)" }}>Notifications</span>
                <span style={{ fontSize: "0.75rem", color: "var(--cyan-primary)", cursor: "pointer" }}>Mark all read</span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <div style={{ display: "flex", gap: "0.65rem", padding: "0.5rem", borderRadius: "6px", background: "rgba(244, 63, 94, 0.08)" }}>
                  <ShieldAlert size={18} color="var(--risk-high)" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <div>
                    <div style={{ fontSize: "0.82rem", fontWeight: "600", color: "var(--text-main)" }}>High Risk Threat Detected</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Bank KYC scam flagged with 94.2% probability.</div>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "0.65rem", padding: "0.5rem", borderRadius: "6px", background: "rgba(16, 185, 129, 0.08)" }}>
                  <CheckCircle2 size={18} color="var(--risk-low)" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <div>
                    <div style={{ fontSize: "0.82rem", fontWeight: "600", color: "var(--text-main)" }}>Engine Database Updated</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>TF-IDF heuristics synchronized with Q3 threat intelligence.</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Avatar with online indicator */}
        <Link to="/app/settings" style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <div style={{ position: "relative" }}>
            <div
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #00e5ff 0%, #2563eb 100%)",
                color: "#080c16",
                fontWeight: "800",
                fontSize: "0.9rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 10px rgba(0, 229, 255, 0.2)"
              }}
            >
              {user?.avatarInitials || "AM"}
            </div>
            <span
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: "var(--risk-low)",
                border: "2px solid var(--bg-secondary)"
              }}
            />
          </div>
        </Link>
      </div>

      <style>{`
        @media (max-width: 992px) {
          .show-mobile-btn { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
