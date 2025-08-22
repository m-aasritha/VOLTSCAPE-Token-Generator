import { useState, useEffect } from 'react';
import { DemandPredictor } from '../ml/DemandPredictor';
import { ChargingSession } from '../types';

export const useDemandPrediction = (historicalData: ChargingSession[]) => {
  const [predictor] = useState(() => new DemandPredictor(historicalData));
  const [predictions, setPredictions] = useState<{ hour: number; demand: number }[]>([]);

  useEffect(() => {
    const currentWeekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][
      new Date().getDay()
    ];

    const hourlyPredictions = Array.from({ length: 24 }, (_, hour) => ({
      hour,
      demand: predictor.predictDemand(hour, currentWeekday),
    }));

    setPredictions(hourlyPredictions);
  }, [predictor]);

  const getOptimalSlot = (urgencyLevel: 'low' | 'medium' | 'high') => {
    return predictor.getOptimalChargingSlot(urgencyLevel);
  };

  return { predictions, getOptimalSlot };
};