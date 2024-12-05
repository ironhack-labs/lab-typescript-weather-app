// src/main.ts

import { getLocation, getCurrentWeather, displayLocation, displayWeatherData } from "./utils";

const form = document.getElementById('weather-form') as HTMLFormElement;

form.addEventListener('submit', (event) => {
    event?.preventDefault();

    const locationEntered = document.getElementById('location') as HTMLInputElement;
    locationEntered.value = "";

    getLocation(locationName)
        .then((res) => {
            if (res.results) {
                const location = res.results[0];
                displayLocation(location);
                return getCurrentWeather(location)
            } else {
                throw new Error('Location not found');
            }
        })
        .then((weatherData) => {
            displayWeatherData(weatherData);
        })
        .catch((err) => {
            console.log("could not fetch data", err)
        })
});




