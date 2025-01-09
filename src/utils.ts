import axios from 'axios';
import { LocationResponse, Location , WeatherResponse } from "./types";



export function getLocation(locationName: string): Promise<LocationResponse> {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${locationName}&count=1`;
    return axios.get(url).then((response) => response.data);
}


export function getCurrentWeather(locationDetails: Location): Promise<WeatherResponse> {
    const { latitude, longitude } = locationDetails;
    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&models=icon_global`;
    return axios
        .get(apiUrl)
        .then((response) => response.data)
        .catch((error) => {
            console.error("Error fetching weather data:", error);
            throw error;
        });
}



export function displayLocation(locationDetails: Location): void {
    const { name, country } = locationDetails;
  
    const locationNameElement = document.getElementById("location-name") as HTMLElement;
    const countryElement = document.getElementById("country") as HTMLElement;
  
    
    if (locationNameElement) {
      locationNameElement.textContent = `Location: ${name}`;
    } 
  
    
    if (countryElement) {
      countryElement.textContent = `Country: ${country}`;
    } 
  }



  export function displayWeatherData(obj: WeatherResponse): void {
    const { current_weather, current_weather_units } = obj;
    const { temperature, windspeed, winddirection, is_day, weathercode } = current_weather;
    const {
      temperature: temperatureUnit,
      windspeed: windspeedUnit,
      winddirection: winddirectionUnit,
      is_day: isDayUnit,
      weathercode: weathercodeUnit,
    } = current_weather_units;
  

    const temperatureElement = document.getElementById("temperature");
    const windspeedElement = document.getElementById("windspeed");
    const winddirectionElement = document.getElementById("winddirection");
    const isDayElement = document.getElementById("is_day");
    const weathercodeElement = document.getElementById("weathercode");
  

    if (temperatureElement) {
      temperatureElement.textContent = `Temperature: ${temperature} ${temperatureUnit}`;
    } 
    
    if (windspeedElement) {
      windspeedElement.textContent = `Wind Speed: ${windspeed} ${windspeedUnit}`;
    } 
    
    if (winddirectionElement) {
      winddirectionElement.textContent = `Wind Direction: ${winddirection} ${winddirectionUnit}`;
    }
    
    if (isDayElement) {
      isDayElement.textContent = `Is Day: ${is_day === 1 ? "Yes" : "No"} ${isDayUnit}`;
    } 
    
    if (weathercodeElement) {
      weathercodeElement.textContent = `Weather Code: ${weathercode} (${weathercodeUnit})`;
    } 
  }



export function updateBackground(weatherCode: number, isDay: number): void {
  
  const weatherCategory = Math.floor(weatherCode / 10);

  let className = "";

  switch (weatherCategory) {
    case 0:
    case 1:
      className = isDay === 0 ? "sunny-night" : "sunny";
      break;
    case 2:
      className = isDay === 0 ? "partly-cloudy-night" : "partly-cloudy";
      break;
    case 3:
      className = "cloudy";
      break;
    case 4:
      className = "foggy";
      break;
    case 5:
      className = "drizzle";
      break;
    case 6:
      className = "rain";
      break;
    case 7:
      className = "snow";
      break;
    case 8:
      className = "showers";
      break;
    case 9:
      className = "thunderstorm";
      break;
    default:
      className = "";
  }

  document.body.classList.add(className);
}

