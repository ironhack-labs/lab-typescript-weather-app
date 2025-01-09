import { getLocation, getCurrentWeather, displayLocation, displayWeatherData, updateBackground } from './utils.ts';

const form = document.getElementById("weather-form") as HTMLFormElement;

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const locationInput = document.getElementById("location") as HTMLInputElement;
  const locationName = locationInput.value;
  locationInput.value = ""; 

  if (!locationName) {
    return;
  }

  try {
    const { results } = await getLocation(locationName);
    if (!results || results.length === 0) {
      return;
    }
    const location = results[0];
    displayLocation(location);

    const weatherData = await getCurrentWeather(location);
    displayWeatherData(weatherData);

    const { weathercode, is_day } = weatherData.current_weather;
    updateBackground(weathercode, is_day);
    
  } catch (error) {
    console.error("An error occurred:", error);
  }
});