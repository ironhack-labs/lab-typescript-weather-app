// src/main.ts
import axios from 'axios';
import * as dotenv from 'dotenv';
import { LocationResponse, WeatherResponse } from './types';

// Load environment variables from .env file
dotenv.config();

// Get the API key from environment variables
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error("API_KEY is missing. Please set it in the .env file.");
  process.exit(1);
}

// Fetch location data
export async function getLocation(locationName: string): Promise<LocationResponse | null> {
  const encodedLocationName = encodeURIComponent(locationName); // Encode the location name
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodedLocationName}&count=1`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    // Type checking
    if (data && data.results && Array.isArray(data.results)) {
      return data as LocationResponse;  // Safely assert the type
    } else {
      console.error("Invalid response structure:", data);
      return null;
    }
  } catch (error) {
    console.error("Error fetching location data:", error);
    return null;
  }
}

// Fetch weather data
export async function getWeather(latitude: number, longitude: number): Promise<WeatherResponse | null> {
  // Use the API_KEY from the environment variables
  const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${latitude},${longitude}`;

  try {
    const response = await axios.get(url);
    return response.data as WeatherResponse;  // Safely assert the type to WeatherResponse
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
}

// Example usage (to test)
(async () => {
  const locationName = "London";
  const location = await getLocation(locationName);

  if (location?.results && location.results.length > 0) {
    const { latitude, longitude } = location.results[0];
    console.log(`Location found: ${location.results[0].name}, ${location.results[0].country} (${latitude}, ${longitude})`);

    const weather = await getWeather(latitude, longitude);
    if (weather) {
      console.log(`Weather: ${weather.current_weather.temperature}°C`);
    } else {
      console.log("Failed to fetch weather data.");
    }
  } else {
    console.log("Location not found.");
  }
})();

