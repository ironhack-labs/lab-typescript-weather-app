import {
  getLocation,
  getCurrentWeather,
  displayLocation,
  displayWeatherData,
} from "./utils";

const form = document.getElementById("weather-form") as HTMLFormElement | null;

if (!form) {
  console.error("Form not found");
} else {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const input = document.getElementById("location") as HTMLInputElement | null;

    if (!input) {
      console.error("Input not found");
      return;
    }

    const locationName = input.value;

    console.log(
      `The user has submitted the form and is searching for... [${locationName}]`
    );

    try {
      const locationResponse = await getLocation(locationName);

      if (!locationResponse.results || locationResponse.results.length === 0) {
        console.log("Location not found");
        return;
      }

      const location = locationResponse.results[0];
      displayLocation(location);

      const weather = await getCurrentWeather(location);
      displayWeatherData(weather);
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  });
}
