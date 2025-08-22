import React, { useState } from 'react';
import { TokenGenerator } from './components/TokenGenerator';
import { UsageChart } from './components/UsageChart';
import { ActiveTokens } from './components/ActiveTokens';
import { DemandPredictionChart } from './components/DemandPredictionChart';
import { Token } from './types';
import { addHours } from 'date-fns';
import { LayoutDashboard } from 'lucide-react';
import { useDemandPrediction } from './hooks/useDemandPrediction';
import { chargingSessionsData, hourlyLoadsData } from './data/mockData';

function App() {
  const [tokens, setTokens] = useState<Token[]>([]);
  const { predictions, getOptimalSlot } = useDemandPrediction(chargingSessionsData);

  const handleGenerateToken = (
    type: 'parking' | 'charging',
    urgency: 'low' | 'medium' | 'high',
    userId: string,
    vehicleNumber: string
  ) => {
    const existingToken = tokens.find(
      token => token.vehicleNumber === vehicleNumber && token.status === 'active'
    );

    if (existingToken) {
      alert('This vehicle already has an active token!');
      return;
    }

    const optimalSlot = getOptimalSlot(urgency);
    const newToken: Token = {
      id: Math.random().toString(36).substr(2, 9),
      userId,
      vehicleNumber,
      type,
      status: 'active',
      startTime: new Date(),
      endTime: addHours(new Date(), type === 'charging' ? 2 : 4),
      priority: urgency === 'high' ? 3 : urgency === 'medium' ? 2 : 1,
      urgencyLevel: urgency
    };

    setTokens([...tokens, newToken]);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <LayoutDashboard className="h-8 w-8 text-blue-500" />
              <span className="ml-2 text-xl font-bold text-gray-800">VoltScape</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <TokenGenerator onGenerateToken={handleGenerateToken} />
            <ActiveTokens tokens={tokens} />
          </div>
          <div className="space-y-8">
            <UsageChart data={hourlyLoadsData} />
            <DemandPredictionChart predictions={predictions} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;