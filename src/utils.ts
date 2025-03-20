// src/utils.ts
import axios from 'axios';
import { LocationResponse, Location, WeatherResponse } from "./types";



export function getLocation(locationName: string): Promise<LocationResponse> {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${locationName}&count=1`;
    return axios.get(url).then((response) => response.data);
}


export function getCurrentWeather(locationDetails: Location): Promise<WeatherResponse> {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${locationDetails.latitude}&longitude=${locationDetails.longitude}&current_weather=true&models=icon_global`;
    return axios.get(url).then((response) => response.data);
}

export function displayLocation(locationDetails: Location) {
    // display location name
    const locationNameElm = document.getElementById('location-name') as HTMLElement;
    locationNameElm.innerText = "" + locationDetails.name;

    // display country
    const countryElm = document.getElementById('country') as HTMLElement;
    countryElm.innerText = "(" + locationDetails.country + ")";
}

export function displayWeatherData(obj: WeatherResponse) {
    // display temperature  
    const temperatureElm = document.getElementById('temperature') as HTMLElement;
    const temperature = obj.current_weather.temperature;
    const temperatureUnits = obj.current_weather_units.temperature;
    temperatureElm.innerText = `Temperature: ${temperature} ${temperatureUnits}`;
    
    // display wind speed
    const windspeedElm = document.getElementById('windspeed') as HTMLElement;
    const windspeed = obj.current_weather.windspeed;
    const windspeedUnits = obj.current_weather_units.windspeed;
    windspeedElm.innerText = `Wind Speed: ${windspeed} ${windspeedUnits}`;

    // display wind direction
    const winddirectionElm = document.getElementById('winddirection') as HTMLElement;
    const winddirection = obj.current_weather.winddirection;
    const winddirectionUnits = obj.current_weather_units.winddirection;
    winddirectionElm.innerText = `Wind Direction: ${winddirection} ${winddirectionUnits}`;
}

export function updateBackground(weatherCode: number, isDay: number) {

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