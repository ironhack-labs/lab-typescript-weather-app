// src/main.ts

import {
	getLocation,
	getCurrentWeather,
	displayLocation,
	displayWeatherData,
	updateBackground,
} from './utils.ts'

const form = document.getElementById("weather-form") as HTMLFormElement;


form.addEventListener('submit', (e) => {
	e.preventDefault()
	let inputVal = document.getElementById('location') as HTMLInputElement
	let inputName: string = inputVal.value
	getLocation(inputName)
		.then((res) => {
			if (res.results) {
				let place = res.results[0]
				displayLocation(place)
				return getCurrentWeather(place)
			} else {
				throw new Error('Place not Found!')
			}
		})
		.then((res) => {
			if (res) {
				let is_day: number = res.current_weather.is_day
				let weatherCode: number = Math.floor(
					res.current_weather.weathercode / 10
				)
				displayWeatherData(res)
				updateBackground(weatherCode, is_day)
			} else {
				throw new Error('Something went wrong! Try again later!')
			}
		})
		.catch((err) => {
			console.log(err)
		})

	console.log(`The user has submitted the form ${inputName}`)
	inputVal.value = ''
})
