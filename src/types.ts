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
}

export type LocationResponse = {
    results?: Location[];
    generationtime_ms: number;
}

export type WeatherApiResponse = {
    latitude: number;
    longitude: number;
    generationtime_ms: number;
    utc_offset_seconds: number;
    timezone: string;
    timezone_abbreviation: string;
    elevation: number;
    current_weather_units: {
        time: string;               // e.g., "iso8601"
        interval: string;           // e.g., "seconds"
        temperature: string;        // e.g., "°C"
        windspeed: string;          // e.g., "km/h"
        winddirection: string;      // e.g., "°"
        is_day: string;             // empty string here, could be "1"/"0" as string in other APIs
        weathercode: string;        // e.g., "wmo code"
    };
    current_weather: {
        time: string;               // e.g., "2025-06-05T09:00"
        interval: number;           // e.g., 900
        temperature: number;        // e.g., 19.5
        windspeed: number;          // e.g., 7.7
        winddirection: number;      // e.g., 242
        is_day: number;             // 1 = day, 0 = night
        weathercode: number;        // integer representing weather condition
    };
};