// src/utils.ts

import axios from "axios";
import { LocationResponse, Location } from "./types";
import { WeatherResponse } from "./main";

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
    const locationName = document.getElementById("location-name") as HTMLElement;
    const country = document.getElementById("country") as HTMLElement;

    locationName.innerText = `${locationDetails.name}`
    country.innerText = `${locationDetails.country}`
}

export function displayWeatherData(obj: WeatherResponse): void {
    const temperature = document.getElementById("temperature") as HTMLElement;
    const windspeed = document.getElementById("windspeed") as HTMLElement;
    const winddirection = document.getElementById("winddirection") as HTMLElement;

    temperature.innerText = `Temperature: ${obj.current_weather.temperature} ${obj.current_weather_units.temperature}`
    windspeed.innerText = `Wind speed: ${obj.current_weather.windspeed} ${obj.current_weather_units.windspeed}`
    winddirection.innerText = `Wind direction: ${obj.current_weather.winddirection} ${obj.current_weather_units.winddirection}`
}

export function updateBackground(weatherCode: number, isDay: number): void {
    if ((weatherCode === 0 || weatherCode === 1) && isDay === 0) {
        document.body.className = "sunny-night";
        return;
    } 
    if ((weatherCode === 0 || weatherCode === 1) && isDay === 1) {
        document.body.className = "sunny";
        return;
    } 
    if (weatherCode === 2 && isDay === 0) {
        document.body.className = "partly-cloudy-night";
        return;
    } 
    if (weatherCode === 2 && isDay === 1) {
        document.body.className = "partly-cloudy";
        return;
    } 
    if (weatherCode === 3) {
        document.body.className = "cloudy";
        return;
    } 
    if (weatherCode === 4) {
        document.body.className = "foggy";
        return;
    } 
    if (weatherCode === 5) {
        document.body.className = "drizzle";
        return;
    } 
    if (weatherCode === 6) {
        document.body.className = "rain";
        return;
    } 
    if (weatherCode === 7) {
        document.body.className = "snow";
        return;
    } 
    if (weatherCode === 8) {
        document.body.className = "showers";
        return;
    } 
    if (weatherCode === 9) {
        document.body.className = "thunderstorm";
        return;
    } 
}
