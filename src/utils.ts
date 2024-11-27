// src/utils.ts

import axios from "axios";
import { LocationResponse, Location, WeatherResponse } from "./types";

export function getLocation(locationName: string): Promise<LocationResponse> {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${locationName}&count=1`;
    console.log("Request:", url);
    return axios.get(url).then((response) => {
        console.log("Response:", response.data);
        return response.data;
    });
}

export function getCurrentWeather(locationDetails: Location): Promise<WeatherResponse> {
    const url = `meteo.com/v1/forecast?latitude=${locationDetails.latitude}&longitude=${locationDetails.longitude}&current_weather=true&models=icon_global`;
    console.log("Request:", url);
    return axios.get(url).then((response) => {
        console.log("Response:", response.data);
        return response.data;
    });
}

export function displayLocation(locationDetails: Location) {
    const locationElement = document.getElementById("location-name") as HTMLElement;
    locationElement.innerText = "" + locationDetails.name;

    const countryElement = document.getElementById("country") as HTMLElement;
    countryElement.innerText = "(" + locationDetails.country + ")";
}

export function displayWeatherData(obj: WeatherResponse) {
    const temperatureElement = document.getElementById("temperature") as HTMLElement;
    const temperature = obj.current_weather.temperature;
    const temperatureUnits = obj.current_weather_units.temperature;
    temperatureElement.innerText = `Temperature: ${temperature} ${temperatureUnits}`;

    const windspeedElement = document.getElementById("windspeed") as HTMLElement;
    const windspeed = obj.current_weather.windspeed;
    const windspeedUnits = obj.current_weather_units.windspeed;
    windspeedElement.innerText = `Wind Speed: ${windspeed} ${windspeedUnits}`;

    const winddirectionElement = document.getElementById("winddirection") as HTMLElement;
    const winddirection = obj.current_weather.winddirection;
    const winddirectionUnits = obj.current_weather_units.winddirection;
    winddirectionElement.innerText = `Wind Direction: ${winddirection} ${winddirectionUnits}`;
}