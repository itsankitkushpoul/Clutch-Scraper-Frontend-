const API_BASE = 'https://adorable-manifestation-production.up.railway.app';
const apiStatusEl = document.getElementById('api-status');
const form = document.getElementById('scrape-form');
const statusCard = document.getElementById('status-card');
const statusText = document.getElementById('status-text');
const downloadLink = document.getElementById('download-link');
const newBtn = document.getElementById('new-scrape');

async function checkApi() {
  try {
    const res = await fetch(`${API_BASE}/`);
    if (res.ok) {
      apiStatusEl.textContent = 'API Status: Connected';
      apiStatusEl.classList.replace('status--disconnected', 'status--connected');
    }
  } catch {
    // stays disconnected
  }
}

// on load, ping API
checkApi();

form.addEventListener('submit', async e => {
  e.preventDefault();
  statusCard.classList.add('hidden');
  statusText.textContent = 'Scraping in progress…';
  downloadLink.classList.add('hidden');
  newBtn.classList.add('hidden');

  const payload = {
    base_url:  document.getElementById('baseUrl').value,
    total_pages: +document.getElementById('totalPages').value,
    headless: document.getElementById('headless').checked
  };

  try {
    const res = await fetch(`${API_BASE}/scrape`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.detail || 'Error scraping');
    statusText.textContent = `${data.records} Records`;
    downloadLink.href = `${API_BASE}/download`;
    downloadLink.classList.remove('hidden');
  } catch (err) {
    statusText.textContent = `Error: ${err.message}`;
  } finally {
    statusCard.classList.remove('hidden');
    newBtn.classList.remove('hidden');
  }
});

newBtn.addEventListener('click', () => {
  statusCard.classList.add('hidden');
  form.reset();
  document.getElementById('headless').checked = true;
});
