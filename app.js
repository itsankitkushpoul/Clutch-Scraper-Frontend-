const form = document.getElementById('scrape-form');
const statusDiv = document.getElementById('status');
const downloadLink = document.getElementById('download-link');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  downloadLink.hidden = true;
  statusDiv.textContent = 'Starting scraper...';

  const payload = {
    base_url: document.getElementById('base_url').value,
    total_pages: Number(document.getElementById('total_pages').value),
    headless: document.getElementById('headless').checked,
  };

  try {
    const resp = await fetch('https://YOUR_BACKEND_DOMAIN/scrape', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await resp.json();

    if (!resp.ok) throw new Error(data.detail || 'Error');

    statusDiv.textContent = `Scraped ${data.records} records.`;
    downloadLink.href = `https://YOUR_BACKEND_DOMAIN/download`;
    downloadLink.hidden = false;
  } catch (err) {
    statusDiv.textContent = 'Failed: ' + err.message;
  }
});
