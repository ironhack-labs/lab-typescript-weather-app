// src/main.ts
import { getLocation, getCurrentWeather, displayLocation, displayWeatherData } from './utils.ts';

const form = document.getElementById("weather-form") as HTMLFormElement;

form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    const locationInput = document.getElementById("location") as HTMLInputElement;
    const locationName = locationInput.value;
    
    //console.log(`The user has submitted the form and is searching for a location with this name... ${locationName} `);
  
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
      updateBackground(weatherData.current_weather.weathercode, weatherData.current_weather.is_day);  
    })
    .catch((error) => {
      console.log("Error getting weather data");
      console.log(error);
    });
});

function updateBackground(weatherCode: number, isDay: number): void {
    switch(weatherCode) {
        case 0: 
        case 1:
            if(isDay === 0){
                document.body.className = "sunny-night"
            } else if(isDay === 1){
                document.body.className = "sunny"
            }
            break;
        case 2: 
        if(isDay === 0){
            document.body.className = "partly-cloudy-night"
        } else if(isDay === 1){
            document.body.className = "partly-cloudy"
        }        
            break;

        case 3:
            document.body.className = "cloudy"

            break;

        case 4:
            document.body.className = "foggy"

            break;

        case 5:
            document.body.className = "drizzle"

            break;

        case 6:
            document.body.className = "rain"

            break;

        case 7:
            document.body.className = "snow"

            break;

        case 8:
            document.body.className = "showers"

            break;

        case 9:
            document.body.className = "thunderstorm"

            break;

    }
}