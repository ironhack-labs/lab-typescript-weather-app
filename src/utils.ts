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
  return axios.get(url).then((res) => res.data);
}

export function displayLocation(locationDetails: Location): void {
  const locationName = document.getElementById("location-name") as HTMLElement;
  locationName.innerHTML = locationDetails.name; // check ""
  const country = document.getElementById("country") as HTMLElement;
  country.innerHTML = `( ${locationDetails.country} )`;
}

export function displayWeatherData(obj: WeatherResponse): void {
  const displayTemp = document.getElementById("temperature") as HTMLElement;
  displayTemp.innerHTML = `Temperature: ${obj.current_weather.temperature} ${obj.current_weather_units.temperature}`;
  const displayWindspeed = document.getElementById("windspeed") as HTMLElement;
  displayWindspeed.innerHTML = `Wind Speed: ${obj.current_weather.windspeed} ${obj.current_weather_units.windspeed}`;
  const displayWindspeedDirection = document.getElementById(
    "winddirection"
  ) as HTMLElement;
  displayWindspeedDirection.innerHTML = `ind Direction: ${obj.current_weather.winddirection} ${obj.current_weather_units.winddirection}`;
}

export function updateBackground(weathercode: number, isDay: number): void {
  const bodyBackground = document.body;
  if (weathercode == 0 && isDay == 0) {
    bodyBackground.className = "sunny-night";
  }
  if (weathercode == 1 && isDay == 1) {
    bodyBackground.className = "sunny";
  }
  if (weathercode == 2 && isDay == 0) {
    bodyBackground.className = "partly-cloudy-night";
  }
  if (weathercode == 2 && isDay == 1) {
    bodyBackground.className = "partly-cloudy";
  }
  if (weathercode == 3) {
    bodyBackground.className = "cloudy";
  }
  if (weathercode == 4) {
    bodyBackground.className = "foggy";
  }
  if (weathercode == 5) {
    bodyBackground.className = "drizzle";
  }
  if (weathercode == 6) {
    bodyBackground.className = "rain";
  }
  if (weathercode == 7) {
    bodyBackground.className = "snow";
  }
  if (weathercode == 8) {
    bodyBackground.className = "showers";
  }
  if (weathercode == 9) {
    bodyBackground.className = "thunderstorm";
  }
}
