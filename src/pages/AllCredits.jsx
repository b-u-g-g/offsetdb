import React, { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import credits from "../credits.json";
import Filters from "../components/Filters.jsx";
import { filterCredits } from "../utils/filterCredits.js";
import { downloadRetirementCertificate } from "../utils/downloadCertificate.js";
import Card from "../components/Card.jsx";
import CreditPopup from "../components/CreditPopup.jsx";
import panelImg from "../assets/panel.jpeg";

const SIDEBAR_W = 260;

const THEME = {
  text: "var(--text)",
  cardBg: "var(--card-bg)",
  border: "var(--border)",
  accent: "var(--accent)",
  shadow: "var(--shadow)",
  radius: "var(--radius)",
};

export default function AllCredits() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selected, setSelected] = useState(null);
  const location = useLocation();

  const filtered = useMemo(
    () => filterCredits(credits, { query, statusFilter }),
    [query, statusFilter]
  );

  // Sidebar Nav helpers
  const isActive = (path) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  const navItemStyle = (active) => ({
    textAlign: "left",
    background: active ? "rgba(255,255,255,0.26)" : "rgba(255,255,255,0.14)",
    border: active
      ? "1px solid rgba(255,255,255,0.45)"
      : "1px solid rgba(255,255,255,0.18)",
    color: "#fff",
    borderRadius: 12,
    padding: "10px 12px",
    backdropFilter: "blur(6px)",
    cursor: "pointer",
    textDecoration: "none",
    transition: "transform .18s ease, background .2s ease, box-shadow .18s ease",
    boxShadow: active ? "0 6px 18px rgba(0,0,0,0.18)" : "none",
    transform: "translateZ(0)",
    display: "block",
  });

  const handleHoverIn = (e) => {
    e.currentTarget.style.transform = "translateY(-1px) scale(1.04)";
    if (!e.currentTarget.style.background.includes("0.26)")) {
      e.currentTarget.style.background = "rgba(255,255,255,0.22)";
    }
  };
  const handleHoverOut = (e, active) => {
    e.currentTarget.style.transform = "translateY(0) scale(1)";
    e.currentTarget.style.background = active
      ? "rgba(255,255,255,0.26)"
      : "rgba(255,255,255,0.14)";
  };

  return (
    <>
      
      <style>{`
        @media (max-width: 920px) {
          .content-shift { margin-left: 84px !important; }
          .left-panel { width: 84px !important; }
          .left-panel .panel-title { font-size: 0.9rem !important; }
          .left-panel .nav-text { display: none !important; }
        }
      `}</style>

      {/* Left image panel */}
      <aside
        className="left-panel"
        style={{
          position: "fixed",
          inset: 0,
          right: "auto",
          width: SIDEBAR_W,
          backgroundImage: `url(${panelImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRight: "1px solid var(--border)",
          boxShadow: "4px 0 24px rgba(0,0,0,0.08)",
          zIndex: 10,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.55) 100%)",
          }}
        />
        <div
          style={{
            position: "relative",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            padding: "20px 16px",
            color: "#fff",
          }}
        >
          <div
            className="panel-title"
            style={{ fontWeight: 700, fontSize: "1.6rem", letterSpacing: 0.3 }}
          >
            Offset
          </div>

          <div style={{ marginTop: 16, height: 1, background: "rgba(255,255,255,0.25)" }} />

          {/* Sidebar nav */}
          <nav style={{ marginTop: 12, display: "grid", gap: 8 }}>
            <Link
              to="/"
              style={navItemStyle(isActive("/"))}
              onMouseEnter={handleHoverIn}
              onMouseLeave={(e) => handleHoverOut(e, isActive("/"))}
            >
              <span className="nav-text" style={{ fontSize: 14 }}>Home</span>
            </Link>

            <Link
              to="/credits"
              style={navItemStyle(isActive("/credits"))}
              onMouseEnter={handleHoverIn}
              onMouseLeave={(e) => handleHoverOut(e, isActive("/credits"))}
            >
              <span className="nav-text" style={{ fontSize: 14 }}>View All</span>
            </Link>
          </nav>
        </div>
      </aside>

   
      <main className="content-shift" style={{ background: "var(--page-bg)", marginLeft: SIDEBAR_W }}>
        <div style={{ maxWidth: 1200, margin: "16px auto 0", padding: "0 16px" }}>
          <h1 style={{ marginTop: 0 }}>All Credits</h1>

          {/* Search + Status filters */}
          <Filters
            query={query}
            setQuery={setQuery}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            theme={{ text: THEME.text, cardBg: THEME.cardBg }}
          />

          {/* Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: 16,
              marginTop: 16,
            }}
          >
            {filtered.map((c) => (
              <Card key={c.unic_id} credit={c} onOpen={() => setSelected(c)} />
            ))}
          </div>
        </div>

        {/* Shared details popup */}
        <CreditPopup
          credit={selected}
          onClose={() => setSelected(null)}
          onDownload={(credit) => downloadRetirementCertificate(credit, THEME)}
        />
      </main>
    </>
  );
}
