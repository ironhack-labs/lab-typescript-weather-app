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



