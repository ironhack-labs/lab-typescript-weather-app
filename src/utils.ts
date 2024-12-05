// src/utils.ts

import axios from 'axios';
import { LocationResponse, Location, WeatherResponse } from "./types";



export function getLocation(locationName: string): Promise<LocationResponse> {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${locationName}&count=1`;
    return axios.get(url).then((response) => response.data);
}

export function getCurrentWeather(locationDetails: Location): Promise<WeatherResponse> {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${locationDetails.latitude}&longitude=${locationDetails.longitude}&current_weather=true&models=icon_global`;
        return axios.get(url).then((res) => res.data)
}

export function displayLocation(locationDetails: Location):void {
    const location = document.getElementById('location-name') as HTMLElement;
    location.innerText = "" + locationDetails.name;
    
    const country = document.getElementById('country') as HTMLElement;
    country.innerText = "(" + locationDetails.country + ")";
}


export function displayWeatherData(obj: WeatherResponse): void {
    const temperature = document.getElementById('temperature') as HTMLElement;
    temperature.innerText = obj.current_weather.temperature + " " + obj.current_weather_units.temperature;

    const windspeed = document.getElementById('windspeed') as HTMLElement;
    windspeed.innerText = obj.current_weather.windspeed + " " + obj.current_weather_units.windspeed;

    const winddirection = document.getElementById('winddirection') as HTMLElement;
    winddirection.innerText = obj.current_weather.winddirection + obj.current_weather_units.winddirection;
}

