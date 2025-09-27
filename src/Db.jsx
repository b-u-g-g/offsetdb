import React, { useMemo, useState } from "react";
import credits from "./credits.json";                 // JSON file
import Filters from "./components/Filters.jsx";       // Filter component
import { downloadRetirementCertificate } from "./utils/downloadCertificate.js"; // Download helper

const THEME = {
  sidebarBg: "#0F1F1C",
  pageBg: "#E7F2EF",
  cardBg: "#F2F6F4",
  mint: "#8FD6C8",
  primary: "#19B394",
  text: "#0F172A",
  active: "#22c55e",
  retired: "#6b7280",
};

export default function CarbonCreditsDashboard() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selected, setSelected] = useState(null);

  // Apply filters
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return credits.filter((c) => {
      const matchesQuery = !q
        ? true
        : c.project_name.toLowerCase().includes(q) ||
          c.unic_id.toLowerCase().includes(q) ||
          String(c.vintage).includes(q);
      const matchesStatus =
        statusFilter === "All" ? true : c.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [query, statusFilter]);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "260px 1fr",
        height: "100vh",
        background: THEME.pageBg,
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          background: THEME.sidebarBg,
          color: "#D1FAEE",
          padding: 20,
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <div style={{ fontSize: 18, fontWeight: 800, color: THEME.mint }}>
          CARBON<span style={{ color: "#89f0db" }}>•</span>CREDITS
        </div>
        <div style={{ fontSize: 12, color: "#9FE3D7" }}>
          White-Label Dashboard
        </div>
        <nav style={{ marginTop: 24, display: "grid", gap: 10 }}>
          <a
            style={{
              color: "#CFF5EB",
              textDecoration: "none",
              fontWeight: 600,
            }}
            href="#"
          >
            Portfolio
          </a>
          <a
            style={{
              color: "#89f0db",
              textDecoration: "none",
              opacity: 0.85,
            }}
            href="#"
          >
            Projects
          </a>
          <a
            style={{
              color: "#89f0db",
              textDecoration: "none",
              opacity: 0.85,
            }}
            href="#"
          >
            Certificates
          </a>
        </nav>
        <div style={{ marginTop: "auto", fontSize: 12, color: "#9FE3D7" }}>
          © Offset • Transparency by design
        </div>
      </aside>

      {/* Main */}
      <main style={{ padding: 24, overflow: "auto" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 16,
          }}
        >
          <h1
            style={{ fontSize: 24, fontWeight: 800, color: THEME.text, margin: 0 }}
          >
            Credits
          </h1>
          <div style={{ display: "flex", gap: 8 }}>
            <span
              style={{
                padding: "6px 10px",
                borderRadius: 999,
                background: THEME.cardBg,
                color: THEME.text,
                fontSize: 12,
              }}
            >
              Total: {filtered.length}
            </span>
          </div>
        </div>

        {/* Filters */}
        <Filters
          query={query}
          setQuery={setQuery}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          theme={THEME}
        />

        {/* Grid of credits */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: 16,
          }}
        >
          {filtered.map((c) => (
            <div
              key={c.unic_id}
              style={{
                background: THEME.cardBg,
                border: "1px solid #e5e7eb",
                borderRadius: 16,
                padding: 16,
                display: "grid",
                gap: 10,
                boxShadow: "0 1px 0 rgba(16,24,40,.04)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ fontWeight: 700, color: THEME.text }}>
                  {c.project_name}
                </div>
                <StatusBadge status={c.status} />
              </div>
              <div style={{ fontSize: 12, color: "#475569" }}>UNIC ID</div>
              <div
                style={{
                  fontFamily:
                    "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                  fontSize: 12,
                  color: THEME.text,
                }}
              >
                {c.unic_id}
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 8,
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span style={{ fontSize: 12, color: "#475569" }}>Vintage</span>
                <strong style={{ color: THEME.text }}>{c.vintage}</strong>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
            <button
                onClick={() => setSelected(c)}
                style={{
                flex: 1,
                padding: "10px 12px",
                borderRadius: 12,
                border: "1px solid #cbd5e1",
                background: "white",
                color: THEME.text,
                fontWeight: 600,
                }}
            >
                View Details
            </button>
            </div>
                
              
            </div>
          ))}
        </div>

        {/* Details Panel */}
        {selected && (
          <DetailsPanel credit={selected} onClose={() => setSelected(null)} />
        )}
      </main>
    </div>
  );
}

