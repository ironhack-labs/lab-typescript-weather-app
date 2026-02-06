
import { getLocation, getCurrentWeather, displayLocation, displayWeatherData, updateBackground } from './utils';

const form = document.getElementById('weather-form') as HTMLFormElement;

form.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const input = document.getElementById('location-input') as HTMLInputElement;
    const locationName = input.value;
    
    getLocation(locationName)
        .then((locationResponse) => {
            const locationDetails = locationResponse.results[0];
            displayLocation(locationDetails);
            return getCurrentWeather(locationDetails);
        })
        .then((weatherData) => {
            displayWeatherData(weatherData);
            updateBackground(weatherData.current_weather.weathercode, weatherData.current_weather.is_day);
        });
});