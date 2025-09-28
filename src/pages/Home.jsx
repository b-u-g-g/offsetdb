// src/pages/Home.jsx
import React, { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import credits from "../credits.json";
import { downloadRetirementCertificate } from "../utils/downloadCertificate.js";
import Card from "../components/Card.jsx";
import CreditPopup from "../components/CreditPopup.jsx";

// Left panel background image
import panelImg from "../assets/panel.jpeg";

const SIDEBAR_W = 260; // left panel width

const THEME = {
  text: "var(--text)",
  cardBg: "var(--card-bg)",
  border: "var(--border)",
  shadow: "var(--shadow)",
  radius: "var(--radius)",
  ok: "var(--ok)",
  retired: "var(--retired)",
  accent: "var(--accent)",
};

export default function Home() {
  const [selected, setSelected] = useState(null);
  const location = useLocation();

  const { activeCredits, retiredCredits } = useMemo(() => {
    const active = credits.filter((c) => c.status === "Active");
    const retired = credits.filter((c) => c.status === "Retired");
    return { activeCredits: active, retiredCredits: retired };
  }, []);

  // Carousel state
  const [start, setStart] = useState(0);
  const visible = 3;
  const total = activeCredits.length || 1;

  const visibleCards = Array.from({ length: Math.min(visible, total) }, (_, k) =>
    activeCredits[(start + k) % total]
  );

  const prev = () => setStart((s) => (s - 1 + total) % total);
  const next = () => setStart((s) => (s + 1) % total);

  // ---- Sidebar Nav helpers ----
  const isActive = (path) =>
    path === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(path);

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
    transform: "translateZ(0)", // smoother pop on hover
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
      {/* Small CSS helper to collapse sidebar on very small screens */}
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
        {/* dark overlay for readability */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.55) 100%)",
          }}
        />
        {/* panel content */}
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
            {/* Home */}
            <Link
              to="/"
              style={navItemStyle(isActive("/"))}
              onMouseEnter={handleHoverIn}
              onMouseLeave={(e) => handleHoverOut(e, isActive("/"))}
            >
              <span className="nav-text" style={{ fontSize: 14 }}>Home</span>
            </Link>

            {/* View All */}
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

      {/* Shifted content area */}
      <main
        className="content-shift"
        style={{ background: "var(--page-bg)", marginLeft: SIDEBAR_W }}
      >
        {/* ⛔ Top-right View All removed */}

        {/* Carousel */}
        <section style={{ padding: "16px 16px 24px" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <h1 style={{ margin: "0 0 12px", color: THEME.text }}>Active Projects</h1>

            <div
              style={{
                position: "relative",
                display: "grid",
                gridTemplateColumns: "40px 1fr 40px",
                alignItems: "center",
                gap: 12,
              }}
            >
              <ArrowButton direction="left" onClick={prev} />
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: `repeat(${visibleCards.length}, 1fr)`,
                  gap: 16,
                  alignItems: "stretch",
                }}
              >
                {visibleCards.map((c) => (
                  <Card key={c.unic_id} credit={c} onOpen={() => setSelected(c)} />
                ))}
              </div>
              <ArrowButton direction="right" onClick={next} />
            </div>
          </div>
        </section>

        {/* Retired Card section */}
        <section style={{ padding: "8px 16px 32px" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <h2 style={{ margin: "0 0 16px", color: THEME.text }}>Retired</h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                gap: 16,
              }}
            >
              {retiredCredits.map((c) => (
                <Card key={c.unic_id} credit={c} onOpen={() => setSelected(c)} />
              ))}
            </div>
          </div>
        </section>

        {/* Shared popup for details & download */}
        <CreditPopup
          credit={selected}
          onClose={() => setSelected(null)}
          onDownload={(credit) => downloadRetirementCertificate(credit, THEME)}
        />
      </main>
    </>
  );
}

/* Modernized arrow button — position unchanged */
function ArrowButton({ direction, onClick }) {
  const isLeft = direction === "left";
  return (
    <button
      aria-label={isLeft ? "Previous" : "Next"}
      onClick={onClick}
      style={{
        height: 44,
        width: 44,
        borderRadius: "50%",
        border: "none",
        background: "rgba(255, 255, 255, 0.7)",
        backdropFilter: "blur(6px)",
        display: "grid",
        placeItems: "center",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        cursor: "pointer",
        fontSize: "1.2rem",
        transition: "all 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "var(--accent)";
        e.currentTarget.style.color = "#fff";
        e.currentTarget.style.transform = "scale(1.05)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "rgba(255, 255, 255, 0.7)";
        e.currentTarget.style.color = "inherit";
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      {isLeft ? "←" : "→"}
    </button>
  );
}
