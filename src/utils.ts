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
    .then(({ data }) => data)
    .catch((err) => console.log(err));
}

export function displayLocation(locationDetails: Location): void {
  const locationNameElement = document.getElementById(
    "location-name"
  ) as HTMLElement;
  const countryNameElement = document.getElementById("country") as HTMLElement;
  if (locationNameElement && countryNameElement) {
    locationNameElement.innerText = locationDetails.name;
    countryNameElement.innerText = `(${locationDetails.country})`;
  }
}
export function displayWeatherData(obj: WeatherResponse) {
  const tempElement = document.getElementById("temperature") as HTMLElement;
  tempElement.innerText = `Temperature: ${obj.current_weather.temperature} ${obj.current_weather_units.temperature}`;
  const windSpeedElement = document.getElementById("windspeed") as HTMLElement;
  windSpeedElement.innerText = `Wind Speed: ${obj.current_weather.windspeed} ${obj.current_weather_units.windspeed}`;
  const windDirectionElement = document.getElementById(
    "winddirection"
  ) as HTMLElement;
  windDirectionElement.innerText = `Wind Direction: ${obj.current_weather.winddirection}${obj.current_weather_units.winddirection}`;
}
export function updateBackground(code: number, isDay: number): void {
  let ourClassName: string = "";
  if (code >= 3 || code <= 9) {
    isDay = 0;
  }
  const check = `${code.toString()[0]}${isDay}`;
  switch (check) {
    case "00":
    case "10":
      ourClassName = "sunny-night";
      break;

    case "01":
    case "11":
      ourClassName = "sunny";
      break;

    case "20":
      ourClassName = "partly-cloudy-night";
      break;

    case "21":
      ourClassName = "partly-cloudy";
      break;

    case "30":
      ourClassName = "cloudy";
      break;

    case "40":
      ourClassName = "foggy";
      break;

    case "50":
      ourClassName = "drizzle";
      break;

    case "60":
      ourClassName = "rain";
      break;

    case "70":
      ourClassName = "snow";
      break;

    case "80":
      ourClassName = "showers";
      break;

    case "90":
      ourClassName = "thunderstorm";
      break;
  }
  document.body.className = ourClassName;
}
