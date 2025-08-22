import React, { useState } from 'react';
import { Clock, Zap, Car } from 'lucide-react';

interface TokenGeneratorProps {
  onGenerateToken: (
    type: 'parking' | 'charging',
    urgency: 'low' | 'medium' | 'high',
    userId: string,
    vehicleNumber: string
  ) => void;
}

export const TokenGenerator: React.FC<TokenGeneratorProps> = ({ onGenerateToken }) => {
  const [selectedType, setSelectedType] = useState<'parking' | 'charging'>('parking');
  const [urgency, setUrgency] = useState<'low' | 'medium' | 'high'>('low');
  const [userId, setUserId] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [error, setError] = useState('');

  const validateInputs = () => {
    if (!userId.trim()) {
      setError('User ID is required');
      return false;
    }
    if (!vehicleNumber.trim()) {
      setError('Vehicle number is required');
      return false;
    }
    if (!/^[A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{4}$/.test(vehicleNumber.toUpperCase())) {
      setError('Invalid vehicle number format (e.g., MH12AB1234)');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = () => {
    if (validateInputs()) {
      onGenerateToken(selectedType, urgency, userId, vehicleNumber.toUpperCase());
      setUserId('');
      setVehicleNumber('');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Generate Token</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">User ID</label>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your user ID"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Number</label>
          <input
            type="text"
            value={vehicleNumber}
            onChange={(e) => setVehicleNumber(e.target.value.toUpperCase())}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Format: MH12AB1234"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Token Type</label>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setSelectedType('parking')}
              className={`flex items-center justify-center p-4 rounded-lg ${
                selectedType === 'parking'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              <Car className="mr-2 h-5 w-5" />
              Parking
            </button>
            <button
              onClick={() => setSelectedType('charging')}
              className={`flex items-center justify-center p-4 rounded-lg ${
                selectedType === 'charging'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              <Zap className="mr-2 h-5 w-5" />
              Charging
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Urgency Level</label>
          <div className="grid grid-cols-3 gap-2">
            {(['low', 'medium', 'high'] as const).map((level) => (
              <button
                key={level}
                onClick={() => setUrgency(level)}
                className={`p-2 rounded-lg capitalize ${
                  urgency === level
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}

        <div className="pt-4">
          <button
            onClick={handleSubmit}
            className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center"
          >
            <Clock className="mr-2 h-5 w-5" />
            Generate Token
          </button>
        </div>
      </div>
    </div>
  );
};