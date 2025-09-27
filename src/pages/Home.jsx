// src/pages/Home.jsx
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import credits from "../credits.json";
import { downloadRetirementCertificate } from "../utils/downloadCertificate.js";
import Card from "../components/Card.jsx";
import CreditPopup from "../components/CreditPopup.jsx"; 

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

  return (
    <main style={{ background: "var(--page-bg)" }}>
      
      <div style={{ padding: "8px 16px 0" }}>
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Link
            to="/credits"
            className="btn-primary"
            style={{ padding: "8px 12px", borderRadius: 10 }}
          >
            View All
          </Link>
        </div>
      </div>

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
  );
}


function ArrowButton({ direction, onClick }) {
  const isLeft = direction === "left";
  return (
    <button
      aria-label={isLeft ? "Previous" : "Next"}
      onClick={onClick}
      style={{
        height: 44,
        width: 44,
        borderRadius: 999,
        border: "1px solid var(--border)",
        background: "var(--card-bg)",
        display: "grid",
        placeItems: "center",
        boxShadow: "var(--shadow)",
      }}
    >
      {isLeft ? "←" : "→"}
    </button>
  );
}