// Badge
function StatusBadge({ status }) {
  const isActive = status === "Active";
  const bg = isActive ? THEME.active : THEME.retired;
  return (
    <span
      style={{
        background: bg,
        color: "white",
        padding: "4px 10px",
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 700,
      }}
    >
      {status}
    </span>
  );
}

// Side panel
function DetailsPanel({ credit, onClose }) {
  // close on overlay click
  const onOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const isRetired = credit.status === "Retired";

  return (
    <div
      onClick={onOverlayClick}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(15, 23, 42, 0.35)",
        display: "grid",
        padding: 16,
        zIndex: 50,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()} // prevent overlay close
        style={{
          alignSelf: "center",
          justifySelf: "center",
          width: "90%",
          maxWidth: 520,
          background: "white",
          borderRadius: 20,
          boxShadow: "0 10px 30px rgba(2,6,23,.2)",
          overflow: "hidden",
          color: "#0F172A", // ensure readable text
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: 20,
            borderBottom: "1px solid #e5e7eb",
            background: "#F2F6F4",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h2 style={{ margin: 0, fontSize: 18, color: "#0F172A" }}>
            Credit Details
          </h2>
          <button
            onClick={onClose}
            style={{
              border: "none",
              background: "transparent",
              fontSize: 18,
              cursor: "pointer",
              color: "#334155",
            }}
            aria-label="Close"
            title="Close"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: 20, display: "grid", gap: 12 }}>
          <Row label="Project" value={credit.project_name} />
          <Row label="UNIC ID" mono value={credit.unic_id} />
          <Row label="Vintage" value={String(credit.vintage)} />
          <Row label="Status" value={<StatusBadge status={credit.status} />} />
          <div style={{ height: 1, background: "#e5e7eb", margin: "8px 0" }} />
          <div style={{ fontSize: 12, color: "#475569" }}>
            Lifecycle <strong>created → sold → retired</strong>. Nothing is ever
            deleted. Certificates remain auditable.
          </div>
        </div>

        {/* Footer actions — now includes Download */}
        <div
          style={{
            padding: 20,
            borderTop: "1px solid #e5e7eb",
            display: "flex",
            gap: 10,
            justifyContent: "flex-end",
            background: "#FDFDFD",
          }}
        >
          <button
            onClick={onClose}
            style={{
              padding: "10px 12px",
              borderRadius: 12,
              border: "1px solid #cbd5e1",
              background: "white",
              fontWeight: 600,
              color: "#0F172A",
            }}
          >
            Close
          </button>

          <button
            onClick={() => downloadRetirementCertificate(credit, THEME)}
            disabled={!isRetired}
            title={
              isRetired
                ? "Download Retirement Certificate"
                : "Certificates are issued only when retired"
            }
            style={{
              padding: "10px 14px",
              borderRadius: 12,
              border: "none",
              color: "white",
              fontWeight: 700,
              background: isRetired ? THEME.retired : "#cbd5e1",
              cursor: isRetired ? "pointer" : "not-allowed",
            }}
          >
            Download Certificate
          </button>
        </div>
      </div>
    </div>
  );
}


function Row({ label, value, mono }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "120px 1fr",
        alignItems: "center",
        gap: 10,
      }}
    >
      <div style={{ fontSize: 12, color: "#475569" }}>{label}</div>
      <div
        style={{
          fontFamily: mono
            ? "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
            : undefined,
        }}
      >
        {value}
      </div>
    </div>
  );
}
