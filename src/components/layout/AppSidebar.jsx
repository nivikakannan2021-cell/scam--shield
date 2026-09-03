import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Shield,
  LayoutDashboard,
  ShieldAlert,
  History,
  HelpCircle,
  Settings,
  LogOut,
  X,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function AppSidebar({ isOpen, onClose }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/home');
  };

  const menuItems = [
    { name: "Dashboard", path: "/app/dashboard", icon: LayoutDashboard },
    { name: "Analyze Message", path: "/app/analyze", icon: ShieldAlert },
    { name: "History", path: "/app/history", icon: History },
    { name: "How It Works", path: "/app/how-it-works", icon: HelpCircle },
    { name: "Settings", path: "/app/settings", icon: Settings },
  ];

  return (
    <aside className={`app-sidebar ${isOpen ? 'open' : ''}`}>
      {/* Brand Header */}
      <div
        style={{
          height: "var(--header-height)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 1.5rem",
          borderBottom: "1px solid var(--border-subtle)"
        }}
      >
        <NavLink
          to="/home"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.65rem",
            textDecoration: "none"
          }}
        >
          <div
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "8px",
              background: "linear-gradient(135deg, rgba(0, 229, 255, 0.2) 0%, rgba(37, 99, 235, 0.2) 100%)",
              border: "1px solid rgba(0, 229, 255, 0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 12px rgba(0, 229, 255, 0.25)"
            }}
          >
            <Shield size={18} color="#00e5ff" />
          </div>
          <span style={{ fontSize: "1.1rem", fontWeight: "800", color: "#ffffff", letterSpacing: "-0.02em" }}>
            ScamShield <span style={{ color: "var(--cyan-primary)" }}>AI</span>
          </span>
        </NavLink>

        {/* Mobile close button */}
        <button
          onClick={onClose}
          style={{
            display: "none",
            color: "var(--text-muted)",
            padding: "0.25rem"
          }}
          className="sidebar-close-mobile"
          aria-label="Close sidebar"
        >
          <X size={20} />
        </button>
      </div>

      {/* Main Navigation Menu */}
      <div style={{ flex: 1, padding: "1.5rem 1rem", display: "flex", flexDirection: "column", gap: "0.4rem", overflowY: "auto" }}>
        <div style={{ fontSize: "0.75rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)", padding: "0 0.75rem 0.6rem" }}>
          Platform
        </div>

        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              style={({ isActive }) => ({
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.75rem 0.9rem",
                borderRadius: "9px",
                fontSize: "0.92rem",
                fontWeight: isActive ? "600" : "500",
                color: isActive ? "#ffffff" : "var(--text-secondary)",
                backgroundColor: isActive ? "rgba(0, 229, 255, 0.12)" : "transparent",
                border: isActive ? "1px solid rgba(0, 229, 255, 0.3)" : "1px solid transparent",
                transition: "all var(--transition-fast)"
              })}
            >
              <Icon size={19} color="currentColor" />
              <span>{item.name}</span>
            </NavLink>
          );
        })}

        <div style={{ margin: "1.2rem 0 0.6rem", height: "1px", backgroundColor: "var(--border-subtle)" }} />

        <div style={{ fontSize: "0.75rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)", padding: "0 0.75rem 0.6rem" }}>
          External
        </div>

        <NavLink
          to="/home"
          target="_blank"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0.75rem 0.9rem",
            borderRadius: "9px",
            fontSize: "0.9rem",
            color: "var(--text-muted)",
            transition: "all var(--transition-fast)"
          }}
          onMouseOver={(e) => (e.currentTarget.style.color = "var(--text-main)")}
          onMouseOut={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
        >
          <span style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <Shield size={18} />
            Public Website
          </span>
          <ExternalLink size={14} />
        </NavLink>
      </div>

      {/* User Profile & Logout Area */}
      <div
        style={{
          padding: "1rem 1.2rem",
          borderTop: "1px solid var(--border-subtle)",
          backgroundColor: "rgba(10, 15, 27, 0.6)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", overflow: "hidden" }}>
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #00e5ff 0%, #2563eb 100%)",
              color: "#080c16",
              fontWeight: "700",
              fontSize: "0.85rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0
            }}
          >
            {user?.avatarInitials || "AM"}
          </div>

          <div style={{ overflow: "hidden" }}>
            <div style={{ fontSize: "0.88rem", fontWeight: "600", color: "var(--text-main)", whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}>
              {user?.name || "Alex Morgan"}
            </div>
            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}>
              {user?.role || "Security Analyst"}
            </div>
          </div>
        </div>

        <button
          onClick={handleLogout}
          title="Log Out"
          style={{
            padding: "0.5rem",
            color: "var(--text-muted)",
            borderRadius: "6px",
            transition: "all var(--transition-fast)"
          }}
          onMouseOver={(e) => (e.currentTarget.style.color = "var(--risk-high)")}
          onMouseOut={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
          aria-label="Logout"
        >
          <LogOut size={18} />
        </button>
      </div>

      <style>{`
        @media (max-width: 992px) {
          .sidebar-close-mobile { display: block !important; }
        }
      `}</style>
    </aside>
  );
}
