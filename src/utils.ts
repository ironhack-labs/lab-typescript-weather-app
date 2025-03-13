import axios from 'axios';
import { LocationResponse, Location, WeatherResponse } from './types';

export async function getLocation(
  locationName: string,
): Promise<LocationResponse> {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${locationName}&count=1`;
  const response = await axios.get(url);
  console.log(response.data);
  return response.data;
}

export async function getCurrentWeather(
  locationDetails: Location,
): Promise<WeatherResponse> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${locationDetails.latitude}&longitude=${locationDetails.longitude}&current_weather=true&models=icon_global`;

  const response = await axios.get<WeatherResponse>(url);
  return response.data;
}

export function displayLocation(locationDetails: Location): void {
  const locationContainerElem = document.getElementById('location-name');

  if (locationContainerElem !== null) {
    locationContainerElem.innerHTML = locationDetails.name;
  }

  const countryElem = document.getElementById('country');

  if (countryElem !== null) {
    countryElem.innerHTML = locationDetails.country;
  }
}

export function displayWeatherData(obj: WeatherResponse): void {
  const temperatureElm = document.getElementById('temperature') as HTMLElement;
  const temperature = obj.current_weather.temperature;
  const temperatureUnits = obj.current_weather_units.temperature;
  temperatureElm.innerText = `Temperature: ${temperature} ${temperatureUnits}`;

  const windSpeedElm = document.getElementById('windspeed') as HTMLElement;
  const windSpeed = obj.current_weather.windspeed;
  const windSpeedUnits = obj.current_weather_units.windspeed;
  windSpeedElm.innerText = `Wind Speed: ${windSpeed} ${windSpeedUnits}`;

  const windDirectionElm = document.getElementById(
    'winddirection',
  ) as HTMLElement;

  const windDirection = obj.current_weather.winddirection;
  const windDirectionUnits = obj.current_weather_units.winddirection;
  windDirectionElm.innerText = `Wind Direction: ${windDirection} ${windDirectionUnits}`;
}
