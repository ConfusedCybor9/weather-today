import { getWeatherInfo } from "../api/weather.js";
import { animationDuration, wait } from "../helpers/animationHelper.js";
import { getWeatherIconURL } from "../helpers/weatherIconHelper.js";
import { updateWeatherResult } from "./updateWeatherResult.js";

export async function createMarquee(cities) {
	const marquee = document.getElementById("marquee");
	const marqueeContent = document.getElementById("marqueeContent");
	const marqueeContent2 = document.getElementById("marqueeContent2");

	const cityPromises = cities.map(async (city) => {
		const weatherData = await getWeatherInfo(city);
		const icon = getWeatherIconURL(weatherData.weatherId);

		return `
      <div class="marquee-card" data-city="${city}">
        <div class="text-sm font-nunito font-bold">${weatherData.city}</div>
        <div class="icon icon-sm" style="background-image: url('${icon}');"></div>
        <div class="text-xs font-nunito font-semibold">${weatherData.temperature}°C</div>
      </div>
    `;
	});

	const cardsHTML = await Promise.all(cityPromises);
	marqueeContent.innerHTML = cardsHTML.join("");
	marqueeContent2.innerHTML = marqueeContent.innerHTML;

	const addMarqueeClickHandlers = (container) => {
		container.querySelectorAll(".marquee-card").forEach((card) => {
			card.addEventListener("click", async () => {
				const city = card.dataset.city;
				const weatherData = await getWeatherInfo(city);
				updateWeatherResult(weatherData);
			});
		});
	};

	addMarqueeClickHandlers(marqueeContent);
	addMarqueeClickHandlers(marqueeContent2);

	await wait(animationDuration.fade);
	marquee.classList.remove("faded-out");
}
