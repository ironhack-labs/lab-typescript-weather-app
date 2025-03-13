import {
  getLocation,
  getCurrentWeather,
  displayLocation,
  displayWeatherData,
} from './utils';


const formElm = document.getElementById('weather-form') as HTMLElement;

formElm.addEventListener('submit', (e) => {
  e.preventDefault();
  const locationInput = document.getElementById('location') as HTMLInputElement;
  const locationName = locationInput.value;

  console.log(
    `The user has submitted the form and is searching for a location with this name${locationName}`,
  );

  getLocation(locationName)
    .then((locationResponse) => {
      if (locationResponse.results && locationResponse.results.length > 0) {
        const location = locationResponse.results[0]; // Get first location from results
        displayLocation(location);
        return getCurrentWeather(location); // Return this promise for chaining
      } else {
        throw new Error('No location found');
      }
    })
    .then((weatherData) => {
      // Now we can use the weather data
      displayWeatherData(weatherData);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
});
