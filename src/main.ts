import {
  getLocation,
  getCurrentWeather,
  displayLocation,
  displayWeather,
} from "./utils";

const form = document.querySelector("form");
const input = document.querySelector("input") as HTMLInputElement;

form?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const locationName = input.value.trim();
  if (!locationName) return;

  try {
    const locationData = await getLocation(locationName);
    const location = locationData.results
      ? locationData.results[0]
      : locationData[0];
    displayLocation(location);

    const weatherData = await getCurrentWeather(location);
    displayWeather(weatherData);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});
