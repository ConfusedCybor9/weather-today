import { getCurrentLanguage } from "../helpers/languageHelper.js";
import { getCityCoordinates } from "./geocoding.js";

export async function getWeatherInfo(city) {
	try {
		const coordinates = await getCityCoordinates(city);
		const language = getCurrentLanguage();

		const resp = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&lang=${language}&appid=e967d8d356aa5220e28bc7e8ba35f936`,
		);

		if (!resp.ok) {
			throw new Error("Could not fetch weather data");
		}

		const data = await resp.json();
		const relevantData = {
			city: coordinates.city,
			weatherDescription: data.weather[0].description,
			weatherId: data.weather[0].id,
			temperature: Math.round(data.main.temp),
			feelsLike: Math.round(data.main.feels_like),
			humidity: data.main.humidity,
			windSpeed: data.wind?.speed != null ? Math.round(data.wind.speed) : 0,
		};
		return relevantData;
	} catch (error) {
		console.error("Error fetching weather data:", error);
		throw new Error("Could not get weather information for this city");
	}
}
