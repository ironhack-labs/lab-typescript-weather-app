// src/utils.ts

import axios from 'axios';
import { LocationResponse, Location, WeatherResponse } from "./types";



export function getLocation(locationName: string): Promise<LocationResponse> {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${locationName}&count=1`;
    return axios.get(url).then((response) => response.data);
}

export function getCurrentWeather(locationDetails: Location): Promise<WeatherResponse> {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${locationDetails.latitude}&longitude=${locationDetails.longitude}&current_weather=true&models=icon_global`;
    return axios.get(url).then((response) => response.data)
  }

export function displayLocation(locationDetails: Location): void {
    const locationName = document.getElementById('location-name') as HTMLElement;
    locationName.innerText = locationDetails.name;

    const country = document.getElementById('country')  as HTMLElement;
    country.innerText = `(${locationDetails.country})`;
}

export function displayWeatherData(obj: WeatherResponse): void {
    const temperature = document.getElementById('temperature') as HTMLElement;
    temperature.innerText = `Temperature: ${obj.current_weather.temperature} ${obj.current_weather_units.temperature}`
    const windspeed = document.getElementById('windspeed') as HTMLElement;
    windspeed.innerText = `Wind Speed: ${obj.current_weather.windspeed} ${obj.current_weather_units.windspeed}`
    const winddirection = document.getElementById('winddirection') as HTMLElement;
    winddirection.innerText = `Wind Direction: ${obj.current_weather.winddirection} ${obj.current_weather_units.winddirection}`
}

  // src/utils.ts
  // ...

  export function updateBackground(weatherCode: number, isDay: number): void {

    const firstCharacter = weatherCode.toString().charAt(0);

    switch(firstCharacter){
        case "0":
        case "1":
            if(isDay === 0){
                document.body.className = "sunny-night";
            } else {
                document.body.className = "sunny";
            }
            break;
        case "2":
            if(isDay === 0){
                document.body.className = "partly-cloudy-night";
            } else {
                document.body.className = "partly-cloudy";
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
            document.body.className = "";
            break;
    }
}