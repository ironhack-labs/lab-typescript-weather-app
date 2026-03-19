// src/main.ts

import {getLocation, getCurrentWeather, displayLocation, displayWeatherData, updateBackground} from './utils'


const form = document.getElementById("weather-form") as HTMLFormElement;

form.addEventListener('submit', async (event:Event) => {
  event.preventDefault(); // Prevent the default form submission behavior
  const locationInput = document.getElementById('location') as HTMLInputElement;;
  const locationValue = locationInput.value
  if(!locationValue) return
  try {
     const locationApi = await getLocation(locationValue)
     const locations = locationApi.results || []
     if(locations.length===0){
        console.log('no location found')
        return;
     }
     const location = locations[0]
     displayLocation(location)
     const currWeather = await getCurrentWeather(location)
     displayWeatherData(currWeather)
     updateBackground(currWeather.current_weather.weathercode, currWeather.current_weather.is_day)
   }catch (error) {
     console.log("Error getting weather data");
     console.log(error);
  }
  finally
  {
    locationInput.value = "";
  }
 
});

/* const formClicked = document.getElementById("weather-form");
formClicked?.addEventListener('submit',(event)=>{
    event.preventDefault()
    displayLocation(tunis)
    displayWeatherData(tunisWeather)
}) */

