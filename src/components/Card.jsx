
import React from "react";


export default function Card({ credit, onOpen }) {
  const isActive = credit.status === "Active";

  return (
    <div
      className="card"
      style={{
        background: "var(--card-bg)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius)",
        boxShadow: "var(--shadow)",
        padding: 16,
        display: "grid",
        gap: 10,
      }}
    >
      {/* Title + badge pinned right */}
      <div className="card-header">
        <div style={{ fontWeight: 700, color: "var(--text)" }}>
          {credit.project_name}
        </div>
        <span className={`badge ${isActive ? "active" : "retired"}`}>
          {credit.status}
        </span>
      </div>

      <div className="muted" style={{ fontSize: 12 }}>
        UNIC ID
      </div>
      <div
        style={{
          fontFamily:
            "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
          fontSize: 12,
          color: "var(--text)",
        }}
      >
        {credit.unic_id}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span className="muted" style={{ fontSize: 12 }}>
          Vintage
        </span>
        <strong>{credit.vintage}</strong>
      </div>

      <button
        onClick={onOpen}
        className="btn-light"
        style={{
          padding: "10px 12px",
          borderRadius: 12,
          fontWeight: 600,
        }}
        aria-label="View details"
      >
        View Details
      </button>
    </div>
  );
}
