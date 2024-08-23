// src/utils.ts

import axios from "axios";
import { LocationResponse, Location, WeatherResponse } from "./types";

export function getLocation(locationName: string): Promise<LocationResponse> {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${locationName}&count=1`;
  return axios.get(url).then((response) => response.data);
}

export const getCurrentWeather = (
  locationDetails: Location
): Promise<WeatherResponse> => {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${locationDetails.latitude}&longitude=${locationDetails.longitude}&current_weather=true&models=icon_global`;
  return axios.get(url).then((res) => {
    return res.data;
  });
};

export const displayLocation = (locationDetails: Location) => {
  const locationEl = document.getElementById("location-name") as HTMLElement;
  const countryEl = document.getElementById("country") as HTMLElement;
  locationEl.innerText = locationDetails.name;
  countryEl.innerText = locationDetails.country;
};

export const displayWeatherData = (obj: WeatherResponse) => {
  const temperaturEl = document.getElementById("temperature") as HTMLElement;
  const windspeedEl = document.getElementById("windspeed") as HTMLElement;
  const winddirectionEl = document.getElementById(
    "winddirection"
  ) as HTMLElement;
  temperaturEl.innerText =
    obj.current_weather.temperature + obj.current_weather_units.temperature;
  windspeedEl.innerText =
    obj.current_weather.windspeed + obj.current_weather_units.windspeed;
  winddirectionEl.innerText =
    obj.current_weather.winddirection + obj.current_weather_units.winddirection;
};
