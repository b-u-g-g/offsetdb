import React from "react";
import cardBg from "../assets/p.jpeg"; 

const CARD_W = 260; 

export default function Card({ credit, onOpen }) {
  const isActive = credit.status === "Active";

  return (
    <div
      className="card"
      style={{
        width: CARD_W,           
        maxWidth: "100%",
        boxSizing: "border-box",
        margin: "0 auto",
        alignSelf: "center",
        flex: "0 0 auto",
        position: "relative",
        backgroundImage: `url(${cardBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius)",
        boxShadow: "var(--shadow)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        minHeight: 320, 
      }}
    >
     
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.00) 40%, rgba(0,0,0,0.25) 85%)",
          pointerEvents: "none",
        }}
      />

      {/* Transparent/blurred info section */}
      <div
        style={{
          marginTop: "auto",
          padding: 12,
          display: "grid",
          gap: 8,
          background: "rgba(255,255,255,0.55)",
          backdropFilter: "blur(6px)",
          borderTop: "1px solid rgba(255,255,255,0.35)",
        }}
      >
        {/* Title + badge */}
        <div
          className="card-header"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 8,
          }}
        >
          <div style={{ fontWeight: 700, color: "var(--text)" }}>
            {credit.project_name}
          </div>
          <span className={`badge ${isActive ? "active" : "retired"}`}>
            {credit.status}
          </span>
        </div>

        {/* UNIC + Vintage */}
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

        {/* View Details button */}
        <button
          onClick={onOpen}
          className="btn-light"
          aria-label="View details"
          style={{
            padding: "10px 12px",
            borderRadius: 12,
            fontWeight: 700,
            width: "100%", 
            cursor: "pointer",
            transition: "transform .15s ease, box-shadow .15s ease",
            
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-1px)";
            e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,0,0,0.12)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          View Details
        </button>
      </div>
    </div>
  );
}
