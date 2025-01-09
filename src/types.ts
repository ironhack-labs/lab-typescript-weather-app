// src/types.ts

export type Location = {
	id: number
	name: string
	latitude: number
	longitude: number
	elevation: number
	feature_code: string
	country_code: string
	timezone: string
	population: number
	postcodes: string[]
	country_id: number
	country: string
	admin1?: string
	admin2?: string
	admin3?: string
	admin4?: string
	admin1_id?: number
	admin2_id?: number
	admin3_id?: number
	admin4_id?: number
}

export type LocationResponse = {
	results?: Location[]
	generationtime_ms: number
}

export type WeatherResponse = {
	latitude: number
	longitude: number
	generationtime_ms: number
	utc_offset_seconds: number
	timezone: string
	timezone_abbreviation: string
	elevation: number
	current_weather_units: {
		time: string // "iso8601"
		interval: string // "seconds"
		temperature: string // "°C"
		windspeed: string // "km/h"
		winddirection: string // "°"
		is_day: string // Could be empty or string
		weathercode: string // "wmo code"
	}
	current_weather: {
		time: string // e.g., "2025-01-08T15:00"
		interval: number // e.g., 900
		temperature: number // e.g., 3.2
		windspeed: number // e.g., 12.2
		winddirection: number // e.g., 223
		is_day: number // e.g., 1
		weathercode: number // e.g., 1
	}
}
