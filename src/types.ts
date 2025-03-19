// src/types.ts

export type Location = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  elevation: number;
  feature_code: string;
  country_code: string;
  timezone: string;
  population: number;
  postcodes: string[];
  country_id: number;
  country: string;
  admin1?: string;
  admin2?: string;
  admin3?: string;
  admin4?: string;
  admin1_id?: number;
  admin2_id?: number;
  admin3_id?: number;
  admin4_id?: number;
};

export type LocationResponse = {
  results?: Location[];
  generationtime_ms: number;
};

export type CurrentWeather = {
  interval: number;
  is_day: number;
  temperature: number;
  time: string;
  weathercode: number;
  winddirection: number;
  windspeed: number;
};

export type CurrentWeatherUnits = {
  interval: string;
  is_day: string;
  temperature: string;
  time: string;
  weathercode: string;
  winddirection: string;
  windspeed: string;
};

export type WeatherResponse = {
  current_weather: CurrentWeather;
  current_weather_units: CurrentWeatherUnits;
  elevation: number;
  generationtime_ms: number;
  latitude: number;
  longitude: number;
  timezone: string;
  timezone_abbreviation: string;
  utc_offset_seconds: number;
};
