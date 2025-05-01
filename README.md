# Clutch Scraper Frontend

This is the frontend for a **Clutch Scraper** that allows users to scrape data from the [Clutch.co](https://clutch.co) directory of digital marketing agencies. The frontend is built using **Next.js** and communicates with a **FastAPI** backend to perform the scraping and allow users to download the scraped data as a CSV file.

## Features

- **Scrape Clutch.co**: Allows users to input a URL and number of pages to scrape.
- **Download CSV**: After scraping, users can download the results in CSV format.
- **API Connectivity Check**: Users can check if the backend API is connected and working properly.

## Prerequisites

- **Node.js** and **npm** installed on your machine.
- A working **FastAPI** backend server that handles scraping and CSV generation.

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/clutch-scraper-frontend.git
   cd clutch-scraper-frontend
