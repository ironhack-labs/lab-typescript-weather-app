/* src/main.ts
import {
    getLocation,
    getCurrentWeather,
    displayLocation,
     displayWeatherData,
    updateBackground,
    displayWeatherDate,
} from "./utils.ts";

const form = document.getElementById("weather-frorm") as HTMLFormElement;

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const locationInput = document.getElementById("location") as HTMLInputElement;
    const locationName = locationInput.value.trim();

    locationInput.value = "";

    if (!locationName){
        console.log("Please enter Your Location");
        return;
    }

    getLocation(locationName)
    .then((response) => {
        if(!response.results || response.results.length === 0) {
            throw new Error("Location not found");
        }

        const location = response.results[0];
        displayLocation(location);
        return getCurrentWeather(location);
    } )
    .then ((weatherData) => {
        displayWeatherDate(weatherData);

        updateBackground(
            weatherData.current_weather.weathercode,
            weatherData.current_weather.is_day
        );
    })

    .catch((err) => {
        console.log("Error getting weather data");
        console.log(err);
    });

});*/

import {
  getLocation,
  getCurrentWeather,
  displayLocation,
  displayWeatherData,
  updateBackground,
} from "./utils.ts";

const form = document.getElementById("weather-form") as HTMLFormElement;

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const locationInput = document.getElementById("location") as HTMLInputElement;
  const locationName = locationInput.value.trim();
  locationInput.value = "";

  if (!locationName) {
    console.log("Please enter your location");
    return;
  }

  getLocation(locationName)
    .then((response) => {
      if (!response.results || response.results.length === 0) {
        throw new Error("Location not found");
      }
      const location = response.results[0];
      displayLocation(location);
      return getCurrentWeather(location);
    })
    .then((weatherData) => {
      displayWeatherData(weatherData);
      updateBackground(
        weatherData.current_weather.weathercode,
        weatherData.current_weather.is_day
      );
    })
    .catch((err) => {
      console.log("Error getting weather data");
      console.log(err);
    });
});

