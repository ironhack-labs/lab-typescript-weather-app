// src/main.ts

import {
  displayLocation,
  displayWeatherData,
  getCurrentWeather,
  getLocation,
  updateBackground,
} from "./utils";

// Iteration 4 | Display weather from users' input
// 4.1 - Implement Event Listener for Form Submission

const form = document.getElementById("weather-form") as HTMLFormElement;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("The user has submitted the form");
  // 4.2 - Get the name of the location provided by the user

  const locationInput = document.getElementById("location") as HTMLInputElement;
  const locationName = locationInput.value;
  console.log(`The user is searching for: ${locationName} `);
  locationInput.value = "";

  getLocation(locationName)
    .then((res) => {
      if (res.results) {
        const location = res.results[0];

        displayLocation(location);
        return getCurrentWeather(location);
      } else {
        throw new Error("Location not found");
      }
    })
    .then((weatherData) => {
      displayWeatherData(weatherData);
      updateBackground(
        weatherData.current_weather.weathercode,
        weatherData.current_weather.is_day,
      );
    })
    .catch((err) => {
      console.log("Error getting the weather data", err);
    });
});
