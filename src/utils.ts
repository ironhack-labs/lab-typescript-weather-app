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
  const cityElm = document.getElementById("location-name") as HTMLElement;
  cityElm.innerText = locationDetails.name;

  const countryElm = document.getElementById("country") as HTMLElement;
  countryElm.innerText = locationDetails.country;
}

export function displayWeatherData(obj: WeatherResponse) {
  const temperatureElm = document.getElementById("temperature") as HTMLElement;
  const temperature =
    obj.current_weather.temperature + obj.current_weather_units.temperature;
  temperatureElm.innerText = `Temperature : ${temperature}`;

  const windSpeedElm = document.getElementById("windspeed") as HTMLElement;
  const windspeed =
    obj.current_weather.windspeed + obj.current_weather_units.windspeed;
  windSpeedElm.innerText = `Windspeed: ${windspeed}`;

  const windElm = document.getElementById("winddirection") as HTMLElement;
  const winddirection =
    obj.current_weather.winddirection + obj.current_weather_units.winddirection;
  windElm.innerText = `Winddirection: ${winddirection}`;
}

export function updateBackground(weathercode: number, isDay: number) {
  const firstChar = weathercode.toString().charAt(0);

  switch (firstChar) {
    case "0":
    case "1":
      switch (isDay) {
        case 0:
          document.body.className = "sunny-night";
          break;
        case 1:
          document.body.className = "sunny";
          break;
      }
      break;
    case "2":
      switch (isDay) {
        case 0:
          document.body.className = "partly-cloudy-night";
          break;
        case 1:
          document.body.className = "partly-cloudy";
          break;
      }
      break;
    case "3":
      document.body.className = "cloudy";
      break;
    case "4":
      document.body.className = "foggy";
      break;
    case "5":
      document.body.className = "drizzle";
      break;
    case "6":
      document.body.className = "rain";
      break;
    case "7":
      document.body.className = "snow";
      break;
    case "8":
      document.body.className = "showers";
      break;
    case "9":
      document.body.className = "thunderstorm";
      break;
    default:
      document.body.className = " ";
      break;
  }
}
