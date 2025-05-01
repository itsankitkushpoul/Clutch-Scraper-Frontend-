import { useState } from "react";
import axios from "axios";

export default function ScraperForm() {
  const [baseUrl, setBaseUrl] = useState("https://clutch.co/agencies/digital-marketing");
  const [totalPages, setTotalPages] = useState(3);
  const [loading, setLoading] = useState(false);
  const [downloadReady, setDownloadReady] = useState(false);
  const [error, setError] = useState(null);
  const [apiStatus, setApiStatus] = useState(null);
  const [apiMessage, setApiMessage] = useState("");

  const BACKEND_URL = "https://your-fastapi-backend.com"; // Replace with your actual backend URL

  const handleScrape = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setDownloadReady(false);

    try {
      const response = await axios.post(
        `${BACKEND_URL}/scrape`,
        {
          base_url: baseUrl,
          total_pages: parseInt(totalPages),
          headless: true,
        }
      );

      if (response.data.status === "success") {
        setDownloadReady(true);
      }
    } catch (err) {
      setError(err?.response?.data?.detail || "Scraping failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    window.open(`${BACKEND_URL}/download`, "_blank");
  };

  const checkApi = async () => {
    setApiStatus(null);
    setApiMessage("Checking API connection...");

    try {
      const res = await axios.get(`${BACKEND_URL}/`);
      if (res.status === 200 && res.data.status === "alive") {
        setApiStatus("ok");
        setApiMessage("API connected successfully.");
      } else {
        setApiStatus("fail");
        setApiMessage("Unexpected response from the API.");
      }
    } catch (err) {
      setApiStatus("fail");
      if (err.message.includes("Network Error")) {
        setApiMessage("Network error. Please check if the API URL is correct.");
      } else if (err.response?.status === 404) {
        setApiMessage("API route not found (404).");
      } else if (err.response?.status >= 500) {
        setApiMessage("Server error. The API may be down.");
      } else {
        setApiMessage("Unknown error occurred: " + err.message);
      }
    }
  };

  return (
    <form onSubmit={handleScrape} className="space-y-4">
      <div className="text-center">
        <button
          type="button"
          onClick={checkApi}
          className="text-sm text-blue-600 underline hover:text-blue-800"
        >
          Check API Connection
        </button>
        {apiMessage && (
          <p
            className={`mt-1 text-sm ${
              apiStatus === "ok" ? "text-green-600" : "text-red-600"
            }`}
          >
            {apiMessage}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Base URL</label>
        <input
          type="text"
          value={baseUrl}
          onChange={(e) => setBaseUrl(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Total Pages</label>
        <input
          type="number"
          value={totalPages}
          min={1}
          onChange={(e) => setTotalPages(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-2 px-4 text-white rounded-lg ${
          loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Scraping..." : "Start Scraping"}
      </button>

      {downloadReady && (
        <button
          type="button"
          onClick={handleDownload}
          className="w-full mt-2 py-2 px-4 text-white bg-green-600 hover:bg-green-700 rounded-lg"
        >
          Download CSV
        </button>
      )}

      {error && (
        <p className="text-red-600 text-sm mt-2 text-center">{error}</p>
      )}
    </form>
  );
}
