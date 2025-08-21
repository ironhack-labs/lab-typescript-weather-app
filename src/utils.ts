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

export function displayLocation(locationDetails: Location): void {
  const nameElement = document.getElementById("location-name") as HTMLElement;
  const countryElement = document.getElementById("country") as HTMLElement;

  nameElement.textContent = locationDetails.name;
  countryElement.textContent = locationDetails.country;
}

export function displayWeatherData(obj: WeatherResponse): void {
  const temperatureElement = document.getElementById(
    "temperature"
  ) as HTMLElement;
  const windSpeedElement = document.getElementById("windspeed") as HTMLElement;
  const windDirectionElement = document.getElementById(
    "winddirection"
  ) as HTMLElement;

  const { temperature, windspeed, winddirection } = obj.current_weather;

  const temperatureUnits = obj.current_weather_units.temperature;
  const windSpeedUnits = obj.current_weather_units.windspeed;
  const windDirectionUnits = obj.current_weather_units.winddirection;

  temperatureElement.innerText = `Temperature: ${temperature} ${temperatureUnits}`;

  if (temperatureElement) {
    temperatureElement.textContent = `Temperature: ${temperature} ${temperatureUnits}`;
  }

  if (windSpeedElement) {
    windSpeedElement.textContent = `Wind speed: ${windspeed} ${windSpeedUnits}`;
  }

  if (windDirectionElement) {
    windDirectionElement.textContent = `Wind direction: ${winddirection} ${windDirectionUnits}`;
  }
}

export function updateBackground(weatherCode: number, isDay: number): void {
  const firstChar = weatherCode.toString().charAt(0);

  let className = "";

  if (firstChar === "0" || firstChar === "1") {
    className = isDay === 0 ? "sunny-night" : "sunny";
  } else if (firstChar === "2") {
    className = isDay === 0 ? "partly-cloudy-night" : "partly-cloudy";
  } else if (firstChar === "3") {
    className = "cloudy";
  } else if (firstChar === "4") {
    className = "foggy";
  } else if (firstChar === "5") {
    className = "drizzle";
  } else if (firstChar === "6") {
    className = "rain";
  } else if (firstChar === "7") {
    className = "snow";
  } else if (firstChar === "8") {
    className = "showers";
  } else if (firstChar === "9") {
    className = "thunderstorm";
  } else {
    className = "";
  }

  document.body.className = className;
}