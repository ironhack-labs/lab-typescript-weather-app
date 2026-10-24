// src/main.ts

import { getLocation, getCurrentWeather, displayLocation, displayWeatherData, updateBackground } from './utils';

const form = document.getElementById("weather-form") as HTMLFormElement;

form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the page from reloading

    const locationInput = document.getElementById("location") as HTMLInputElement;
    const locationName = locationInput.value;
    locationInput.value = ""; // Clear the form

    console.log(`The user has submitted the form and is searching for a location with this name... ${locationName}`);

    getLocation(locationName)
        .then((response) => {
            if (response.results) {
                // The API may return several matches; use the first one
                const location = response.results[0];
                displayLocation(location);
                return getCurrentWeather(location);
            } else {
                throw new Error('Location not found');
            }
        })
        .then((weatherData) => {
            displayWeatherData(weatherData);
            updateBackground(weatherData.current_weather.weathercode, weatherData.current_weather.is_day);
        })
        .catch((error) => {
            console.log("Error getting weather data");
            console.log(error);
        });
});
