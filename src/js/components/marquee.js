import { getWeatherInfo } from "../api/weather.js";
import { activateFadeInAnimation } from "../helpers/animationHelper.js";
import { translateCityName } from "../helpers/languageHelper.js";
import { getWeatherIconURL } from "../helpers/weatherIconHelper.js";
import { updateWeatherResult } from "./updateWeatherResult.js";

async function generateMarqueeCard(city) {
	const weatherData = await getWeatherInfo(city);
	const icon = getWeatherIconURL(weatherData.weatherId);
	const translatedCityName = translateCityName(weatherData.city);

	return `
		<div class="marquee-card" data-city="${city}">
			<div class="text-sm font-nunito font-bold">${translatedCityName}</div>
			<div class="icon icon-sm" style="background-image: url('${icon}');"></div>
			<div class="text-xs font-nunito font-semibold">${weatherData.temperature}°C</div>
		</div>
	`;
}

export async function createMarquee(cities) {
	const marquee = document.getElementById("marquee");
	const marqueeContent = document.getElementById("marqueeContent");
	const marqueeContent2 = document.getElementById("marqueeContent2");

	const cityPromises = cities.map((city) => generateMarqueeCard(city));
	const cardsHTML = await Promise.all(cityPromises);

	marqueeContent.innerHTML = cardsHTML.join("");
	marqueeContent2.innerHTML = marqueeContent.innerHTML;

	[marqueeContent, marqueeContent2].forEach((container) => {
		container.querySelectorAll(".marquee-card").forEach((card) => {
			card.addEventListener("click", async () => {
				const city = card.dataset.city;
				const weatherData = await getWeatherInfo(city);
				updateWeatherResult(weatherData);
			});
		});
	});

	await activateFadeInAnimation(marquee);
}
