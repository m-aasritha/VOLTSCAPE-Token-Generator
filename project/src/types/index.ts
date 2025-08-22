export interface ChargingSession {
  session_ID: number;
  garage_ID: number;
  user_ID: string;
  user_type: string;
  shared_ID: string | null;
  start_plugin: string;
  start_plugin_hour: number;
  end_plugout: string;
  end_plugout_hour: number;
  el_kWh: number;
  duration_hours: number;
  month_plugin: string;
  weekdays_plugin: string;
  plugin_category: string;
  duration_category: string;
}

export interface Token {
  id: string;
  userId: string;
  vehicleNumber: string;
  type: 'parking' | 'charging';
  status: 'active' | 'pending' | 'completed';
  startTime: Date;
  endTime: Date;
  priority: number;
  urgencyLevel: 'low' | 'medium' | 'high';
}

export interface HourlyLoad {
  date_from: string;
  daily_hour: number;
  weekday: string;
  month: string;
  synthetic_3_6kW: number;
  synthetic_7_2kW: number;
  flex_3_6kW: number;
  flex_7_2kW: number;
  n_private?: number;
  n_shared?: number;
}