import {
  displayLocation,
  displayWeatherData,
  getCurrentWeather,
  getLocation,
  updateBackground,
} from "./utils";

const formSubmit = document.getElementById("weather-form") as HTMLFormElement;

formSubmit.addEventListener("submit", async (event) => {
  event.preventDefault();
  const locationInput: HTMLInputElement = document.getElementById(
    "location"
  ) as HTMLInputElement;
  const locationValue = locationInput.value;
  locationInput.value = "";
  try {
    const location = await getLocation(locationValue);
    if (location.results) {
      displayLocation(location.results[0]);
      const weather = await getCurrentWeather(location.results[0]);
      updateBackground(
        weather.current_weather.weathercode,
        weather.current_weather.is_day
      );
      displayWeatherData(weather);
    } else {
      throw new Error("Location not found");
    }
  } catch (error) {
    console.log("Error getting weather data");
    console.log(error);
  }
});
