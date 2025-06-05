import axios from 'axios';
import { LocationResponse, Location, WeatherResponse } from "./types";

export function getLocation(locationName: string): Promise<LocationResponse> {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${locationName}&count=1`;
    return axios.get(url).then((response) => response.data);
}

export function getCurrentWeather(locationDetails: Location): Promise<WeatherResponse> {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${locationDetails.latitude}&longitude=${locationDetails.longitude}&current_weather=true&models=icon_global`;
    return axios.get(url).then((response) => response.data);
}

export function displayLocation(locationDetails: Location): void {
    const locationNameElement = document.getElementById('location-name');
    const countryElement = document.getElementById('country');
    
    console.log('Displaying location:', locationDetails);
    
    if (locationNameElement) {
        locationNameElement.textContent = locationDetails.name;
        console.log('Set location name to:', locationDetails.name);
    } else {
        console.error('Element with id "location-name" not found');
    }
    
    if (countryElement) {
        countryElement.textContent = locationDetails.country;
        console.log('Set country to:', locationDetails.country);
    } else {
        console.error('Element with id "country" not found');
    }
}

export function displayWeatherData(obj: WeatherResponse): void {
    const temperatureElement = document.getElementById('temperature');
    const windspeedElement = document.getElementById('windspeed');
    const winddirectionElement = document.getElementById('winddirection');
    
    console.log('Displaying weather data:', obj);
    
    if (temperatureElement && obj.current_weather) {
        temperatureElement.textContent = `${obj.current_weather.temperature} °C`;
        console.log('Set temperature to:', `${obj.current_weather.temperature} °C`);
    } else {
        console.error('Temperature element not found or weather data missing');
    }
    
    if (windspeedElement && obj.current_weather) {
        windspeedElement.textContent = `${obj.current_weather.windspeed} km/h`;
        console.log('Set windspeed to:', `${obj.current_weather.windspeed} km/h`);
    } else {
        console.error('Windspeed element not found or weather data missing');
    }
    
    if (winddirectionElement && obj.current_weather) {
        winddirectionElement.textContent = `${obj.current_weather.winddirection} °`;
        console.log('Set wind direction to:', `${obj.current_weather.winddirection} °`);
    } else {
        console.error('Wind direction element not found or weather data missing');
    }
}

export function updateBackground(weatherCode: number, isDay: number): void {
    const body = document.body;
    
    body.className = body.className.replace(/\b(sunny|sunny-night|partly-cloudy|partly-cloudy-night|cloudy|foggy|drizzle|rain|snow|showers|thunderstorm)\b/g, '').trim();
    
    const firstDigit = Math.floor(weatherCode / 10);
    
    let className = '';
    
    switch (firstDigit) {
        case 0:
        case 1:
            className = isDay === 0 ? 'sunny-night' : 'sunny';
            break;
        case 2:
            className = isDay === 0 ? 'partly-cloudy-night' : 'partly-cloudy';
            break;
        case 3:
            className = 'cloudy';
            break;
        case 4:
            className = 'foggy';
            break;
        case 5:
            className = 'drizzle';
            break;
        case 6:
            className = 'rain';
            break;
        case 7:
            className = 'snow';
            break;
        case 8:
            className = 'showers';
            break;
        case 9:
            className = 'thunderstorm';
            break;
        default:
            className = 'sunny'; 
    }
    
    body.className = (body.className + ' ' + className).trim();
}