// src/main.ts
// src/main.ts

import { getLocation, getCurrentWeather, displayLocation, displayWeatherData } from './utils.ts';

const form = document.getElementById("weather-form") as HTMLFormElement;

form.addEventListener('submit', (event) => {
    event.preventDefault(); 
    const locationInput = document.getElementById("location") as HTMLInputElement;
    const locationName = locationInput.value.trim();
  
    if (!locationName) {
      console.log("Please enter a location.");
      return;
    }
  
    console.log(`The user has submitted the form and is searching for a location with this name... ${locationName} `);
  
    locationInput.value = ""; // Clear the form
  
    getLocation(locationName)
      .then((response) => {
        if(response.results && response.results.length > 0){
          const location = response.results[0];
          displayLocation(location);
          return getCurrentWeather(location);
        } else {
          throw new Error('Location not found');
        }
      })
      .then((weatherData) => {
        displayWeatherData(weatherData);
      })
      .catch((error) => {
        console.log("Error getting weather data");
        console.log(error);
      });
  });