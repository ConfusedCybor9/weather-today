import {
	activateFadeInAnimation,
	activateFadeOutAnimation,
} from "../helpers/animationHelper.js";
import {
	getTranslation,
	translateCityName,
} from "../helpers/languageHelper.js";
import { toTitleCase } from "../helpers/stringHelpers.js";
import {
	getTempIconURL,
	getWeatherIconURL,
} from "../helpers/weatherIconHelper.js";

function generateWeatherResultHTML(weatherData) {
	const tempIcon = getTempIconURL(weatherData.temperature);
	const weatherIcon = getWeatherIconURL(weatherData.weatherId);
	const translatedCityName = translateCityName(weatherData.city);

	return `
		<div class="text-lg font-quicksand font-semibold" id="cityName">${translatedCityName}</div>
		<div class="icon icon-lg" style="background-image: url('${weatherIcon}');"></div>
		<div class="text-md font-quicksand font-semibold" id="weatherDescription">${toTitleCase(
			weatherData.weatherDescription,
		)}</div>
		<div class="weather-result-temperature text-xl font-nunito font-bold" id="temperature">
			${weatherData.temperature}°C
			<div class="icon icon-md" style="background-image: url('${tempIcon}');"></div>
		</div>
		<div class="text-sm font-nunito" id="feelsLike">${getTranslation(
			"feelsLike",
		)} ${weatherData.feelsLike}°C</div>
		<div class="weather-result-details text-sm font-nunito">
			<div class="weather-result-detail">
				${getTranslation("humidity")}: ${weatherData.humidity}%
			</div>
			<div class="weather-result-detail">
				${getTranslation("wind")}: ${weatherData.windSpeed} ${getTranslation(
					"windSpeedUnit",
				)}
			</div>
		</div>`;
}

export async function updateWeatherResult(weatherData) {
	const resultContainer = document.getElementById("weatherResult");
	if (!resultContainer) {
		console.warn("Weather result container not found");
		return;
	}

	await activateFadeOutAnimation(resultContainer);
	resultContainer.innerHTML = generateWeatherResultHTML(weatherData);
	await activateFadeInAnimation(resultContainer);
}

export { generateWeatherResultHTML };
