// src/main.ts
import {
  getLocation,
  getCurrentWeather,
  displayLocation,
  displayWeatherData,
  updateBackground,
} from "./utils";

// Add event listener to the form
const form = document.getElementById("weather-form") as HTMLFormElement;

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  console.log("User submitted the form.");

  //get the location name from input field
  const locationNameInput = document.getElementById(
    "location",
  ) as HTMLInputElement;
  const locationName = locationNameInput.value;
  console.log("Location name submitted by user: " + locationName);
  locationNameInput.value = "";

  //get the location details from the API
  getLocation(locationName)
    .then((response) => {
      if (response.results) {
        console.log("Location details: ", response.results);
        // Get the first result (the api may provide multiple results if there's multiple locations with the same or similar names, we will just use the first one for simplicity)
        const location = response.results[0];

        // Display info about the location
        displayLocation(location);

        // Get info about the weather for that location
        return getCurrentWeather(location);
      } else {
        // If there's no results, throw an error
        throw new Error("Location not found");
      }
    })
    .then((weatherData) => {
      // Display info about the weather
      displayWeatherData(weatherData);
      updateBackground(weatherData.current_weather.weathercode, weatherData.current_weather.is_day);
    })
    .catch((error) => {
      console.log("Error getting weather data");
      console.log(error);
    });
});
