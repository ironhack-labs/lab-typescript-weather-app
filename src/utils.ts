// src/utils.ts

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

export function displayLocation(locationDetails: Location): void{
   const h2Tag = document.getElementById("location-name") as HTMLHeadingElement|null
   if(h2Tag) h2Tag.innerText=`City: ${locationDetails.name} `
   const h3Tag = document.getElementById("country") as HTMLHeadingElement|null
   if(h3Tag) h3Tag.innerText=`Country: ${locationDetails.country} `
} 

export function displayWeatherData(obj: WeatherResponse): void {

    const pTag1 = document.getElementById("temperature") as HTMLElement|null
    if(pTag1) pTag1.innerText=`temperature: ${obj.current_weather.temperature} ${obj.current_weather_units.temperature} `
    const pTag2 = document.getElementById("windspeed") as HTMLElement|null
    if(pTag2) pTag2.innerText=`windspeed: ${obj.current_weather.windspeed} ${obj.current_weather_units.windspeed} `
    const pTag3 = document.getElementById("winddirection") as HTMLElement|null
    if(pTag3) pTag3.innerText=`winddirection: ${obj.current_weather.winddirection} ${obj.current_weather_units.winddirection} `
    const pTag4 = document.getElementById("is_day") as HTMLElement|null
    if(pTag4) pTag4.innerText=`is_day: ${obj.current_weather.is_day} ${obj.current_weather_units.is_day} `
    const pTag5 = document.getElementById("weathercode") as HTMLElement|null
    if(pTag5) pTag5.innerText=`weathercode: ${obj.current_weather.weathercode} ${obj.current_weather_units.weathercode} `
}

/* export function updateBackground(weatherCode:number, isDay:number){
    switch (`${weatherCode}` ) {
        case "0":
        case "1":
            if(isDay===0){
                 document.body.classList.add("sunny-night")
            }else{
                document.body.classList.add("sunny")
            }
            break;
        case '2':
            if(isDay===0){
                 document.body.classList.add("partly-cloudy-night")
            }else{
                document.body.classList.add("partly-cloudy")
            }
            break;
        case '3':
            document.body.classList.add("cloudy")  
            break;
        case '4':
            document.body.classList.add("foggy")  
            break;
        case '5':
            document.body.classList.add("drizzle")  
            break;
        case '6':
            document.body.classList.add("rain")  
            break;
        case '7':
            document.body.classList.add("snow")  
            break;
        case '8':
            document.body.classList.add("showers")  
            break;
        case '9':
            document.body.classList.add("thunderstorm")  
            break;
        
        default:
            break;
    }
} */
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