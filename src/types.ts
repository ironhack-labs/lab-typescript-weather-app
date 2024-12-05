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

export type WeatherCurrent = {
  time: string
  temperature: number
  windspeed: number
  winddirection: number
  is_day: boolean
  weathercode: number
}

export type CurrentWeatherUnits = {
  time: string
  temperature: string
  windspeed: string
  winddirection: string
  is_day: string
  weathercode: string
}

export type WeatherResponse = {
  latitude: number
  longitude: number
  generationTimeMs: number
  utcOffsetSeconds: number
  timezone: string
  timezoneAbbreviation: string
  elevation: number
  currentWeatherUnits: CurrentWeatherUnits
  currentWeather: WeatherCurrent
}
