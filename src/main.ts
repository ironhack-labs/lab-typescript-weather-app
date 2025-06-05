// src/main.ts

import {
  getLocation,
  getCurrentWeather,
  displayLocation,
  displayWeather,
  updateBackground,
} from "./utils.ts";

const form = document.getElementById("weather-form") as HTMLFormElement;

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const locationInput = document.getElementById("location") as HTMLInputElement;
  const locationName = locationInput.value;
  locationInput.value = "";

  getLocation(locationName)
    .then((response) => {
      if (response.results) {
        const location = response.results[0];

        displayLocation(location);

        return getCurrentWeather(location);
      } else {
        throw new Error("Location not found");
      }
    })
    .then((weatherData) => {
      displayWeather(weatherData);
      updateBackground(
        weatherData.current_weather.weathercode,
        weatherData.current_weather.is_day
      ); // <== ADD THIS
    })
    .catch((error) => {
      console.log("Error getting weather data");
      console.log(error);
    });
});
