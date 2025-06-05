import { getLocation, getCurrentWeather, displayLocation, displayWeatherData, updateBackground } from "./utils";
import { Location } from "./types";

const form = document.getElementById("weather-form");
const input = document.getElementById("location") as HTMLInputElement | null;

if (form && input) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const locationName = input.value.trim();

    if (!locationName) {
      alert("Please enter a location name");
      return;
    }

    console.log(`The user has submitted the form and is searching for a location with this name... [${locationName}]`);

    try {
      const locationResponse = await getLocation(locationName);

      if (!locationResponse.results || locationResponse.results.length === 0) {
        alert("No location found with that name.");
        return;
      }

      const locationDetails: Location = locationResponse.results[0];

      displayLocation(locationDetails);

      const weatherData = await getCurrentWeather(locationDetails);

      displayWeatherData(weatherData);

      
      updateBackground(weatherData.current_weather.weathercode, weatherData.current_weather.is_day);

    } catch (error) {
      console.error("Error fetching location or weather data:", error);
      alert("Sorry, something went wrong. Please try again later.");
    }
  });
}