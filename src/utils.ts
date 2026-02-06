import axios from 'axios';
import { LocationResponse, Location, WeatherResponse } from './types';

export function getLocation(locationName: string): Promise<LocationResponse> {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${locationName}&count=1`;
    return axios.get(url).then((response) => response.data);
}

export function getCurrentWeather(locationDetails: Location): Promise<WeatherResponse> {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${locationDetails.latitude}&longitude=${locationDetails.longitude}&current_weather=true&models=icon_global`;
    return axios.get(url).then((response) => response.data);
}

export function displayLocation(locationDetails: Location): void {
    const locationNameElm = document.getElementById('location-name') as HTMLElement;
    locationNameElm.innerText = locationDetails.name;

    const countryElm = document.getElementById('country') as HTMLElement;
    countryElm.innerText = "(" + locationDetails.country + ")";
}

export function displayWeatherData(obj: WeatherResponse): void {
    const temperatureElm = document.getElementById('temperature') as HTMLElement;
    temperatureElm.innerText = `${obj.current_weather.temperature} ${obj.current_weather_units.temperature}`;

    const windspeedElm = document.getElementById('windspeed') as HTMLElement;
    windspeedElm.innerText = `${obj.current_weather.windspeed} ${obj.current_weather_units.windspeed}`;

    const winddirectionElm = document.getElementById('winddirection') as HTMLElement;
    winddirectionElm.innerText = `${obj.current_weather.winddirection} °`;
}

export function updateBackground(weatherCode: number, isDay: number): void {
    const body = document.querySelector('body') as HTMLElement;
    const firstChar = weatherCode.toString()[0];
    
    let className = '';
    
    if (firstChar === '0' || firstChar === '1') {
        className = isDay === 0 ? 'sunny-night' : 'sunny';
    } else if (firstChar === '2') {
        className = isDay === 0 ? 'partly-cloudy-night' : 'partly-cloudy';
    } else if (firstChar === '3') {
        className = 'cloudy';
    } else if (firstChar === '4') {
        className = 'foggy';
    } else if (firstChar === '5') {
        className = 'drizzle';
    } else if (firstChar === '6') {
        className = 'rain';
    } else if (firstChar === '7') {
        className = 'snow';
    } else if (firstChar === '8') {
        className = 'showers';
    } else if (firstChar === '9') {
        className = 'thunderstorm';
    }
    
    body.className = className;
}