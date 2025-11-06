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
  return axios
    .get(
      `https://api.open-meteo.com/v1/forecast?latitude=${locationDetails.latitude}&longitude=${locationDetails.longitude}&current_weather=true&models=icon_global`
    )
    .then((response) => response.data);
}

export function displayLocation(locationDetails: Location): void {
  const locationNameElement = document.getElementById("location-name");
  const countryElement = document.getElementById("country");

  if (locationNameElement)
    locationNameElement.textContent = locationDetails.name;
  if (countryElement) countryElement.textContent = locationDetails.country;
}

export function displayWeather(weatherData: WeatherResponse): void {
  const temperatureElement = document.getElementById("temperature");
  const windspeedElement = document.getElementById("windspeed");

  if (temperatureElement)
    temperatureElement.textContent = `${weatherData.current_weather.temperature}°C`;
  if (windspeedElement)
    windspeedElement.textContent = `${weatherData.current_weather.windspeed} km/h`;
}
