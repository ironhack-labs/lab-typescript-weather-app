// src/main.ts
import { getLocation, getCurrentWeather, displayLocation, displayWeatherData } from './utils'

const weatherForm = document.querySelector('#weather-form') as HTMLElement

weatherForm.addEventListener('submit', (e: Event) => {
    e.preventDefault()

    const locationInput = document.querySelector('#location') as HTMLInputElement

    console.log(`The user has submitted the form 
        and is searching for a location with this name ${locationInput.value}`)


    getLocation(locationInput.value)
        .then((response) => {
            if (response.results) {
                const location = response.results[0]

                displayLocation(location)

                return getCurrentWeather(location)
            } else {
                throw new Error('Location not found')
            }
        })
        .then((weatherData) => {
            displayWeatherData(weatherData)

        })
        .catch((error) => {
            console.log("Error getting weather data")
            console.log(error)
        });
    locationInput.value = ''
})