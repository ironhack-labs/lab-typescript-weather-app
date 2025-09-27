/* src/utils.ts

import axios from 'axios';
import { LocationResponse, Location, WeatherResponse } from "./types";



export function getLocation(locationName: string): Promise<LocationResponse> {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${locationName}&count=1`;
    return axios.get(url).then((response) => response.data);
}

/** Iteration 1.2 + 1.3 
export function getCurrentWeather(locatoinDetails: Location):Promise<WeatherResponse> {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${locatoinDetails.latitude}&longitude=${locatoinDetails.longitude}&current_weather=true&models=icon_global`;
    return axios.get(url).then((res)=> res.data);
}
/** Iteration 2 
export function displayLocation(locatoinDetails: Location): void {
    const locationNameElm = document.getElementById("location-name") as HTMLElement;
    const countryElm =document.getElementById("country") as HTMLElement;

    if (locationNameElm) locationNameElm.innerText = String(locatoinDetails.name);
    if (countryElm) countryElm.innerText = `(${locatoinDetails.country})`;
}

/*Iteration 3
export function displayWeatherDate(obj: WeatherResponse): void {
    const temperatureElm = document.getElementById("temperature") as HTMLElement;
    const windspeedElm = document.getElementById("windspeed") as HTMLElement;
    const winddirectionElm = document.getElementById("winddirection") as HTMLElement;

    const t = obj.current_weather.temperature;
    const tU = obj.current_weather_units.temperature;

    const ws = obj.current_weather.windspeed;
    const wsU = obj.current_weather_units.windspeed;

    const wd = obj.current_weather.winddirection;
    const wdU = obj.current_weather_units.winddirection;

    if (temperatureElm) temperatureElm.innerText = `Temperature: ${t} ${tU}`;
    if (windspeedElm) windspeedElm.innerText = `windspeed: ${ws} ${wsU}`;
    if (winddirectionElm) winddirectionElm.innerText= `winddirection: ${wd} ${wdU}`;
}

/*Iteration 5

export function updateBackground(weathercode: number, isDay: number): void{
    const first = weathercode.toString().charAt(0);
    switch(first) {
        case "0":
            case "1":
                document.body.className = isDay === 0 ? "sunny-night": "sunny";
                break;
                case "2":
                    document.body.className = isDay === 0 ? "partly-cloudy-night": "partly-cloudy";
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
                                                document.body.className = "thunderstrom";
                                                break;
                                                default:
                                                    document.body.className = "";


    }
}*/
import axios from "axios";
import { LocationResponse, Location, WeatherResponse } from "./types.ts";

export function getLocation(locationName: string): Promise<LocationResponse> {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(locationName)}&count=1`;
  return axios.get(url).then((response) => response.data);
}

export function getCurrentWeather(locationDetails: Location): Promise<WeatherResponse> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${locationDetails.latitude}&longitude=${locationDetails.longitude}&current_weather=true&models=icon_global`;
  return axios.get(url).then((res) => res.data);
}

export function displayLocation(locationDetails: Location): void {
  const locationNameElm = document.getElementById("location-name") as HTMLElement;
  const countryElm = document.getElementById("country") as HTMLElement;
  if (locationNameElm) locationNameElm.innerText = String(locationDetails.name);
  if (countryElm) countryElm.innerText = `(${locationDetails.country})`;
}

export function displayWeatherData(obj: WeatherResponse): void {
  const temperatureElm = document.getElementById("temperature") as HTMLElement;
  const windspeedElm = document.getElementById("windspeed") as HTMLElement;
  const winddirectionElm = document.getElementById("winddirection") as HTMLElement;

  const t = obj.current_weather.temperature;
  const tU = obj.current_weather_units.temperature;
  const ws = obj.current_weather.windspeed;
  const wsU = obj.current_weather_units.windspeed;
  const wd = obj.current_weather.winddirection;
  const wdU = obj.current_weather_units.winddirection;

  if (temperatureElm)  temperatureElm.innerText  = `Temperature: ${t} ${tU}`;
  if (windspeedElm)    windspeedElm.innerText    = `Wind Speed: ${ws} ${wsU}`;
  if (winddirectionElm)winddirectionElm.innerText= `Wind Direction: ${wd} ${wdU}`;
}

export function updateBackground(weatherCode: number, isDay: number): void {
  const first = weatherCode.toString().charAt(0);
  switch (first) {
    case "0":
    case "1":
      document.body.className = isDay === 0 ? "sunny-night" : "sunny";
      break;
    case "2":
      document.body.className = isDay === 0 ? "partly-cloudy-night" : "partly-cloudy";
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
  }
}




