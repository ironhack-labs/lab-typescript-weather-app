// src/main.ts

import { getLocation, getCurrentWeather, displayLocation, displayWeatherData, updateBackground } from "./utils";

const form = document.getElementById("weather-form") as HTMLFormElement;

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const locationInput = document.getElementById("location") as HTMLInputElement;
    const locationName = locationInput.value.trim();

    if (!locationName) return;

    console.log(`The user has submitted the form and is searching for a location with this name: ${locationName}`);

    try {
        const locationResponse = await getLocation(locationName);

        if (!locationResponse.results || locationResponse.results.length === 0) return;

        const locationDetails = locationResponse.results[0];

        displayLocation(locationDetails);

        const weatherData = await getCurrentWeather(locationDetails);

        displayWeatherData(weatherData);

        updateBackground(weatherData.current_weather.weathercode, weatherData.current_weather.is_day);
    } catch (error) {
        console.error("Error fetching location or weather data:", error);
    }

    locationInput.value = "";
});


