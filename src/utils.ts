// src/utils.ts

import axios from 'axios';

import { LocationResponse, Location, WeatherResponse } from "./types.ts";



export function getLocation(locationName: string): Promise<LocationResponse> {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${locationName}&count=1`;
    return axios.get(url).then((response) => response.data);
}


/*
Next, you will implement the logic of the function getCurrentWeather(). Your function needs to do the following:

Send the API Request:
Use axios to send a GET request to this URL: https://api.open-meteo.com/v1/forecast?latitude=${locationDetails.latitude}&longitude=${locationDetails.longitude}&current_weather=true&models=icon_global 
(where locationDetails.latitude and locationDetails.longitude are the coordinates that we get from the argument locationDetails).
Handle the Response:
Return a promise that resolves with the data from the API response.
Note: you can use the .then() method to extract the data property from the response object.
*/

export function getCurrentWeather(locationDetails: Location): Promise<WeatherResponse> {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${locationDetails.latitude}&longitude=${locationDetails.longitude}&current_weather=true&models=icon_global`;
    
    // return a promise that resolves to the type `WeatherResponse`
    return axios.get(url).then((response) => response.data);
}

/*
    In the HTML element with the id location-name, you should display the name of the location.
    In the HTML element with the id country, you should display the country.
*/
export function displayLocation(locationDetails: Location) {
    // ...
    /*
        const myCoolHtmlElm = document.getElementById('my-cool-id') as HTMLElement;
        myCoolHtmlElm.innerText = "Hello World";
    */

        const locationNameElm = document.getElementById('location-name') as HTMLElement;
        locationNameElm.innerText = "" + locationDetails.name;

        const countryElm = document.getElementById('country') as HTMLElement;
        countryElm.innerText = "(" + locationDetails.country + ")";

}

export function displayWeatherData(obj: WeatherResponse) {
    // ...
    /*
    Next, implement the logic for the function displayWeatherData(). This function should do some DOM manipulation to display in the user interface the info about the weather. In particular, it should do the following:

        In the HTML element with the id temperature, you should display the temperature, including the units (e.g. 20.6 °C).
        In the HTML element with the id windspeed, you should display the wind speed (e.g. 3.4 km/h).
        In the HTML element with the id winddirection, you should display the wind direction (e.g. 32 °).
    */

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

  // src/utils.ts
  // ...

  export function updateBackground(weatherCode: number, isDay: number) {

      const firstCharacter = weatherCode.toString().charAt(0);

      switch(firstCharacter){
          case "0":
          case "1":
              if(isDay === 0){
                  document.body.className = "sunny-night";
              } else {
                  document.body.className = "sunny";
              }
              break;
          case "2":
              if(isDay === 0){
                  document.body.className = "partly-cloudy-night";
              } else {
                  document.body.className = "partly-cloudy";
              }
              break;
          case "3":
              document.body.className = "cloudy";
              break;
          case "4":
              document.body.className = "foggy";
              break;
          case "5":
              document.body.className = "drizzle";
              break;
          case "6":
              document.body.className = "rain";
              break;
          case "7":
              document.body.className = "snow";
              break;
          case "8":
              document.body.className = "showers";
              break;
          case "9":
              document.body.className = "thunderstorm";
              break;
          default:
              document.body.className = "";
              break;
      }
  }
