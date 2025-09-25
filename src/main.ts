// src/main.ts
import {
  getLocation,
  getCurrentWeather,
  displayLocation,
  displayWeatherData,
  updateBackground,
} from "./utils";
(document.getElementById("weather-form") as HTMLFormElement)?.addEventListener(
  "submit",
  (e) => {
    e.preventDefault();
    let locationInput = document.getElementById("location") as HTMLInputElement;
    let locationName = locationInput.value;
    const locationResponse = getLocation(locationName);
    locationResponse.then((locationData) => {
      if (!locationData || !locationData.results) {
        return;
      }
      displayLocation(locationData.results[0]);
      const weatherResponse = getCurrentWeather(locationData.results[0]);
      weatherResponse.then((weatherData) => {
        displayWeatherData(weatherData);
        updateBackground(
          weatherData.current_weather.weathercode,
          weatherData.current_weather.is_day
        );
      });
    });
    console.log(
      "The user has submitted the form and is searching for a location with this name..." +
        locationName
    );
    locationInput.value = "";
  }
);
