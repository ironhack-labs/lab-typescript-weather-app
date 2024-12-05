// src/main.ts
import {
  getLocation,
  getCurrentWeather,
  displayLocation,
  displayWeatherData,
} from "./utils.ts";

const form = document.getElementById("weather-form") as HTMLElement;
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const locationInput = document.getElementById("location") as HTMLInputElement;
  const locationName = locationInput.value;
  console.log(
    `The user has submitted the form and is searching for a location with this name ${locationName}`
  );
  locationInput.value = "";

  getLocation(locationName)
    .then((res) => {
      if (res.results) {
        const location = res.results[0];
        displayLocation(location);
        return getCurrentWeather(location);
      } else {
        throw new Error("location not found");
      }
    })

    .then((weatherData) => {
      displayWeatherData(weatherData);
    })
    .catch((error) => {
      console.log(error);
    });
});
