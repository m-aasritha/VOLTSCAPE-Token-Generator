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
import { HourlyLoad } from '../types';

interface UsageChartProps {
  data: HourlyLoad[];
}

export const UsageChart: React.FC<UsageChartProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Hourly Usage</h2>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="daily_hour"
              label={{ value: 'Hour of Day', position: 'insideBottom', offset: -10 }}
            />
            <YAxis label={{ value: 'kW', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="synthetic_3_6kW"
              stroke="#8884d8"
              name="3.6kW Load"
            />
            <Line
              type="monotone"
              dataKey="synthetic_7_2kW"
              stroke="#82ca9d"
              name="7.2kW Load"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};