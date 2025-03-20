// src/utils.ts

import axios from "axios";
import { LocationResponse, WeatherResponse, Location } from "./types";

export function getLocation(locationName: string): Promise<LocationResponse> {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${locationName}&count=1`;
    return axios.get<LocationResponse>(url).then((response) => response.data);
}

export function getWeather(latitude: number, longitude: number): Promise<WeatherResponse> {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&models=icon_global`;
    return axios.get<WeatherResponse>(url).then((response) => response.data);
}

export function getCurrentWeather(locationDetails: Location): Promise<WeatherResponse> {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${locationDetails.latitude}&longitude=${locationDetails.longitude}&current_weather=true&models=icon_global`;
    return axios.get<WeatherResponse>(url).then((response) => response.data);
}

export function displayLocation(locationDetails: Location): void {
    const locationNameElement = document.getElementById("location-name");
    const countryElement = document.getElementById("country");

    if (locationNameElement && countryElement) {
        locationNameElement.textContent = locationDetails.name;
        countryElement.textContent = locationDetails.country;
    }
}

export function displayWeatherData(obj: WeatherResponse): void {
    const temperatureElement = document.getElementById("temperature");
    const windspeedElement = document.getElementById("windspeed");
    const winddirectionElement = document.getElementById("winddirection");

    if (temperatureElement && windspeedElement && winddirectionElement) {
        temperatureElement.textContent = `${obj.current_weather.temperature} °C`;
        windspeedElement.textContent = `${obj.current_weather.windspeed} km/h`;
        winddirectionElement.textContent = `${obj.current_weather.winddirection} °`;
    }
}

export function updateBackground(weatherCode: number, isDay: number): void {
    const body = document.body;
    const firstDigit = Math.floor(weatherCode / 10);

    let className = "";

    switch (firstDigit) {
        case 0:
        case 1:
            className = isDay ? "sunny" : "sunny-night";
            break;
        case 2:
            className = isDay ? "partly-cloudy" : "partly-cloudy-night";
            break;
        case 3:
            className = "cloudy";
            break;
        case 4:
            className = "foggy";
            break;
        case 5:
            className = "drizzle";
            break;
        case 6:
            className = "rain";
            break;
        case 7:
            className = "snow";
            break;
        case 8:
            className = "showers";
            break;
        case 9:
            className = "thunderstorm";
            break;
    }

    body.className = className;
}

