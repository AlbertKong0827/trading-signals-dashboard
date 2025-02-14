import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface Agent {
  agent: string;
  signal: string;
  confidence: number;
}

interface Props {
  agentSignals: Agent[];
}

const ConfidenceChart: React.FC<Props> = ({ agentSignals }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 border">
      <h2 className="text-lg font-semibold">Agent Confidence Levels</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={agentSignals}>
          <XAxis dataKey="agent" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="confidence" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ConfidenceChart;