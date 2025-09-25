// src/utils.ts

import axios from "axios";
import { LocationResponse, Location, WeatherResponse } from "./types";

export function getLocation(locationName: string): Promise<LocationResponse> {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${locationName}&count=1`;
  return axios.get(url).then((response) => response.data);
}

export function getCurrentWeather(
  locationDetails: Location
): Promise<WeatherResponse> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${locationDetails.latitude}&longitude=${locationDetails.longitude}&current_weather=true&models=icon_global`;
  return axios.get(url).then((response) => response.data);
}

export function displayLocation(locationDetails: Location) {
  (document.querySelector("#location-name") as HTMLElement).innerText =
    locationDetails.name;
  (document.querySelector("#country") as HTMLElement).innerText =
    locationDetails.country;
}

export function displayWeatherData(weatherInfo: WeatherResponse): void {
  (document.querySelector("#temperature") as HTMLElement).innerText =
    "Temperature :" +
    weatherInfo.current_weather.temperature.toString() +
    " " +
    weatherInfo.current_weather_units.temperature;
  (document.querySelector("#windspeed") as HTMLElement).innerText =
    "Windspeed :" +
    weatherInfo.current_weather.windspeed.toString() +
    " " +
    weatherInfo.current_weather_units.windspeed;
  (document.querySelector("#winddirection") as HTMLElement).innerText =
    "Winddirection:" +
    weatherInfo.current_weather.winddirection.toString() +
    " " +
    weatherInfo.current_weather_units.winddirection;
}

export function updateBackground(weatherCode: number, isDay: number): void {
  const body = document.body; // Simpler way to get body element

  // Clear any existing weather classes
  body.classList.remove("sunny", "cloudy", "rainy", "snowy", "night", "day");

  // Add day/night class
  body.classList.add(isDay ? "day" : "night");

  // Add weather condition class based on weather code
  let weatherClass = "default";

  if (weatherCode === 0) {
    weatherClass = "sunny";
  } else if (weatherCode >= 1 && weatherCode <= 3) {
    weatherClass = "cloudy";
  } else if (weatherCode >= 51 && weatherCode <= 67) {
    weatherClass = "rainy";
  } else if (weatherCode >= 71 && weatherCode <= 77) {
    weatherClass = "snowy";
  }

  body.classList.add(weatherClass);
}
