import { getWeatherInfo } from "../api/weather.js";
import { getWeatherIconURL } from "../helpers/weatherIconHelper.js";
import { wait, animationDuration } from "../helpers/animationHelper.js";

export async function createMarquee(cities) {
	const marqueeContent = document.getElementById("marqueeContent");
	const marqueeContent2 = document.getElementById("marqueeContent2");

	const cityPromises = cities.map(async (city) => {
		const weatherData = await getWeatherInfo(city);
		const icon = getWeatherIconURL(weatherData.weatherId);

		return `
      <div class="marquee-card transition-border">
        <div class="text-sm font-nunito font-bold">${weatherData.city}</div>
        <div class="icon icon-sm" style="background-image: url('${icon}');"></div>
        <div class="text-xs font-nunito font-semibold">${weatherData.temperature}°C</div>
      </div>
    `;
	});

	const cardsHTML = await Promise.all(cityPromises);
	marqueeContent.innerHTML = cardsHTML.join("");

	marqueeContent2.innerHTML = marqueeContent.innerHTML;

	await wait(animationDuration.fade);
	marqueeContent.classList.remove("faded-out");
	marqueeContent2.classList.remove("faded-out");
}
