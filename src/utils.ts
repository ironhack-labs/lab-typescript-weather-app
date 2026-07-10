// src/utils.ts

import axios from 'axios';
import { LocationResponse, Location, WeatherResponse } from "./types";



export function getLocation(locationName: string): Promise<LocationResponse> {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${locationName}&count=1`;
    return axios.get(url).then((response) => response.data);
}

export function getCurrentWeather(locationDetails: Location): Promise<WeatherResponse>{
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${locationDetails.latitude}&longitude=${locationDetails.longitude}&current_weather=true&models=icon_global`;
    return axios.get(url).then((response) => response.data);


}

 export function displayLocation(locationDetails: Location){
    const displayedLocationname = document.getElementById("location-name") as HTMLElement;
    displayedLocationname.innerText = "" + locationDetails.name;

    const locationCountry = document.getElementById("country") as HTMLElement;
    locationCountry.innerText = "" + locationDetails.country;

 }

 export function displayWeatherData(obj:WeatherResponse){
    const weatherInfo = document.getElementById("temperature") as HTMLElement;
   const temperature = obj.current_weather.temperature;
    const temperatureUnits = obj.current_weather_units.temperature;
    weatherInfo.innerText = `Temperature: ${temperature} ${temperatureUnits}`;

      const windspeedInfo = document.getElementById('windspeed') as HTMLElement;
    const windspeed = obj.current_weather.windspeed;
    const windspeedUnits = obj.current_weather_units.windspeed;
    windspeedInfo.innerText = `Wind Speed: ${windspeed} ${windspeedUnits}`;

   
    const winddirectionInfo = document.getElementById('winddirection') as HTMLElement;
    const winddirection = obj.current_weather.winddirection;
    const winddirectionUnits = obj.current_weather_units.winddirection;
    winddirectionInfo.innerText = `Wind Direction: ${winddirection} ${winddirectionUnits}`;
    
 }




