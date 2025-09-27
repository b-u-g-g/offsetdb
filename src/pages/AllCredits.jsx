// src/pages/AllCredits.jsx
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import credits from "../credits.json";
import Filters from "../components/Filters.jsx";
import { filterCredits } from "../utils/filterCredits.js";
import { downloadRetirementCertificate } from "../utils/downloadCertificate.js";
import Card from "../components/Card.jsx";
import CreditPopup from "../components/CreditPopup.jsx"; 

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

  const filtered = useMemo(
    () => filterCredits(credits, { query, statusFilter }),
    [query, statusFilter]
  );

  return (
    <main style={{ background: "var(--page-bg)" }}>
      {/* Back arrow below the header */}
      <div style={{ padding: "8px 16px 0" }}>
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          <Link to="/" style={{ fontWeight: 600 }}>← Back to Home</Link>
        </div>
      </div>

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
            <Card
              key={c.unic_id}
              credit={c}
              onOpen={() => setSelected(c)}
            />
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
  );
}
