const API_BASE = 'https://YOUR_API_DOMAIN'; // ← update this to your deployed FastAPI URL

const form       = document.getElementById('scrape-form');
const statusDiv  = document.getElementById('status');
const statusText = document.getElementById('status-text');
const recordsP   = document.getElementById('records');
const dlLink     = document.getElementById('download-link');
const newBtn     = document.getElementById('new-scrape');

form.addEventListener('submit', async e => {
  e.preventDefault();
  statusDiv.classList.remove('hidden');
  statusText.textContent = 'Scraping in progress…';
  recordsP.textContent = '';
  dlLink.classList.add('hidden');
  newBtn.classList.add('hidden');

  const payload = {
    base_url:  document.getElementById('baseUrl').value,
    total_pages: parseInt(document.getElementById('totalPages').value, 10),
    headless: document.getElementById('headless').checked
  };

  try {
    const res = await fetch(`${API_BASE}/scrape`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();

    if (!res.ok) throw new Error(data.detail || 'Unknown error');
    statusText.textContent = 'Scrape Complete 🎉';
    recordsP.textContent = `Records found: ${data.records}`;
    dlLink.href = `${API_BASE}/download`;
    dlLink.classList.remove('hidden');
  } catch (err) {
    statusText.textContent = `Error: ${err.message}`;
  } finally {
    newBtn.classList.remove('hidden');
  }
});

newBtn.addEventListener('click', () => {
  statusDiv.classList.add('hidden');
  form.reset();
  document.getElementById('headless').checked = true;
});
