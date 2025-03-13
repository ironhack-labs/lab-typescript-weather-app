// src/main.ts
import {
  getLocation,
  getCurrentWeather,
  displayLocation,
  displayWeatherData,
  updateBackground,
} from "./utils";

const form = document.getElementById("weather-form") as HTMLFormElement;

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const locationInput = document.getElementById("location") as HTMLInputElement;
  const locationName = locationInput.value;

  locationInput.value = "";
  console.log(
    `The user has submitted the form and is searching for a location with this name...${locationName}`
  );

  locationInput.value = "";

  getLocation(locationName)
    .then((response) => {
      if (response.results) {
        const res = response.results;
        const location = res[0];

        displayLocation(location);

        return getCurrentWeather(location);
      } else {
        throw new Error("Sorry, location was not found!");
      }
    })
    .then((weatherData) => {
      displayWeatherData(weatherData);
      updateBackground(
        weatherData.current_weather.weathercode,
        weatherData.current_weather.is_day
      );
    })
    .catch((error) => {
      console.log("Error getting weather data");
      console.log(error);
    });
});
