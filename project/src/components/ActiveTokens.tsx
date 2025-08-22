import React from 'react';
import { Token } from '../types';
import { Zap, Car, Clock, AlertTriangle } from 'lucide-react';
import { format } from 'date-fns';

interface ActiveTokensProps {
  tokens: Token[];
}

export const ActiveTokens: React.FC<ActiveTokensProps> = ({ tokens }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Active Tokens</h2>
      <div className="space-y-4">
        {tokens.map((token) => (
          <div
            key={token.id}
            className="border rounded-lg p-4 flex items-center justify-between"
          >
            <div className="flex items-center space-x-4">
              {token.type === 'charging' ? (
                <Zap className="h-6 w-6 text-yellow-500" />
              ) : (
                <Car className="h-6 w-6 text-blue-500" />
              )}
              <div>
                <p className="font-medium text-gray-800">
                  {token.type.charAt(0).toUpperCase() + token.type.slice(1)} Token
                </p>
                <p className="text-sm text-gray-600">User ID: {token.userId}</p>
                <p className="text-sm text-gray-600">Vehicle: {token.vehicleNumber}</p>
                <p className="text-sm text-gray-500">
                  Expires: {format(token.endTime, 'HH:mm')}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {token.urgencyLevel === 'high' && (
                <AlertTriangle className="h-5 w-5 text-red-500" />
              )}
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  token.status === 'active'
                    ? 'bg-green-100 text-green-800'
                    : token.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {token.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};