// src/main.ts
import { getLocation, displayLocation, getCurrentWeather, displayWeatherData } from './utils';

const formElm = document.getElementById('weather-form') as HTMLFormElement;
formElm.addEventListener('submit', (e) => {
  e.preventDefault();
  const inputELm = document.getElementById('location') as HTMLInputElement;
  getLocation(inputELm.value)
    .then((response) => {
      if (response.results) {
        const location = response.results[0];
        displayLocation(location);

        return getCurrentWeather(location);
      } else {
        throw new Error('Location not found');
      }
    })
    .then((response) => {
      if (response) {
        displayWeatherData(response);
      }
    })
    .catch((err) => {
      console.log('error while getting weather data', err);
    });

  inputELm.value = '';
});
