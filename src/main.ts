import { displayLocation, displayWeatherDate, getCurrentWeather, getLocation, updatedBackground } from "./utils"

// src/main.ts
const formElm = document.getElementById('weather-form') as HTMLElement
formElm.addEventListener('submit', (e) => {
    e.preventDefault()

    const locationInput = document.getElementById('location') as HTMLInputElement
    const locationName = locationInput.value
    locationInput.value = ""

    getLocation(locationName).then((response) => {
        if(response.results) {
            const location = response.results[0]
            displayLocation(location)

            return getCurrentWeather(location)
        }else {
            throw new Error('Location not found')
        }
    }).then((weatherData) => {
        displayWeatherDate(weatherData)
        updatedBackground(weatherData.current_weather.weathercode, weatherData.current_weather.is_day)
    }).catch((error) => {
        console.log("Error getting weather data")
        console.log(error)
    }) 
})