const backendBase = "https://adorable-manifestation-production.up.railway.app";

document.getElementById("scrapeForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const base_url = document.getElementById("base_url").value;
  const total_pages = parseInt(document.getElementById("pages").value);
  const statusEl = document.getElementById("status");
  const downloadLink = document.getElementById("downloadLink");

  statusEl.textContent = "⏳ Scraping in progress...";
  statusEl.className = "status";
  downloadLink.classList.add("hidden");

  try {
    const res = await fetch(`${backendBase}/scrape`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ base_url, total_pages, headless: true }),
    });

    if (!res.ok) throw new Error("Request failed");

    const data = await res.json();
    statusEl.textContent = `✅ Scraping complete. ${data.records} records.`;
    statusEl.classList.add("success");

    downloadLink.href = `${backendBase}/download`;
    downloadLink.classList.remove("hidden");
  } catch (err) {
    console.error(err);
    statusEl.textContent = "❌ Failed to fetch or scrape.";
    statusEl.classList.add("error");
  }
});
