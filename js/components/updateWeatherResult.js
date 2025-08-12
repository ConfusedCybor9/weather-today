import { toTitleCase } from "../helpers/stringHelpers.js";
import { getTempIconURL } from "../helpers/weatherIconHelper.js";
import { getWeatherIconURL } from "../helpers/weatherIconHelper.js";

export async function updateWeatherResult(weatherData) {
	const resultContainer = document.getElementById("weatherResult");

	if (!resultContainer.classList.contains("faded-out")) {
		resultContainer.classList.add("faded-out");
		await new Promise((resolve) => setTimeout(resolve, 500));
	}

	const tempIcon = getTempIconURL(weatherData.temperature);
	const weatherIcon = getWeatherIconURL(weatherData.weatherId);

	resultContainer.innerHTML = `
            <div class="text-lg font-quicksand font-semibold" id="cityName">${weatherData.city}</div>
            <div class="icon icon-lg" style="background-image: url('${weatherIcon}');"></div>
            <div class="text-md font-quicksand font-semibold" id="weatherDescription">${toTitleCase(weatherData.weatherDescription)}</div>
            <div class="weather-result-temperature text-xl font-nunito font-bold" id="temperature">${weatherData.temperature}°C<div class="icon icon-md" style="background-image: url('${tempIcon}');"></div></div>
            <div class="text-sm font-nunito" id="feelsLike">Feels like ${weatherData.feelsLike}°C</div>`;

	await new Promise((resolve) => setTimeout(resolve, 500));
	resultContainer.classList.remove("faded-out");
}
