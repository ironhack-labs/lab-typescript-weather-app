import {
  getLocation,
  getCurrentWeather,
  displayLocation,
  displayWeatherData,
} from "./utils.ts";

const form = document.getElementById("weather-form") as HTMLFormElement;

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const location = (event.target as HTMLFormElement).location.value;
  console.log("form submitted with location:", location);

  getLocation(location)
    .then((response) => {
      if (response.results) {
        const location = response.results[0];
        displayLocation(location);
        return getCurrentWeather(location);
      } else {
        throw new Error("No results found");
      }
    })
    .then((weatherData) => {
      displayWeatherData(weatherData);
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
    });
});
