import { ChargingSession, HourlyLoad } from '../types';

export const chargingSessionsData: ChargingSession[] = [
  {
    session_ID: 0,
    garage_ID: 1,
    user_ID: "AdO3",
    user_type: "AdO3-4",
    shared_ID: null,
    start_plugin: "21.12.2018 10:20",
    start_plugin_hour: 10,
    end_plugout: "21.12.2018 10:23",
    end_plugout_hour: 10,
    el_kWh: 0.3,
    duration_hours: 0.05,
    month_plugin: "Dec",
    weekdays_plugin: "Friday",
    plugin_category: "late morning (9-12)",
    duration_category: "Less than 3 hours"
  },
  {
    session_ID: 1,
    garage_ID: 2,
    user_ID: "AdO3",
    user_type: "AdO3-4",
    shared_ID: null,
    start_plugin: "21.12.2018 10:24",
    start_plugin_hour: 10,
    end_plugout: "21.12.2018 10:32",
    end_plugout_hour: 10,
    el_kWh: 0.87,
    duration_hours: 0.136666667,
    month_plugin: "Dec",
    weekdays_plugin: "Friday",
    plugin_category: "late morning (9-12)",
    duration_category: "Less than 3 hours"
  },
  {
    session_ID: 2,
    garage_ID: 3,
    user_ID: "AdO3",
    user_type: "AdO3-4",
    shared_ID: null,
    start_plugin: "21.12.2018 11:33",
    start_plugin_hour: 11,
    end_plugout: "21.12.2018 19:46",
    end_plugout_hour: 19,
    el_kWh: 29.87,
    duration_hours: 8.216388889,
    month_plugin: "Dec",
    weekdays_plugin: "Friday",
    plugin_category: "late morning (9-12)",
    duration_category: "Between 6 and 9 hours"
  }
];

export const hourlyLoadsData: HourlyLoad[] = [
  {
    date_from: "21.12.2018 10:00",
    daily_hour: 10,
    weekday: "Friday",
    month: "Dec",
    synthetic_3_6kW: 0.3,
    synthetic_7_2kW: 0.3,
    flex_3_6kW: 0,
    flex_7_2kW: 0.06,
    n_private: 1
  },
  {
    date_from: "21.12.2018 11:00",
    daily_hour: 11,
    weekday: "Friday",
    month: "Dec",
    synthetic_3_6kW: 1.62,
    synthetic_7_2kW: 3.24,
    flex_3_6kW: 0,
    flex_7_2kW: 0,
    n_private: 1
  },
  {
    date_from: "21.12.2018 12:00",
    daily_hour: 12,
    weekday: "Friday",
    month: "Dec",
    synthetic_3_6kW: 3.6,
    synthetic_7_2kW: 7.2,
    flex_3_6kW: 0,
    flex_7_2kW: 0,
    n_private: 1
  }
];