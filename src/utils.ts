// import { Location, WeatherResponse } from "./types.ts";


// // src/utils.ts

// import axios from 'axios';
// import { LocationResponse, Location } from "./types";



// export function getLocation(locationName: string): Promise<LocationResponse> {
//     const url = `https://geocoding-api.open-meteo.com/v1/search?name=${locationName}&count=1`;
//     return axios.get(url).then((response) => response.data);
// }

// export function getCurrentWeather(
//   locationDetails: Location
// ): Promise<WeatherResponse> {
//   // logic next step mein
//   return Promise.resolve({} as WeatherResponse);
// }
// export function getCurrentWeather(
//   locationDetails: Location
// ): Promise<WeatherResponse> {
//   return axios
//     .get(
//       `https://api.open-meteo.com/v1/forecast?latitude=${locationDetails.latitude}&longitude=${locationDetails.longitude}&current_weather=true&models=icon_global`
//     )
//     .then((response) => response.data);
// }



import axios from "axios";
import { LocationResponse, Location, WeatherResponse } from "./types";

export async function getLocation(
  locationName: string
): Promise<LocationResponse> {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${locationName}&count=1`;

  const response = await axios.get<LocationResponse>(url);
  return response.data;
}

export async function getCurrentWeather(
  locationDetails: Location
): Promise<WeatherResponse> {
  const response = await axios.get<WeatherResponse>(
    `https://api.open-meteo.com/v1/forecast?latitude=${locationDetails.latitude}&longitude=${locationDetails.longitude}&current_weather=true&models=icon_global`
  );

  return response.data;
}

export function displayLocation(locationDetails: Location): void {
  const nameElement = document.getElementById("location-name") as HTMLElement;
  const countryElement = document.getElementById("country") as HTMLElement;

  nameElement.textContent = locationDetails.name;
  countryElement.textContent = locationDetails.country;
}

export function displayWeatherData(obj: WeatherResponse): void {
  const tempElement = document.getElementById("temperature");
  const windspeedElement = document.getElementById("windspeed");
  const winddirectionElement = document.getElementById("winddirection");

  if (!tempElement || !windspeedElement || !winddirectionElement) return;

  tempElement.textContent =
    `${obj.current_weather.temperature} ${obj.current_weather_units.temperature}`;

  windspeedElement.textContent =
    `${obj.current_weather.windspeed} ${obj.current_weather_units.windspeed}`;

  winddirectionElement.textContent =
    `${obj.current_weather.winddirection} ${obj.current_weather_units.winddirection}`;
}

