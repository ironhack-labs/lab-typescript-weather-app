// src/main.ts

import { displayLocation, displayWeatherData, getCurrentWeather, getLocation, updateBackground } from "./utils";

// src/main.ts

const weatherForm = document.getElementById("weather-form") as HTMLFormElement;

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const locationInput = document.getElementById("location") as HTMLInputElement;
    const locationName = locationInput.value;
    locationInput.value = "";

    getLocation(locationName)
        .then((response) => {
            if (!response.results) {
                throw new Error("Location not found");
            }
            const location = response.results[0];
            displayLocation(location);
            return getCurrentWeather(location);
        })
        .then((weatherData) => {
            displayWeatherData(weatherData);
            updateBackground(weatherData.current_weather.weathercode, weatherData.current_weather.is_day);
        })
        .catch((error) => {
            console.log(error);
        });
});