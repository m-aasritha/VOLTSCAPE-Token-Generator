import { ChargingSession } from '../types';

export class DemandPredictor {
  private historicalData: ChargingSession[];
  private timeSlots: number[] = Array.from({ length: 24 }, (_, i) => i);
  private weekdays: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  constructor(historicalData: ChargingSession[]) {
    this.historicalData = historicalData;
  }

  private calculatePeakHours(): { hour: number; count: number }[] {
    const hourCounts = new Map<number, number>();
    
    this.historicalData.forEach(session => {
      const hour = session.start_plugin_hour;
      hourCounts.set(hour, (hourCounts.get(hour) || 0) + 1);
    });

    return Array.from(hourCounts.entries())
      .map(([hour, count]) => ({ hour, count }))
      .sort((a, b) => b.count - a.count);
  }

  private calculateAverageLoadByHour(hour: number): number {
    const sessions = this.historicalData.filter(
      session => session.start_plugin_hour === hour
    );
    
    if (sessions.length === 0) return 0;
    
    return sessions.reduce((sum, session) => sum + session.el_kWh, 0) / sessions.length;
  }

  predictDemand(hour: number, weekday: string): number {
    const relevantSessions = this.historicalData.filter(
      session => 
        session.weekdays_plugin === weekday && 
        session.start_plugin_hour === hour
    );

    if (relevantSessions.length === 0) {
      return this.calculateAverageLoadByHour(hour);
    }

    const averageLoad = relevantSessions.reduce(
      (sum, session) => sum + session.el_kWh, 
      0
    ) / relevantSessions.length;

    // Apply time-based weight factor
    const peakHours = this.calculatePeakHours();
    const isPeakHour = peakHours.some(
      peak => peak.hour === hour && peak.count > 2
    );
    
    return isPeakHour ? averageLoad * 1.2 : averageLoad;
  }

  getOptimalChargingSlot(urgencyLevel: 'low' | 'medium' | 'high'): { hour: number; weekday: string } {
    if (urgencyLevel === 'high') {
      const currentHour = new Date().getHours();
      const currentWeekday = this.weekdays[new Date().getDay() - 1] || this.weekdays[0];
      return { hour: currentHour, weekday: currentWeekday };
    }

    const currentHour = new Date().getHours();
    const currentWeekday = this.weekdays[new Date().getDay() - 1] || this.weekdays[0];
    
    let lowestDemand = Infinity;
    let optimalSlot = { hour: currentHour, weekday: currentWeekday };

    // Look for slots in the next 24 hours
    for (let i = 0; i < 24; i++) {
      const hour = (currentHour + i) % 24;
      const predictedDemand = this.predictDemand(hour, currentWeekday);
      
      if (predictedDemand < lowestDemand) {
        lowestDemand = predictedDemand;
        optimalSlot = { hour, weekday: currentWeekday };
      }
    }

    return optimalSlot;
  }
}