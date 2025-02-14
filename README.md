# AI Trading Signals Dashboard

An AI-powered trading signal system that uses multiple agents to make trading decisions.

## Features

- Multiple AI agents for different aspects of trading analysis
- FastAPI backend for serving trading signals
- Real-time market data integration
- Sentiment analysis from news sources
- Technical and fundamental analysis

## Setup

1. Clone the repository
2. Install dependencies: `poetry install`
3. Copy `.env.example` to `.env` and fill in your API keys
4. Run the development server: `poetry run uvicorn src.app.main:app --reload`

## Project Structure

- `src/agents/`: Individual trading agents
- `src/app/`: FastAPI application
- `src/data/`: Data storage and caching

## Tech Stack

- **Frontend**: Next.js, TypeScript, TailwindCSS
- **Backend**: FastAPI, Python
- **WebSocket**: Real-time updates
- **Data Analysis**: Custom trading signal algorithms

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Python 3.8+
- pip

### Installation

1. Clone the repository:

```bash
git clone https://github.com/AlbertKong0827/trading-signals-dashboard.git
cd trading-signals-dashboard
```

2. Install frontend dependencies:

```bash
cd frontend
npm install
```

3. Install backend dependencies:
```bash
cd backend
pip install -r requirements.txt
```

### Running the Application

1. Start the backend server:
```bash
cd backend
uvicorn main:app --reload
```

2. Start the frontend development server:
```bash
cd frontend
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. Enter a stock ticker symbol in the search box (e.g., TSLA, AAPL)
2. Click "Get Signal" to generate a trading signal
3. View the signal details including:
   - Buy/Sell recommendation
   - Confidence level
   - Reasoning
   - Agent-based confidence metrics

## Acknowledgments

This project's trading signal generation logic is adapted from [Free US Investment Agent System](https://github.com/24mlight/Free_US_Investment_Agent_System). Thanks to the original authors for their excellent work and making it available under the MIT license.
