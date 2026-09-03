import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ShieldAlert,
  AlertTriangle,
  ShieldCheck,
  Activity,
  PlusCircle,
  History,
  HelpCircle,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { useAnalysis } from '../../context/AnalysisContext';
import StatCard from '../../components/dashboard/StatCard';
import RiskChart from '../../components/dashboard/RiskChart';
import RiskBadge from '../../components/common/RiskBadge';

export default function DashboardPage() {
  const { history, getStats, selectHistoryItem } = useAnalysis();
  const navigate = useNavigate();
  const stats = getStats();

  const handleRowClick = (item) => {
    selectHistoryItem(item);
    navigate('/app/result');
  };

  const recentAnalyses = history.slice(0, 5);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {/* Header Area */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontSize: "1.85rem", fontWeight: "800", color: "#ffffff", letterSpacing: "-0.02em" }}>
            Dashboard
          </h1>
          <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", marginTop: "0.25rem" }}>
            Monitor your ScamShield AI activity.
          </p>
        </div>

        <Link to="/app/analyze" className="btn btn-primary" style={{ padding: "0.65rem 1.3rem" }}>
          <PlusCircle size={18} />
          <span>Analyze New Message</span>
        </Link>
      </div>

      {/* Statistics Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "1.25rem"
        }}
      >
        <StatCard
          title="Total Analyses"
          value={stats.total}
          subtitle="Processed scans"
          icon={Activity}
          color="cyan"
          badge="+12% this week"
        />

        <StatCard
          title="High Risk"
          value={stats.high}
          subtitle="Confirmed scam threats"
          icon={ShieldAlert}
          color="red"
          badge="Urgent action"
        />

        <StatCard
          title="Medium Risk"
          value={stats.medium}
          subtitle="Suspicious indicators"
          icon={AlertTriangle}
          color="amber"
          badge="Review carefully"
        />

        <StatCard
          title="Low Risk"
          value={stats.low}
          subtitle="Legitimate messages"
          icon={ShieldCheck}
          color="emerald"
          badge="Safe verified"
        />
      </div>

      {/* Main Grid: Chart + Quick Actions */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.7fr 1fr",
          gap: "1.5rem",
          alignItems: "stretch"
        }}
        className="dashboard-mid-grid"
      >
        {/* Risk Distribution Chart */}
        <RiskChart distribution={stats.distribution} />

        {/* Quick Actions Card */}
        <div className="card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <h3 style={{ fontSize: "1.1rem", fontWeight: "700", color: "var(--text-main)", marginBottom: "0.4rem" }}>
              Quick Actions
            </h3>
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "1.25rem" }}>
              Frequent threat defense operations
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <Link
                to="/app/analyze"
                className="card-hover"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0.9rem 1.1rem",
                  borderRadius: "10px",
                  background: "rgba(0, 229, 255, 0.08)",
                  border: "1px solid rgba(0, 229, 255, 0.25)",
                  color: "var(--text-main)"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <ShieldAlert size={18} color="var(--cyan-primary)" />
                  <div>
                    <div style={{ fontSize: "0.9rem", fontWeight: "600" }}>Analyze New Message</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Paste text or SMS alert</div>
                  </div>
                </div>
                <ArrowRight size={16} color="var(--cyan-primary)" />
              </Link>

              <Link
                to="/app/history"
                className="card-hover"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0.9rem 1.1rem",
                  borderRadius: "10px",
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid var(--border-subtle)",
                  color: "var(--text-main)"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <History size={18} color="var(--text-secondary)" />
                  <div>
                    <div style={{ fontSize: "0.9rem", fontWeight: "600" }}>View History</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Access past threat logs</div>
                  </div>
                </div>
                <ArrowRight size={16} color="var(--text-muted)" />
              </Link>

              <Link
                to="/app/how-it-works"
                className="card-hover"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0.9rem 1.1rem",
                  borderRadius: "10px",
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid var(--border-subtle)",
                  color: "var(--text-main)"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <HelpCircle size={18} color="var(--indigo-primary)" />
                  <div>
                    <div style={{ fontSize: "0.9rem", fontWeight: "600" }}>How It Works</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Review ML & NLP pipeline</div>
                  </div>
                </div>
                <ArrowRight size={16} color="var(--text-muted)" />
              </Link>
            </div>
          </div>

          <div
            style={{
              marginTop: "1.25rem",
              paddingTop: "1rem",
              borderTop: "1px solid var(--border-subtle)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontSize: "0.8rem",
              color: "var(--text-muted)"
            }}
          >
            <span>Engine Status: Online</span>
            <span style={{ color: "var(--risk-low)", fontWeight: "600" }}>● Latency ~45ms</span>
          </div>
        </div>
      </div>

      {/* Recent Analyses Table */}
      <div className="card" style={{ padding: "1.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
          <div>
            <h3 style={{ fontSize: "1.15rem", fontWeight: "700", color: "#ffffff" }}>
              Recent Analyses
            </h3>
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "0.15rem" }}>
              Click any row to inspect complete threat indicators and safety recommendations
            </p>
          </div>

          <Link to="/app/history" style={{ fontSize: "0.85rem", color: "var(--cyan-primary)", fontWeight: "600", display: "flex", alignItems: "center", gap: "0.3rem" }}>
            <span>View All ({history.length})</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th style={{ width: "42%" }}>Message Preview</th>
                <th>Risk Score</th>
                <th>Risk Level</th>
                <th>Scam Type</th>
                <th>Date</th>
                <th style={{ textAlign: "right" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {recentAnalyses.map((item) => (
                <tr key={item.id} onClick={() => handleRowClick(item)}>
                  <td>
                    <div style={{ fontWeight: "500", color: "var(--text-main)", maxWidth: "380px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {item.message}
                    </div>
                  </td>
                  <td>
                    <span style={{ fontFamily: "var(--font-mono)", fontWeight: "700", fontSize: "1rem", color: item.riskLevel === "HIGH" ? "var(--risk-high)" : item.riskLevel === "MEDIUM" ? "var(--risk-med)" : "var(--risk-low)" }}>
                      {item.riskScore}
                    </span>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}> / 100</span>
                  </td>
                  <td>
                    <RiskBadge level={item.riskLevel} size="small" />
                  </td>
                  <td>
                    <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)", fontWeight: "500" }}>
                      {item.scamType}
                    </span>
                  </td>
                  <td>
                    <span style={{ fontSize: "0.82rem", color: "var(--text-muted)", whiteSpace: "nowrap" }}>
                      {item.dateFormatted || "Recent"}
                    </span>
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <span style={{ fontSize: "0.8rem", color: "var(--cyan-primary)", fontWeight: "600", display: "inline-flex", alignItems: "center", gap: "2px" }}>
                      <span>Report</span>
                      <ExternalLink size={13} />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
        @media (max-width: 992px) {
          .dashboard-mid-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
