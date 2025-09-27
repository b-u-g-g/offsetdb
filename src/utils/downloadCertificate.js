export function downloadRetirementCertificate(credit, theme) {
if (!credit || credit.status !== "Retired") return;
const ts = new Date().toISOString();
const html = `<!doctype html>
<html lang="en">
<meta charset="utf-8" />
<title>Retirement Certificate - ${credit.unic_id}</title>
<style>
body { font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; color:${theme.text}; background:#fff; padding:40px; }
.wrap { border:1px solid #e5e7eb; border-radius:16px; padding:32px; max-width:800px; margin:auto; }
.hdr { display:flex; align-items:center; justify-content:space-between; margin-bottom:24px; }
.brand { font-weight:700; font-size:20px; color:${theme.primary}; }
.title { font-size:28px; font-weight:800; margin:0; }
.badge { display:inline-block; padding:6px 10px; border-radius:999px; font-weight:600; font-size:12px; color:#fff; background:${theme.retired}; }
table { width:100%; border-collapse:collapse; margin-top:16px; }
th, td { text-align:left; padding:12px 10px; border-bottom:1px solid #e5e7eb; }
.muted { color:#6b7280; font-size:12px; }
.footer { margin-top:24px; font-size:12px; color:#374151; }
</style>
<div class="wrap">
<div class="hdr">
<div class="brand">OFFSET Registry</div>
<span class="badge">Retired</span>
</div>
<h1 class="title">Carbon Credit Retirement Certificate</h1>
<table>
<tr><th>UNIC ID</th><td>${credit.unic_id}</td></tr>
<tr><th>Project</th><td>${credit.project_name}</td></tr>
<tr><th>Vintage</th><td>${credit.vintage}</td></tr>
<tr><th>Status</th><td>${credit.status}</td></tr>
<tr><th>Timestamp</th><td>${ts}</td></tr>
</table>
<p class="footer">This certificate attests that the above carbon credit has been retired and cannot be resold. Nothing is ever deleted; lifecycle remains auditable (created → sold → retired).</p>
<p class="muted">Checksum: ${btoa(credit.unic_id + "|" + ts).slice(0, 20)} • Verify by matching UNIC and timestamp.</p>
</div>
</html>`;


const blob = new Blob([html], { type: "text/html" });
const url = URL.createObjectURL(blob);
const a = document.createElement("a");
a.href = url;
a.download = `retirement-${credit.unic_id}.html`;
document.body.appendChild(a);
a.click();
a.remove();
URL.revokeObjectURL(url);
}