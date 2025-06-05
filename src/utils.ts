// src/utils.ts

import axios from 'axios';
import { LocationResponse, Location, WeatherResponse } from "./types";



export function getLocation(locationName: string): Promise<LocationResponse> {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${locationName}&count=1`;
    return axios.get(url).then((response) => response.data);
}

export function getCurrentWeather(locationDetails: Location): Promise<WeatherResponse> {
  const { latitude, longitude } = locationDetails;

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&models=icon_global`;

  return axios.get<WeatherResponse>(url).then(response => response.data);
}

export function displayLocation(locationDetails: Location): void {
  const locationNameElement = document.getElementById("location-name");
  const countryElement = document.getElementById("country");

  if (locationNameElement) {
    locationNameElement.textContent = locationDetails.name;
  }

  if (countryElement) {
    countryElement.textContent = locationDetails.country;
  }
}

export function displayWeatherData(obj: WeatherResponse): void {
  const temperatureElement = document.getElementById("temperature");
  const windspeedElement = document.getElementById("windspeed");
  const winddirectionElement = document.getElementById("winddirection");

  if (temperatureElement) {
    temperatureElement.textContent = `${obj.current_weather.temperature} °C`;
  }

  if (windspeedElement) {
    windspeedElement.textContent = `${obj.current_weather.windspeed} km/h`;
  }

  if (winddirectionElement) {
    winddirectionElement.textContent = `${obj.current_weather.winddirection} °`;
  }
}


export function updateBackground(weatherCode: number, isDay: number): void {
  const body = document.body;

  const firstChar = weatherCode.toString()[0];

  let className = "";

  switch (firstChar) {
    case "0":
      className = isDay === 0 ? "sunny-night" : "sunny";
      break;
    case "1":
      className = isDay === 0 ? "sunny-night" : "sunny";
      break;
    case "2":
      className = isDay === 0 ? "partly-cloudy-night" : "partly-cloudy";
      break;
    case "3":
      className = "cloudy";
      break;
    case "4":
      className = "foggy";
      break;
    case "5":
      className = "drizzle";
      break;
    case "6":
      className = "rain";
      break;
    case "7":
      className = "snow";
      break;
    case "8":
      className = "showers";
      break;
    case "9":
      className = "thunderstorm";
      break;
    default:
      className = ""; 
  }

  const possibleClasses = [
    "sunny", "sunny-night", "partly-cloudy", "partly-cloudy-night",
    "cloudy", "foggy", "drizzle", "rain", "snow", "showers", "thunderstorm"
  ];

  possibleClasses.forEach(c => body.classList.remove(c));

  if (className) {
    body.classList.add(className);
  }
}



