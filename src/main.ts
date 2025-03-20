import {
  getLocation,
  getCurrentWeather,
  displayLocation,
  displayWeatherData,
} from "./utils.ts";

const form = document.getElementById("weather-form") as HTMLFormElement;

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const input = document.getElementById("location") as HTMLInputElement;
  const locationName = input.value;
  input.value = "";

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
    })
    .catch((error) => {
      console.error(error);
    });
});
