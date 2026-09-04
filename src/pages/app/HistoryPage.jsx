import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  History,
  Search,
  Filter,
  Trash2,
  ExternalLink,
  PlusCircle,
  FileDown,
  ShieldAlert,
  Image as ImageIcon,
  FileText
} from 'lucide-react';
import { useAnalysis } from '../../context/AnalysisContext';
import RiskBadge from '../../components/common/RiskBadge';

export default function HistoryPage() {
  const { history, deleteHistoryItem, clearHistory, selectHistoryItem } = useAnalysis();
  const [searchTerm, setSearchTerm] = useState('');
  const [riskFilter, setRiskFilter] = useState('ALL');
  const [typeFilter, setTypeFilter] = useState('ALL'); // 'ALL' | 'TEXT' | 'IMAGE'
  const navigate = useNavigate();

  const filteredHistory = history.filter((item) => {
    const matchesSearch =
      item.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.scamType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.riskLevel.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRisk = riskFilter === 'ALL' || item.riskLevel === riskFilter;

    const isImage = item.scanType === 'image' || Boolean(item.imagePreview);
    const matchesType =
      typeFilter === 'ALL' ||
      (typeFilter === 'IMAGE' && isImage) ||
      (typeFilter === 'TEXT' && !isImage);

    return matchesSearch && matchesRisk && matchesType;
  });

  const handleRowClick = (item) => {
    selectHistoryItem(item);
    navigate('/app/result');
  };

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(history, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `scamshield_history_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontSize: "1.85rem", fontWeight: "800", color: "#ffffff", letterSpacing: "-0.02em" }}>
            Analysis History
          </h1>
          <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", marginTop: "0.25rem" }}>
            Review past text evaluations and screenshot visual threat logs.
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <button
            onClick={handleExport}
            className="btn btn-secondary btn-sm"
            style={{ padding: "0.55rem 1rem" }}
          >
            <FileDown size={16} />
            <span>Export JSON</span>
          </button>

          <Link to="/app/analyze" className="btn btn-primary btn-sm" style={{ padding: "0.55rem 1.1rem" }}>
            <PlusCircle size={16} />
            <span>Analyze Content</span>
          </Link>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="card" style={{ padding: "1.25rem 1.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          {/* Search Input */}
          <div style={{ position: "relative", minWidth: "260px", flex: 1 }}>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search threats, keywords, or OCR text..."
              style={{ width: "100%", paddingLeft: "2.5rem" }}
            />
            <Search size={16} color="var(--text-muted)" style={{ position: "absolute", left: "0.85rem", top: "50%", transform: "translateY(-50%)" }} />
          </div>

          {/* Type Filter Buttons */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <span style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>Type:</span>
            {[
              { id: 'ALL', label: 'All' },
              { id: 'TEXT', label: 'Text' },
              { id: 'IMAGE', label: 'Screenshot' }
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTypeFilter(t.id)}
                className="btn btn-sm"
                style={{
                  padding: "0.35rem 0.75rem",
                  fontSize: "0.78rem",
                  backgroundColor: typeFilter === t.id ? "rgba(0, 229, 255, 0.15)" : "rgba(255, 255, 255, 0.05)",
                  color: typeFilter === t.id ? "var(--cyan-primary)" : "var(--text-secondary)",
                  fontWeight: typeFilter === t.id ? "700" : "500",
                  border: "1px solid",
                  borderColor: typeFilter === t.id ? "var(--cyan-primary)" : "var(--border-subtle)"
                }}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Risk Level Filter Buttons */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <span style={{ fontSize: "0.82rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "0.3rem" }}>
              <Filter size={13} /> Severity:
            </span>

            {['ALL', 'HIGH', 'MEDIUM', 'LOW'].map((filter) => (
              <button
                key={filter}
                onClick={() => setRiskFilter(filter)}
                className="btn btn-sm"
                style={{
                  padding: "0.35rem 0.75rem",
                  fontSize: "0.78rem",
                  backgroundColor: riskFilter === filter ? "var(--cyan-primary)" : "rgba(255, 255, 255, 0.05)",
                  color: riskFilter === filter ? "#060a14" : "var(--text-secondary)",
                  fontWeight: riskFilter === filter ? "700" : "500",
                  border: "1px solid",
                  borderColor: riskFilter === filter ? "var(--cyan-primary)" : "var(--border-subtle)"
                }}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Clear History */}
          {history.length > 0 && (
            <button
              onClick={() => {
                if (window.confirm("Are you sure you want to clear all history logs?")) {
                  clearHistory();
                }
              }}
              className="btn btn-secondary btn-sm"
              style={{ color: "var(--risk-high)", borderColor: "var(--risk-high-border)" }}
            >
              <Trash2 size={14} />
              <span>Clear History</span>
            </button>
          )}
        </div>
      </div>

      {/* History Table */}
      <div className="card" style={{ padding: "0" }}>
        {filteredHistory.length === 0 ? (
          <div style={{ padding: "4rem 2rem", textAlign: "center" }}>
            <History size={40} color="var(--text-muted)" style={{ margin: "0 auto 1rem auto" }} />
            <h3 style={{ fontSize: "1.15rem", fontWeight: "700", color: "#ffffff" }}>No matching analyses found</h3>
            <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", marginTop: "0.3rem" }}>
              Try adjusting your search query or analyze new content.
            </p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th style={{ width: "42%" }}>Threat Inspection</th>
                  <th>Scan Type</th>
                  <th>Risk Score</th>
                  <th>Risk Level</th>
                  <th>Scam Type</th>
                  <th>Date</th>
                  <th style={{ textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredHistory.map((item) => {
                  const isImage = item.scanType === 'image' || Boolean(item.imagePreview);
                  return (
                    <tr key={item.id} onClick={() => handleRowClick(item)}>
                      <td>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                          {isImage && item.imagePreview && (
                            <img
                              src={item.imagePreview}
                              alt="Thumbnail"
                              style={{
                                width: "42px",
                                height: "30px",
                                objectFit: "cover",
                                borderRadius: "4px",
                                border: "1px solid var(--border-light)",
                                flexShrink: 0
                              }}
                            />
                          )}
                          <div style={{ overflow: "hidden" }}>
                            <div style={{ fontWeight: "600", color: "var(--text-main)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                              {item.message.slice(0, 75)}...
                            </div>
                            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                              {item.indicators?.length || 0} threat indicators
                              {isImage && ` • OCR ${item.ocrConfidence || 97.4}%`}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        {isImage ? (
                          <span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", fontSize: "0.78rem", color: "var(--cyan-primary)", fontWeight: "600", background: "rgba(0, 229, 255, 0.1)", padding: "0.2rem 0.55rem", borderRadius: "4px" }}>
                            <ImageIcon size={13} />
                            <span>Screenshot</span>
                          </span>
                        ) : (
                          <span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", fontSize: "0.78rem", color: "var(--text-secondary)", fontWeight: "500", background: "rgba(255, 255, 255, 0.05)", padding: "0.2rem 0.55rem", borderRadius: "4px" }}>
                            <FileText size={13} />
                            <span>Text</span>
                          </span>
                        )}
                      </td>
                      <td>
                        <span style={{ fontFamily: "var(--font-mono)", fontWeight: "800", fontSize: "1.05rem", color: item.riskLevel === "HIGH" ? "var(--risk-high)" : item.riskLevel === "MEDIUM" ? "var(--risk-med)" : "var(--risk-low)" }}>
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
                        <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }} onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => handleRowClick(item)}
                            className="btn btn-secondary btn-sm"
                            style={{ padding: "0.3rem 0.65rem", fontSize: "0.75rem" }}
                            title="Open full report"
                          >
                            <ExternalLink size={13} />
                            <span>View</span>
                          </button>
                          <button
                            onClick={() => deleteHistoryItem(item.id)}
                            className="btn btn-secondary btn-sm"
                            style={{ padding: "0.3rem 0.5rem", color: "var(--risk-high)" }}
                            title="Delete from history"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
