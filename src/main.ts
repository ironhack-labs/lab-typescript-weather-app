// src/main.ts
import {  displayLocation, getLocation, getCurrentWeather, displayWeatherData } from "./utils";
const submit = document.getElementById("weather-form") as HTMLElement;

submit.addEventListener("submit",async (e)=>{
    e.preventDefault()
    const input = document.getElementById("location") as HTMLInputElement

   try{
        const getLocationResponse = await getLocation(input.value);
        if(getLocationResponse.results){
              displayLocation(getLocationResponse?.results[0])
             const currWeather =  await getCurrentWeather(getLocationResponse.results[0])
             if(currWeather){
                displayWeatherData(currWeather)

             }
        }
       

    }catch(error){
        console.log(error)
    }

})

