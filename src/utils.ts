// src/utils.ts

import axios from 'axios';
import { LocationResponse, Location, WeatherResponse } from "./types";



export function getLocation(locationName: string): Promise<LocationResponse> {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${locationName}&count=1`;
    console.log(axios.get(url).then((response) => response.data))
    return axios.get(url).then((response) => response.data);
}

export const getCurrentWeather = async (locationDetails: Location): Promise<WeatherResponse>  => {
try {
    const response = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${locationDetails.latitude}&longitude=${locationDetails.longitude}&current_weather=true&models=icon_global`)
    console.log(response)
    return response.data;
} catch(err) {
    console.error(err);
    throw err;
}
}

export function displayLocation(locationDetails: Location) {
  // display location name
  const locationNameElm = document.getElementById('location-name') as HTMLElement;
  locationNameElm.innerText = "" + locationDetails.name;

  // display country
  const countryElm = document.getElementById('country') as HTMLElement;
  countryElm.innerText = "(" + locationDetails.country + ")";
}


// src/utils.ts
// ...

export function displayWeatherData(obj: WeatherResponse): void {
     // display temperature  
     const temperatureElm = document.getElementById('temperature') as HTMLElement;
     const temperature = obj.current_weather.temperature;
     const temperatureUnits = obj.current_weather_units.temperature;
     temperatureElm.innerText = `Temperature: ${temperature} ${temperatureUnits}`;
     
     // display wind speed
     const windspeedElm = document.getElementById('windspeed') as HTMLElement;
     const windspeed = obj.current_weather.windspeed;
     const windspeedUnits = obj.current_weather_units.windspeed;
     windspeedElm.innerText = `Wind Speed: ${windspeed} ${windspeedUnits}`;
 
     // display wind direction
     const winddirectionElm = document.getElementById('winddirection') as HTMLElement;
     const winddirection = obj.current_weather.winddirection;
     const winddirectionUnits = obj.current_weather_units.winddirection;
     winddirectionElm.innerText = `Wind Direction: ${winddirection} ${winddirectionUnits}`;
  }

