// src/utils.ts

import axios from "axios";
import { LocationResponse, Location, WeatherResponse } from "./types";

export function getLocation(locationName: string): Promise<LocationResponse> {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${locationName}&count=1`;
  return axios.get(url).then((response) => response.data);
}

export function getCurrentWeather(
  locationDetails: Location,
): Promise<WeatherResponse> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${locationDetails.latitude}&longitude=${locationDetails.longitude}&current_weather=true&models=icon_global`;

  return axios.get(url).then((response) => response.data);
}

export function displayLocation(locationDetails: Location) {
  const locationNameElm = document.getElementById(
    "location-name",
  ) as HTMLElement;
  locationNameElm.innerText = locationDetails.name;

  const countryElm = document.getElementById("country") as HTMLElement;
  countryElm.innerText = locationDetails.country;
}

export function displayWeatherData(obj: WeatherResponse): void {
  const tempElm = document.getElementById("temperature") as HTMLElement;
  tempElm.innerText = obj.current_weather.temperature + " °C";

  const windspeedElm = document.getElementById("windspeed") as HTMLElement;
  windspeedElm.innerText = obj.current_weather.windspeed + " km/h";

  const winddirectionElm = document.getElementById(
    "winddirection",
  ) as HTMLElement;
  winddirectionElm.innerText = obj.current_weather.winddirection + " °";
}
