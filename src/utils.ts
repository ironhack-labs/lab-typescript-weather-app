// src/utils.ts

import axios from 'axios';
import { LocationResponse, Location, WeatherResponse } from "./types";



export function getLocation(locationName: string): Promise<LocationResponse> {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(locationName)}&count=1`;
    return axios.get(url).then((response) => response.data);
}

export function getCurrentWeather(locationDetails: Location): Promise<WeatherResponse> {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${locationDetails.latitude}&longitude=${locationDetails.longitude}&current_weather=true&models=icon_global`;
    return axios.get(url).then((response) => response.data);
}

export function displayLocation(locationDetails: Location): void {
    const locationNameElm = document.getElementById('location-name') as HTMLElement;
    locationNameElm.innerText = locationDetails.name;

    const countryElm = document.getElementById('country') as HTMLElement;
    countryElm.innerText = `(${locationDetails.country})`;
}

export function displayWeatherData(obj: WeatherResponse): void {
    const { current_weather: weather, current_weather_units: units } = obj;

    const temperatureElm = document.getElementById('temperature') as HTMLElement;
    temperatureElm.innerText = `Temperature: ${weather.temperature} ${units.temperature}`;

    const windspeedElm = document.getElementById('windspeed') as HTMLElement;
    windspeedElm.innerText = `Wind Speed: ${weather.windspeed} ${units.windspeed}`;

    const winddirectionElm = document.getElementById('winddirection') as HTMLElement;
    winddirectionElm.innerText = `Wind Direction: ${weather.winddirection} ${units.winddirection}`;
}

export function updateBackground(weatherCode: number, isDay: number): void {
    const firstCharacter = weatherCode.toString().charAt(0);
    const isNight = isDay === 0;

    switch (firstCharacter) {
        case "0":
        case "1":
            document.body.className = isNight ? "sunny-night" : "sunny";
            break;
        case "2":
            document.body.className = isNight ? "partly-cloudy-night" : "partly-cloudy";
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
            document.body.className = "";
            break;
    }
}
