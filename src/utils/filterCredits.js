
export function filterCredits(
  data = [],
  { query = "", statusFilter = "All" } = {}
) {
  const q = query.trim().toLowerCase();
  const allStatuses = statusFilter === "All";

  return data.filter((c) => {
    if (!c) return false;

    const matchesQuery =
      !q ||
      [c.project_name, c.unic_id, c.vintage]
        .some((v) => String(v ?? "").toLowerCase().includes(q));

    const matchesStatus = allStatuses || c.status === statusFilter;

    return matchesQuery && matchesStatus;
  });
}
