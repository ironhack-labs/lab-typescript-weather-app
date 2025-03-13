// src/main.ts
import { getLocation,getCurrentWeather, displayLocation, displayWeatherData, updateBackground } from "./utils";

const form = document.getElementById('weather-form') as HTMLFormElement;
form.addEventListener('submit', (event) => {
    event.preventDefault();

    const locationInput = document.getElementById('location') as HTMLInputElement;
    const locationName = locationInput.value;

    console.log(`The User has submitted the form and is seaching for a location with this name... ${locationName}`)
    locationInput.value = "";

    getLocation(locationName)
    .then((response) => {
        if(response.results) {
            const location = response.results[0];

            displayLocation(location);

            return getCurrentWeather(location);

        } else {
            throw new Error('Location not found');
        }
    })
    .then((weatherData) => {
        displayWeatherData(weatherData);
        updateBackground(weatherData.current_weather.weathercode, weatherData.current_weather.is_day)
    })
    .catch((err) => {
        console.log("Error getting weather data")
        console.log(err)
    })
})