import React from "react";


export default function Filters({ query, setQuery, statusFilter, setStatusFilter, theme }) {
return (
<div style={{ display: "grid", gridTemplateColumns: "1fr 200px", gap: 12, marginBottom: 20 }}>
<input
placeholder="Search by project, UNIC ID, or vintage…"
value={query}
onChange={(e) => setQuery(e.target.value)}
style={{ padding: "12px 14px", borderRadius: 12, border: "1px solid #cbd5e1", outline: "none", background: "white", color: theme.text }}
/>
<select
value={statusFilter}
onChange={(e) => setStatusFilter(e.target.value)}
style={{ padding: "12px 14px", borderRadius: 12, border: "1px solid #cbd5e1", background: "white", color: theme.text }}
>
<option>All</option>
<option>Active</option>
<option>Retired</option>
</select>
</div>
);
}