import { animationDuration, wait } from "../helpers/animationHelper.js";
import { getTranslation } from "../helpers/languageHelper.js";
import { toTitleCase } from "../helpers/stringHelpers.js";
import {
	getTempIconURL,
	getWeatherIconURL,
} from "../helpers/weatherIconHelper.js";

export async function updateWeatherResult(weatherData) {
	const resultContainer = document.getElementById("weatherResult");

	if (!resultContainer.classList.contains("faded-out")) {
		resultContainer.classList.add("faded-out");
		await wait(animationDuration.fade);
	}

	const tempIcon = getTempIconURL(weatherData.temperature);
	const weatherIcon = getWeatherIconURL(weatherData.weatherId);

	resultContainer.innerHTML = `
            <div class="text-lg font-quicksand font-semibold" id="cityName">${
							weatherData.city
						}</div>
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
                    ${getTranslation("wind")}: ${weatherData.windSpeed} m/s
                </div>
            </div>`;

	await wait(animationDuration.fade);
	resultContainer.classList.remove("faded-out");
}
