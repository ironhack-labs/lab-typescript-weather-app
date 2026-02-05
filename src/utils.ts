// src/utils.ts

import axios from "axios";
import { LocationResponse, Location, WeatherResponse } from "./types";

export function getLocation(locationName: string): Promise<LocationResponse> {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${locationName}&count=1`;
  return axios.get(url).then((response) => response.data);
}

// 1.2 - Create the signature for the function getCurrentWeather()

export function getCurrentWeather(
  locationDetails: Location,
): Promise<WeatherResponse> {
  // 1.3 - Implement the function getCurrentWeather()

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${locationDetails.latitude}&longitude=${locationDetails.longitude}&current_weather=true&models=icon_global`;
  return axios.get(url).then((response) => response.data);
}
// Iteration 2 | Functionality to display the location in the UI

// 2.1 - Create the signature for the function displayLocation()

export function displayLocation(locationDetails: Location) {
  // 2.2 - Implement the function displayLocation()

  const locationName = document.getElementById("location-name") as HTMLElement;
  locationName.innerHTML = "" + locationDetails.name;

  const locationCountry = document.getElementById("country") as HTMLElement;
  locationCountry.innerHTML = "(" + locationDetails.country + ")";
}

// Iteration 3 | Functionality to display the weather info in the UI
// 3.1 - Create the signature for the function displayWeatherData()

export function displayWeatherData(obj: WeatherResponse) {
  // 3.2 - Implement the function displayWeatherData()

  const theTemperature = document.getElementById("temperature") as HTMLElement;
  const temperature = obj.current_weather.temperature;
  const temperatureUnits = obj.current_weather_units.temperature;
  theTemperature.innerHTML = `Temperature: ${temperature} ${temperatureUnits}`;

  const theWindSpeed = document.getElementById("windspeed") as HTMLElement;
  const windSpeed = obj.current_weather.windspeed;
  const windSpeedUnits = obj.current_weather_units.windspeed;
  theWindSpeed.innerHTML = `Wind Speed: ${windSpeed} ${windSpeedUnits}`;

  const theWindDirection = document.getElementById(
    "winddirection",
  ) as HTMLElement;
  const windDirection = obj.current_weather.winddirection;
  const windDirectionUnits = obj.current_weather_units.winddirection;
  theWindDirection.innerHTML = `Wind Direction: ${windDirection} ${windDirectionUnits}`;
}

// Bonus: Iteration 5 | Update background
// 5.1 - Create the signature for the function updateBackground()

export function updateBackground(weatherCode: number, isDay: number) {
  // 5.2 - Implement the function updateBackground()
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

