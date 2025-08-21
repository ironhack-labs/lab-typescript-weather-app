// src/main.ts
import {
  getLocation,
  getCurrentWeather,
  displayLocation,
  displayWeatherData,
  updateBackground,
} from "./utils";
const weatherForm = document.getElementById("weather-form") as HTMLFormElement;

if (weatherForm) {
  weatherForm.addEventListener("submit", async (event: Event) => {
    event.preventDefault();

    const locationInput = document.getElementById(
      "location"
    ) as HTMLInputElement;
    const locationName = locationInput.value;
    locationInput.value = "";

    try {
      const locationResponse = await getLocation(locationName);

      if (!locationResponse.results || locationResponse.results.length === 0) {
        console.log("No location found");
        return;
      }

      const location = locationResponse.results[0];

      displayLocation(location);
      const weatherResponse = await getCurrentWeather(location);
      displayWeatherData(weatherResponse);
      updateBackground(
        weatherResponse.current_weather.weathercode,
        weatherResponse.current_weather.is_day
      );
    } catch (error) {
      console.error("Error getting weather data:", error);
    }
  });
}
