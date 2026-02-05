// src/main.ts
import {
  getLocation,
  getCurrentWeather,
  displayLocation,
  displayWeatherData,
  updateBackground,
} from "./utils.ts";

const weatherForm = document.getElementById("weather-form") as HTMLFormElement;

weatherForm?.addEventListener("submit", (e) => {
  e.preventDefault();

  const locationInput = document.getElementById("location") as HTMLFormElement;
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
      displayWeatherData(weatherData);

      updateBackground(
        weatherData.current_weather.weathercode,
        weatherData.current_weather.is_day,
      );
    })
    .catch((error) => {
      console.log(error);
    });
});
