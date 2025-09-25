import { LocationResponse } from "./types"
import { displayLocation, displayWeatherData, getCurrentWeather, getLocation } from "./utils"

// src/main.ts
const formNode = document.getElementById("weather-form") as HTMLFormElement

// const handleSubmit2 = (e : Event) => {
//     e.preventDefault()
//     const locationInput = document.getElementById("location") as HTMLInputElement
//     const locationName = locationInput.value
//     console.log(`The user has submitted the form and is searching for ${locationName}`)
//     getLocation(locationName)
//         .then((response) => {
//             if(response.results){
//                 const location = response.results?.[0]
//                 displayLocation(location)
//                 return getCurrentWeather(location)
//             }else{
//                 throw new Error("Location not found")
//             }
//         })
//         .then((responseWeatherApi) => {
//             displayWeatherData(responseWeatherApi)
//         })
//         .catch((error) => {
//             console.log("Error getting weather data")
//             console.log(error)
//         })
// }

const handleSubmit = async (e: Event) => {
    e.preventDefault()
    const locationInput = document.getElementById("location") as HTMLInputElement
    const locationName = locationInput.value
    console.log(`The user has submitted the form and is searching for ${locationName}`)

    let locationResponse = await getLocation(locationName)
    console.log("locations founds: ", location)
    if(locationResponse.results){
        let location = locationResponse.results[0]
        displayLocation(location)
        
        let weatherResponse = await getCurrentWeather(location)
        console.log("Weather Response: ", weatherResponse)
        displayWeatherData(weatherResponse)
    }
}

formNode.addEventListener("submit", handleSubmit)
