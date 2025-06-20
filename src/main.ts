import {
  displayLocation,
  displayWeatherData,
  getCurrentWeather,
  getLocation,
} from "./utils";

// src/main.ts
const form = document.getElementById("weather-form") as HTMLFormElement;
form.addEventListener("submit", async (event) => {
  const locationInput = document.getElementById("location") as HTMLInputElement;
  const locationName = locationInput.value;
  event.preventDefault();
  console.log(
    `The user has submitted the form, searching for: ${locationName}`
  );
  locationInput.value = "";

  try {
    const resp = await getLocation(locationName);
    if (!resp.results || resp.results.length === 0) {
      throw new Error("Location not found");
    }
    const location = resp.results[0];
    displayLocation(location);
    const weatherData = await getCurrentWeather(location);
    displayWeatherData(weatherData);
  } catch (error) {
    console.log("Error getting weather data");
    console.log(error);
  }
});
