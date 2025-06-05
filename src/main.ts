import { getLocation, getCurrentWeather, displayLocation, displayWeatherData, updateBackground } from './utils';

const weatherForm = document.getElementById('weather-form') as HTMLFormElement;

if (weatherForm) {
    weatherForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        console.log('The user has submitted the form');
        
        let locationInput = document.querySelector('input[name="location"]') as HTMLInputElement;
        if (!locationInput) {
            locationInput = document.querySelector('#location') as HTMLInputElement;
        }
        if (!locationInput) {
            locationInput = document.querySelector('input[type="text"]') as HTMLInputElement;
        }
        
        const locationName = locationInput?.value?.trim();
        
        if (!locationName) {
            console.log('No location name provided');
            alert('Please enter a location name');
            return;
        }
        
        console.log(`The user has submitted the form and is searching for a location with this name... [${locationName}]`);
        
        try {
            console.log('Fetching location details...');
            const locationResponse = await getLocation(locationName);
            console.log('Location response:', locationResponse);
            
            if (!locationResponse.results || locationResponse.results.length === 0) {
                console.log('No location found');
                alert('Location not found. Please try a different location.');
                return;
            }
            
            const locationDetails = locationResponse.results[0];
            console.log('Location details:', locationDetails);
            
            displayLocation(locationDetails);
            
            console.log('Fetching weather data...');
            const weatherData = await getCurrentWeather(locationDetails);
            console.log('Weather data:', weatherData);
            
            displayWeatherData(weatherData);
            
            if (weatherData.current_weather) {
                updateBackground(weatherData.current_weather.weathercode, weatherData.current_weather.is_day);
            }
            
        } catch (error) {
            console.error('Error fetching weather data:', error);
            alert('Error fetching weather data. Please try again.');
        }
    });
} else {
    console.error('Weather form not found! Make sure the form has id="weather-form"');
}