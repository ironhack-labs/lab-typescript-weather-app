// src/utils.ts

import axios from 'axios';
import { LocationResponse, Location, WeatherResponse } from './types';

export function getLocation(locationName: string): Promise<LocationResponse> {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${locationName}&count=1`;
  return axios.get(url).then((response) => response.data);
}

export function getCurrentWeather(locationDetails: Location): Promise<WeatherResponse> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${locationDetails.latitude}&longitude=${locationDetails.longitude}&current_weather=true&models=icon_global`;
  return axios
    .get(url)
    .then((response) => response.data)
    .catch((err) => {
      console.log('error while trying to get weather data', err);
    });
}

export function displayLocation(locationDetails: Location): void {
  const locationNameElm = document.getElementById('location-name') as HTMLElement;
  const countryElm = document.getElementById('country') as HTMLElement;
  locationNameElm.innerText = '' + locationDetails.name;
  countryElm.innerText = '(' + locationDetails.country + ')';
}

export function displayWeatherData(obj: WeatherResponse): void {
  const temperatureElm = document.getElementById('temperature') as HTMLElement;
  temperatureElm.innerText = `Temperature: ${obj.current_weather.temperature} ${obj.current_weather_units.temperature}`;
  const windspeedElm = document.getElementById('windspeed') as HTMLElement;
  windspeedElm.innerText = `Wind Speed: ${obj.current_weather.windspeed} ${obj.current_weather_units.windspeed}`;
  const winddirectionElm = document.getElementById('winddirection') as HTMLElement;
  winddirectionElm.innerText = `Wind Direction: ${obj.current_weather.winddirection} ${obj.current_weather_units.winddirection}`;
}

export function updateBackground(weathercode: number, isDay: number): void {
  const bodyElm = document.body as HTMLBodyElement;
  switch (weathercode) {
    case 0:
    case 1:
      isDay === 0 ? (bodyElm.className = 'sunny-night') : (bodyElm.className = 'sunny');
      break;
    case 2:
      isDay === 0
        ? (bodyElm.className = 'partly-cloudy-night')
        : (bodyElm.className = 'partly-cloudy');
      break;
    case 3:
      bodyElm.className = 'cloudy';
      break;
    case 4:
      bodyElm.className = 'foggy';
      break;
    case 5:
      bodyElm.className = 'drizzle';
      break;
    case 6:
      bodyElm.className = 'rain';
      break;
    case 7:
      bodyElm.className = 'snow';
      break;
    case 8:
      bodyElm.className = 'showers';
      break;
    case 9:
      bodyElm.className = 'thunderstorm';
      break;
    default:
      bodyElm.className = '';
      break;
  }
}
