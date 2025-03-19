// src/main.ts

import { LocationResponse, Location, WeatherResponse } from './types';
import {
  getLocation,
  getCurrentWeather,
  displayWeather,
  displayLocation,
  updateBackground,
} from './utils';

const input = document.querySelector('input')!;
const form = document.querySelector('form')!;

form.addEventListener('submit', async e => {
  e.preventDefault();
  const locationName = input.value;
  let response: LocationResponse;
  let location: Location | null = null;
  let weather: WeatherResponse | null = null;

  try {
    response = await getLocation(locationName);
    location = response.results?.[0] ?? null;

    if (!location) return console.warn('Location not found: ', location);

    weather = await getCurrentWeather(location);
    displayLocation(location);

    if (!weather) return console.warn('Weather not found: ', weather);

    displayWeather(weather);
    updateBackground(
      weather.current_weather.weathercode,
      weather.current_weather.is_day
    );
  } catch (error) {
    console.error('Error in fetching from weather API: ', error);
  }
});
