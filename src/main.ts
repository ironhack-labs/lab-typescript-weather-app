import {
  displayWeatherData,
  getCurrentWeather,
  getLocation,
  updateBackground,
} from "./utils";

// src/main.ts
const ourForm = document.getElementById("weather-form") as HTMLFormElement;
ourForm.addEventListener("submit", async (e) => {
  //prevent reload
  e.preventDefault();
  //get input and value
  const ourInput = document.getElementById("location") as HTMLInputElement;
  const location = ourInput.value;
  try {
    //call api with location from input
    const { results } = await getLocation(location);
    if (results) {
      console.log("form submitted", { location, locationResponse: results[0] });
      //use first index of response to get the current weather
      const ourWeatherResponse = await getCurrentWeather(results[0]);
      console.log("the weather response", ourWeatherResponse);
      //update the DOM to have the current weather
      displayWeatherData(ourWeatherResponse);
      //for the background
      const theWeatherCode: number =
        ourWeatherResponse.current_weather.weathercode;
      const theDay: number = ourWeatherResponse.current_weather.is_day;
      updateBackground(theWeatherCode, theDay);
    } else {
      // If there's no results, throw an error
      throw new Error("Location not found");
    }
  } catch (error) {
    throw new Error("Location not found");
  }

  //clear form
  ourInput.value = "";
});
