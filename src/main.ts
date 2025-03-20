// src/main.ts
import { getLocation, getCurrentWeather, displayLocation, displayWeatherData } from './utils.ts';
import { getLocation, getCurrentWeather, displayLocation, displayWeatherData, updateBackground } from './utils';



const form = document.getElementById("weather-form") as HTMLFormElement;

form.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent the default form submission behavior

  const locationInput = document.getElementById("location") as HTMLInputElement;
  const locationName = locationInput.value;
  locationInput.value = ""; // Clear the form

  getLocation(locationName)
    .then((response) => {
      if(response.results){

        // Get the first result (the api may provide multiple results if there's multiple locations with the same or similar names, we will just use the first one for simplicity)
        const location = response.results[0];

        // Display info about the location
        displayLocation(location);

        // Get info about the weather for that location
        return getCurrentWeather(location);
      } else {
        // If there's no results, throw an error
        throw new Error('Location not found');
      }
    })
    .then((weatherData) => {

      // Display info about the weather
      displayWeatherData(weatherData);
      
    })
    .catch((error) => {
      console.log("Error getting weather data");
      console.log(error);
    });

});