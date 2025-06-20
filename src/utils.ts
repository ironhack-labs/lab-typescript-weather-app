// src/utils.ts

import axios from "axios";
import { LocationResponse, Location, WeatherResponse } from "./types";

export function getLocation(locationName: string): Promise<LocationResponse> {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${locationName}&count=1`;
  return axios.get(url).then((response) => response.data);
}

export async function getCurrentWeather(
  locationDetails: Location
): Promise<WeatherResponse> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${locationDetails.latitude}&longitude=${locationDetails.longitude}&current_weather=true&models=icon_global`;
  const response = await axios.get(url);
  return response.data;
}

export function displayLocation(locationDetails: Location): void {
  //Void= no return expected
  const locationName = document.getElementById("location-name") as HTMLElement;
  locationName.innerText = `${locationDetails.name}`;

  const country = document.getElementById("country") as HTMLElement;
  country.innerText = `(${locationDetails.country})`;
}

export function displayWeatherData(obj: WeatherResponse): void {
  const temperatureElement = document.getElementById(
    "temperature"
  ) as HTMLElement;
  temperatureElement.innerText = `Temperature: ${obj.current_weather.temperature} ${obj.current_weather_units.temperature}`;

  const windSpeedElement = document.getElementById("windspeed") as HTMLElement;
  windSpeedElement.innerText = `Wind speed: ${obj.current_weather.windspeed} ${obj.current_weather_units.windspeed}`;

  const winddirectionElement = document.getElementById(
    "winddirection"
  ) as HTMLElement;
  winddirectionElement.innerText = `Wind direction: ${obj.current_weather.winddirection} ${obj.current_weather_units.winddirection}`;
}
