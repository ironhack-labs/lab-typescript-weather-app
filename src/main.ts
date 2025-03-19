// src/main.ts

import { displayLocation, displayWeatherData, getCurrentWeather, getLocation, updateBackground } from "./utils";

const form = document.getElementById("weather-form") as HTMLElement;

form.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log("The user has submitted the form");

    const locationInput = document.getElementById("location") as HTMLInputElement;
    const locationName = locationInput.value;
    locationInput.value = "";

    getLocation(locationName)
        .then((response) => {
            if (response.results) {
                console.log(response.results);

                const location = response.results[0];
                displayLocation(location);
                return getCurrentWeather(location);
            } else {
                throw new Error("Location not found");
            }
        })
        .then((weatherData) => {
            console.log(weatherData);

            displayWeatherData(weatherData)
            updateBackground(weatherData.current_weather.weathercode, weatherData.current_weather.is_day);
        })
        .catch((error) => {
            console.log("Error getting the weather data");
            console.log(error)

        })


})

