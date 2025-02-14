# Trading Signals Dashboard

A real-time dashboard that displays trading signals and confidence metrics for different stock tickers.

## Features

- Real-time trading signals generation
- Interactive ticker search
- Signal confidence visualization
- Agent-based signal analysis
- Historical signal tracking

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

## Project Structure

```
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   └── services/
│   └── package.json
└── backend/
    ├── main.py
    ├── models/
    └── requirements.txt
```

## Acknowledgments

This project's trading signal generation logic is adapted from [Free US Investment Agent System](https://github.com/24mlight/Free_US_Investment_Agent_System). Rhanks to the original authors for their excellent work and making it available under the MIT license.
