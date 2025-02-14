"use client";

import { useEffect, useState } from "react";
import { fetchTradingSignals } from "../../services/api";
import SignalCard from "../../components/SignalCard";
import ConfidenceChart from "../../components/ConfidenceChart";
import { connectWebSocket } from "../../services/websocket";

const API_BASE_URL = 'http://localhost:8000';

// Define the signal type
interface TradingSignal {
  ticker: string;
  signal_type: string;
  confidence: number;
  price: number;
  action: string;
  quantity: number;
  agent_signals: any[];
  reasoning: string;
}

export default function Home() {
  /*
  const [signals, setSignals] = useState([]);
  const [ticker, setTicker] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getData() {
      const data = await fetchTradingSignals();
      setSignals(data);
    }
    getData();

    // Connect to WebSocket for live updates
    const socket = connectWebSocket((newSignal) => {
      setSignals((prevSignals) => [newSignal, ...prevSignals]);
    });
    */
  const [signals, setSignals] = useState<TradingSignal[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ticker, setTicker] = useState("");

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000/ws');
      
    ws.onmessage = (event) => {
      const newSignal: TradingSignal = JSON.parse(event.data);
      console.log('WebSocket received:', newSignal); 
      setSignals((prevSignals) => [newSignal, ...prevSignals]);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    const fetchInitialSignals = async () => {
      try {
        const data = await fetchTradingSignals();
        console.log('Initial signals:', data);
        setSignals(data);
      } catch (error) {
        console.error('Error fetching signals:', error);
      }
    };

    fetchInitialSignals();

    return () => {
      ws.close();
    };
  }, []);

  /*
  const requestTradingSignal = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/generate-signal/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ticker }),
      });

      const data = await res.json();
      if (data.error) {
        setError(data.error);
      }
    } catch (err) {
      setError("Failed to fetch trading signal.");
    }
    setLoading(false);
  };
  */
  const requestTradingSignal = async () => {
    setLoading(true);
    setError("");
    
    try {
        const res = await fetch(`http://127.0.0.1:8000/generate-signal/?ticker=${ticker}`, {  // ✅ Use full FastAPI URL
            method: "POST",
            headers: { "Content-Type": "application/json" },
            //body: ticker
            body: JSON.stringify({ ticker }),
        });

        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();

        if (data.error) {
            setError(data.error);
        } else {
            console.log("Received trading signal:", data);
            setSignals([data.data]);
        }
    } catch (err) {
        console.error("API Fetch Error:", err);
        setError("Failed to fetch trading signal.");
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-gray-900">AI Investment Agent</h1>

      <div className="mt-4 flex gap-4">
        <input
          type="text"
          value={ticker}
          onChange={(e) => setTicker(e.target.value)}
          placeholder="Enter stock ticker (e.g., TSLA)"
          className="p-2 border rounded"
        />
        <button
          onClick={requestTradingSignal}
          disabled={loading}
          className="bg-blue-500 text-white p-2 rounded"
        >
          {loading ? "Generating..." : "Get Trading Signal"}
        </button>
      </div>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {signals.length > 0 && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {signals.map((signal, index) => (
            <div key={index}>

              <SignalCard
                ticker={signal.ticker}
                action={signal.action}
                confidence={signal.confidence}
                reasoning={signal.reasoning}
              />

              <ConfidenceChart agentSignals={signal.agent_signals} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}