import { getCityCoordinates } from "./geocoding.js";

export async function getWeatherInfo(city) {
	const coordinates = await getCityCoordinates(city);

	try {
		const resp = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&appid=e967d8d356aa5220e28bc7e8ba35f936`,
		);

		if (!resp.ok) {
			throw new Error("Network response was not ok");
		}

		const data = await resp.json();
		const relevantData = {
			city: coordinates.city,
			weatherDescription: data.weather[0].description,
			weatherId: data.weather[0].id,
			temperature: Math.round(data.main.temp),
			feelsLike: Math.round(data.main.feels_like),
		};
		return relevantData;
	} catch (error) {
		alert("Error fetching weather data");
		console.error("Error fetching weather data:", error);
	}
}
