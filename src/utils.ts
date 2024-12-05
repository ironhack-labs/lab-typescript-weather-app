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
  // Display the location location name
  const locationName = document.getElementById(
    "location-name"
  ) as HTMLHeadingElement;
  locationName.innerText = " " + locationDetails.name;

  // Display the location country
  const country = document.getElementById("country") as HTMLHeadingElement;
  country.innerText = " " + locationDetails.country;
}

export function displayWeatherData(weatherDetails: WeatherResponse) {
  // Display the current temperature
  const temperature = document.getElementById(
    "temperature"
  ) as HTMLHeadingElement;
  temperature.innerText =
    " " + weatherDetails.current_weather.temperature + "°C";

  // Display the current wind speed
  const windSpeed = document.getElementById("wind-speed") as HTMLHeadingElement;
  windSpeed.innerText = " " + weatherDetails.current_weather.windspeed + "m/s";

  // Display the current wind direction
  const windDirection = document.getElementById(
    "wind-direction"
  ) as HTMLHeadingElement;
  windDirection.innerText =
    " " + weatherDetails.current_weather.winddirection + "°";
}
