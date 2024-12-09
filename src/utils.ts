// src/utils.ts

import axios from 'axios';
import { LocationResponse, Location, WeatherResponse } from "./types";



export function getLocation(locationName: string): Promise<LocationResponse> {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${locationName}&count=1`;
    return axios.get(url).then((response) => response.data);
}

export async function  getCurrentWeather (locationDetails:Location):Promise<WeatherResponse>{
    const url =`https://api.open-meteo.com/v1/forecast?latitude=${locationDetails.latitude}&longitude=${locationDetails.longitude}&current_weather=true&models=icon_global`

    try{
        const response = await axios.get(url)
        return response.data
    }catch(error){
        console.log(error)
        throw new Error("Failed to fetch weather data"); 

    }
}

export function displayLocation(locationDetails:Location):void{
    const locationName = document.getElementById("location-name") as HTMLElement;
    const country = document.getElementById("country") as HTMLElement;

    locationName.innerText = locationDetails.name;
    country.innerText = locationDetails.country;

}
export function displayWeatherData(obj:WeatherResponse):void{
    const temperature = document.getElementById("temperature") as HTMLElement;
    const windspeed = document.getElementById("windspeed") as HTMLElement;
    const winddirection = document.getElementById("winddirection") as HTMLElement;

    temperature.innerText =`${ obj.current_weather.temperature } ${obj.current_weather_units.temperature}`;
    windspeed.innerText = `${obj.current_weather_units.windspeed} ${obj.current_weather_units.windspeed}`
    winddirection.innerText = `${obj.current_weather.winddirection} ${obj.current_weather_units.winddirection}`
}

export function updateBackground(weatherCode:number,isDay:number):void{
    const bodyClass = document.body
    const firstCharacter = weatherCode.toString().charAt(0);
    switch (firstCharacter){
        case "0":
        case "1":{
            if(isDay===0)
                bodyClass.className = "sunny-night"
            else{
                bodyClass.className = "sunny"
            }
            break;
        }
        case "2":{
            if(isDay===0)
                bodyClass.className = "partly-cloudy-night"
            else{
                bodyClass.className = "partly-cloudy"
            }
            break;
        }
        case "3":{
            bodyClass.className = "cloudy"
            break;

        }
        case "4":{
            bodyClass.className = "foggy"
            break;

        }
        case "5":{
            bodyClass.className = "drizzle"
            break;

        }
        case "6":{
            bodyClass.className = "rain"
            break;

        }
        case "7":{
            bodyClass.className = "snow"
            break;

        } 
        case "8":{
            bodyClass.className = "showers"
            break;

        } 
        case "9":{
            bodyClass.className = "thunderstorm"
            ;
        }
       
    }
}



