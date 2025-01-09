// src/utils.ts

import axios from 'axios'
import { LocationResponse, Location, WeatherResponse } from './types'

export function getLocation(locationName: string): Promise<LocationResponse> {
	const url = `https://geocoding-api.open-meteo.com/v1/search?name=${locationName}&count=1`
	return axios.get(url).then((response) => {
		return response.data
	})
}

export async function getCurrentWeather(
	locationDetails: Location
): Promise<WeatherResponse> {
	const url = `https://api.open-meteo.com/v1/forecast?latitude=${locationDetails.latitude}&longitude=${locationDetails.longitude}&current_weather=true&models=icon_global`
	const response = await fetch(url)
	const data = await response.json()
	console.log(data)

	return data
	// return axios.get(url).then((response) => response.data)
}
// export function getCurrentWeather(
// 	locationDetails: Location
// ): Promise<WeatherResponse> {
// 	const url = `https://api.open-meteo.com/v1/forecast?latitude=${locationDetails.latitude}&longitude=${locationDetails.longitude}&current_weather=true&models=icon_global`
// 	return axios.get(url).then((response) => response.data)
// }

export function displayLocation(locationDetails: Location): void {
	const loc = document.getElementById('location-name') as HTMLElement
	const coun = document.getElementById('country') as HTMLElement
	loc.innerText = locationDetails.name
	coun.innerText = locationDetails.country
}

export function displayWeatherData(obj: WeatherResponse): void {
	const tempe = document.getElementById('temperature') as HTMLElement
	const wind = document.getElementById('windspeed') as HTMLElement
	const windDir = document.getElementById('winddirection') as HTMLElement
	tempe.innerText = `Temperature: ${obj.current_weather.temperature} ${obj.current_weather_units.temperature}`
	wind.innerText = `Wind Speed: ${obj.current_weather.windspeed} ${obj.current_weather_units.windspeed}`
	windDir.innerText = `Wind Direction: ${obj.current_weather.winddirection} ${obj.current_weather_units.winddirection}`
}

export function updateBackground(weatherCode: number, isDay: number): void {
	const body = document.getElementsByTagName('body')[0] as HTMLElement

	if (weatherCode === 0 || weatherCode === 1) {
		if (isDay === 0) {
			body.classList.add('sunny-night')
		} else {
			body.classList.add('sunny')
		}
	} else if (weatherCode === 2) {
		if (isDay === 0) {
			body.classList.add('partly-cloudy-night')
		} else {
			body.classList.add('partly-cloudy')
		}
	} else if (weatherCode === 3) {
		if (isDay === 0 || isDay === 1) {
			body.classList.add('cloudy')
		}
	} else if (weatherCode === 4) {
		if (isDay === 0 || isDay === 1) {
			body.classList.add('foggy')
		}
	} else if (weatherCode === 5) {
		if (isDay === 0 || isDay === 1) {
			body.classList.add('drizzle')
		}
	} else if (weatherCode === 6) {
		if (isDay === 0 || isDay === 1) {
			body.classList.add('rain')
		}
	} else if (weatherCode === 7) {
		if (isDay === 0 || isDay === 1) {
			body.classList.add('snow')
		}
	} else if (weatherCode === 8) {
		if (isDay === 0 || isDay === 1) {
			body.classList.add('showers')
		}
	} else if (weatherCode === 9) {
		if (isDay === 0 || isDay === 1) {
			body.classList.add('thunderstorm')
		}
	}
}
