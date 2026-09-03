import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, ShieldAlert, Menu, X, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function PublicNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const navLinks = [
    { name: "Home", path: "/home" },
    { name: "How It Works", path: "/how-it-works" },
    { name: "About", path: "/about" },
  ];

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "rgba(8, 12, 22, 0.85)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        borderBottom: "1px solid var(--border-subtle)",
        transition: "all var(--transition-fast)"
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "72px"
        }}
      >
        {/* Brand Logo */}
        <Link
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
              width: "38px",
              height: "38px",
              borderRadius: "10px",
              background: "linear-gradient(135deg, rgba(0, 229, 255, 0.2) 0%, rgba(37, 99, 235, 0.2) 100%)",
              border: "1px solid rgba(0, 229, 255, 0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 15px rgba(0, 229, 255, 0.3)"
            }}
          >
            <Shield size={20} color="#00e5ff" />
          </div>
          <div>
            <span style={{ fontSize: "1.15rem", fontWeight: "800", letterSpacing: "-0.02em", color: "#ffffff" }}>
              ScamShield <span style={{ color: "var(--cyan-primary)" }}>AI</span>
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "2rem"
          }}
          className="hide-mobile"
        >
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  fontSize: "0.95rem",
                  fontWeight: isActive ? "600" : "500",
                  color: isActive ? "var(--cyan-primary)" : "var(--text-secondary)",
                  transition: "color var(--transition-fast)"
                }}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Right CTA Actions */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem"
          }}
          className="hide-mobile"
        >
          <Link
            to="/login"
            className="btn btn-secondary btn-sm"
            style={{ padding: "0.55rem 1.1rem" }}
          >
            Log In
          </Link>

          <Link
            to={isAuthenticated ? "/app/dashboard" : "/signup"}
            className="btn btn-primary btn-sm"
            style={{ padding: "0.55rem 1.25rem" }}
          >
            <span>{isAuthenticated ? "Launch App" : "Get Started"}</span>
            <ArrowRight size={15} />
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            display: "none",
            color: "var(--text-main)",
            padding: "0.5rem"
          }}
          className="show-mobile-flex"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            background: "var(--bg-secondary)",
            borderBottom: "1px solid var(--border-light)",
            padding: "1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.2rem"
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontSize: "1.05rem",
                fontWeight: location.pathname === link.path ? "600" : "500",
                color: location.pathname === link.path ? "var(--cyan-primary)" : "var(--text-main)"
              }}
            >
              {link.name}
            </Link>
          ))}
          <div style={{ height: "1px", background: "var(--border-subtle)", margin: "0.5rem 0" }} />
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="btn btn-secondary"
            >
              Log In
            </Link>
            <Link
              to={isAuthenticated ? "/app/dashboard" : "/signup"}
              onClick={() => setMobileMenuOpen(false)}
              className="btn btn-primary"
            >
              {isAuthenticated ? "Launch App" : "Get Started Free"}
            </Link>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hide-mobile { display: none !important; }
          .show-mobile-flex { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
