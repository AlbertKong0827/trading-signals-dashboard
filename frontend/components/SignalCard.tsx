import React from "react";

interface SignalCardProps {
  ticker: string;
  action: string;
  confidence: number;
  reasoning: string;
}

export default function SignalCard({ ticker, action, confidence, reasoning }: SignalCardProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-2">{ticker?.toUpperCase()}</h3>
      <div className="flex justify-between items-center mb-2">
        <span className={`font-bold ${action === 'BUY' ? 'text-green-600' : 'text-red-600'}`}>
          {action}
        </span>
        <span className="text-gray-600">
          Confidence: {(confidence * 100).toFixed(1)}%
        </span>
      </div>
      <p className="text-gray-700">{reasoning}</p>
    </div>
  );
}