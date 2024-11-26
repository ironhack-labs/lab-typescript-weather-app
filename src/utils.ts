// src/utils.ts

import axios from "axios";
import { LocationResponse, Location, WeatherResponse } from "./types.ts";

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
  const locationNameElm = document.getElementById(
    "location-name"
  ) as HTMLElement;
  locationNameElm.innerText = "" + locationDetails.name;

  // display country
  const countryElm = document.getElementById("country") as HTMLElement;
  countryElm.innerText = "(" + locationDetails.country + ")";
}

export function displayWeatherData(obj: WeatherResponse): void {
  const temperatureElm = document.getElementById("temperature") as HTMLElement;
  temperatureElm.innerText =
    "Temperature: " +
    obj.current_weather.temperature +
    " " +
    obj.current_weather_units.temperature;
  const windSpeedElm = document.getElementById("windspeed") as HTMLElement;
  windSpeedElm.innerText = "Wind Speed: " + obj.current_weather.windspeed + " ";
  obj.current_weather_units.windspeed;
  const windDirectionElm = document.getElementById(
    "winddirection"
  ) as HTMLElement;
  windDirectionElm.innerText =
    "Wind Direction: " +
    obj.current_weather.winddirection +
    " " +
    obj.current_weather_units.winddirection;
}
