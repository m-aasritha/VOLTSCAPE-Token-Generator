import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface DemandPredictionChartProps {
  predictions: { hour: number; demand: number }[];
}

export const DemandPredictionChart: React.FC<DemandPredictionChartProps> = ({ predictions }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Demand Prediction</h2>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={predictions}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="hour"
              label={{ value: 'Hour of Day', position: 'insideBottom', offset: -10 }}
            />
            <YAxis label={{ value: 'Predicted Demand (kW)', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="demand"
              stroke="#ff7300"
              name="Predicted Demand"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};