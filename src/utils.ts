// src/utils.ts
import axios from 'axios';
import { LocationResponse, Location, WeatherResponse } from "./types";

export async function getLocation(locationName: string): Promise<LocationResponse> {

    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${locationName}&count=1`;
    return await axios.get(url).then((response) => response.data);
}

export async function getCurrentWeather(locationDetails: Location): Promise<WeatherResponse> {

    return await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${locationDetails.latitude}&longitude=${locationDetails.longitude}&current_weather=true&models=icon_global`)
        .then((res) => res.data)
}

export function displayLocation(locationDetails: Location): void {
    const locationName = document.querySelector('#location-name') as HTMLElement
    locationName.innerText = locationDetails.name

    const country = document.querySelector('#country') as HTMLElement
    country.innerText = locationDetails.country
}

export function displayWeatherData(obj: WeatherResponse): void {
    const temp = document.querySelector('#temperature') as HTMLElement
    temp.innerText = `${obj.current_weather.temperature} ${obj.current_weather_units.temperature}`

    const windspeed = document.querySelector('#windspeed') as HTMLElement
    windspeed.innerText = `${obj.current_weather.windspeed} ${obj.current_weather_units.windspeed}`

    const winddirection = document.querySelector('#winddirection') as HTMLElement
    winddirection.innerText = `${obj.current_weather.winddirection} ${obj.current_weather_units.winddirection}`
}