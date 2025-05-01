import Head from "next/head";
import ScraperForm from "@/components/ScraperForm";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <Head>
        <title>Clutch Scraper</title>
        <meta name="description" content="Scrape Clutch.co agency data easily" />
      </Head>

      <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-xl">
        <h1 className="text-2xl font-bold mb-4 text-center">Clutch Agency Scraper</h1>
        <ScraperForm />
      </div>
    </div>
  );
}
