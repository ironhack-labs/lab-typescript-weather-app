// src/main.ts

/*

In this step, we will add an event listener to detect when the user submits the form.

In src/main.ts, create the code to do the following:

Add an event listener to detect if the user submits the form (note: the form has the id weather-form).
Inside the code for that event listener, invoke the method event.preventDefault(), so that the page does not reload when the user submits the form.
Also inside the event listener, do a console.log() with the message "The user has submitted the form".

*/

// const form = document.getElementById("weather-form") as HTMLFormElement

/*
form.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent the default form submission behavior
  console.log("The user has submitted the form");
});
*/

/*
    Next, modify the event listener you created in the previous step so that, when the user submits, you display 
    in the console the name of the location that they have entered (example: "The user has submitted the form and 
    is searching for a location with this name... [Berlin]").
*/

/*
form.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent the default form submission behavior

  const locationInput = document.getElementById("location") as HTMLInputElement;
  const locationName = locationInput.value;
  
  console.log(`The user has submitted the form and is searching for a location with this name... ${locationName} `);

  locationInput.value = ""; // Clear the form
})
*/

/*
    Now, you will need to put all the pieces together! Modify the code in 
    src/main.ts so that, when the user submits the form, we display info about the location and the current weather.

    You will need to do the following:

    When the user submits, invoke the function getLocation() to get the details of the desired location from the API. This function returns a promise, so you can handle the response with .then().catch().
    Once you have the response from the API (i.e., inside the .then()), use the first result (the API returns an array, so you can get the element with index zero) and invoke the functions displayLocation() (to display those details in the UI) and getCurrentWeather() (to get the current weather for that location).
    Once you have the info about the current weather, invoke the function displayWeatherData()
    These steps are more complex and we're putting many pieces together. Remember that you can add a console.log() to see what data you have (for example, you can add a console.log() to see what data you get from the API) 
*/

// src/main.ts

import { getLocation, getCurrentWeather, displayLocation, displayWeatherData, updateBackground } from './utils.ts';

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

      // Update background
      updateBackground(weatherData.current_weather.weathercode, weatherData.current_weather.is_day)
      
    })
    .catch((error) => {
      console.log("Error getting weather data");
      console.log(error);
    });

});

