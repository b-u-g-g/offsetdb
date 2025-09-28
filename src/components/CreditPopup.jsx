import React from "react";

export default function CreditPopup({
  credit,
  onClose,
  onDownload,
  borderColor = "#456345",   
  borderWidth = 1,          
}) {
  if (!credit) return null;

  const isRetired = credit.status === "Retired";
  const onOverlayClick = (e) => e.target === e.currentTarget && onClose?.();

  return (
    <div
      onClick={onOverlayClick}
      className="modal-backdrop"
      style={{
        position: "fixed",
        inset: 0,
        display: "grid",
        padding: 16,
        zIndex: 50,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="modal-card"
        style={{
          alignSelf: "center",
          justifySelf: "center",
          width: "90%",
          maxWidth: 520,
          background: "var(--card-bg)",
          color: "var(--text)",
          border: `${borderWidth}px solid ${borderColor}`, 
          borderRadius: 20,
          boxShadow: "0 10px 30px rgba(2,6,23,.18)",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          className="header"
          style={{
            padding: 20,
            borderBottom: "1px solid var(--border)",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <h3 style={{ margin: 0 }}>Credit Details</h3>
          <button
            onClick={onClose}
            style={{ background: "transparent", border: "none", fontSize: 18 }}
            aria-label="Close"
            title="Close"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: 20, display: "grid", gap: 10 }}>
          <KV label="Project" value={credit.project_name} />
          <KV label="UNIC ID" value={credit.unic_id} mono />
          <KV label="Vintage" value={String(credit.vintage)} />
          <KV
            label="Status"
            value={
              <span className={`badge ${credit.status === "Active" ? "active" : "retired"}`}>
                {credit.status}
              </span>
            }
          />
          <div style={{ height: 1, background: "var(--border)", margin: "8px 0" }} />
          <div className="muted" style={{ fontSize: 12 }}>
            Certificates remain auditable.
          </div>
        </div>

        {/* Footer */}
        <div
          className="footer"
          style={{
            padding: 20,
            borderTop: "1px solid var(--border)",
            display: "flex",
            justifyContent: "flex-end",
            gap: 10,
          }}
        >
          <button
            onClick={onClose}
            style={{
              padding: "10px 12px",
              borderRadius: 12,
              border: "1px solid var(--border)",
              background: "var(--card-bg)",
              fontWeight: 600,
            }}
          >
            Close
          </button>
          <button
            disabled={!isRetired}
            onClick={() => onDownload?.(credit)}
            className={isRetired ? "btn-primary" : undefined}
            style={{
              padding: "10px 14px",
              borderRadius: 12,
              border: "none",
              fontWeight: 700,
              background: isRetired ? "var(--accent)" : "var(--border)",
              color: isRetired ? "var(--accent-contrast)" : "var(--text)",
              cursor: isRetired ? "pointer" : "not-allowed",
            }}
            title={
              isRetired
                ? "Download Retirement Certificate"
                : "Certificates are issued only when retired"
            }
          >
            Download Certificate
          </button>
        </div>
      </div>
    </div>
  );
}

function KV({ label, value, mono }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "120px 1fr",
        alignItems: "center",
        gap: 10,
      }}
    >
      <div className="muted" style={{ fontSize: 12 }}>
        {label}
      </div>
      <div
        style={{
          fontFamily: mono
            ? "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
            : undefined,
        }}
      >
        {value}
      </div>
    </div>
  );
}
