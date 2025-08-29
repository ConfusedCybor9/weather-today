import { getWeatherInfo } from "../api/weather.js";
import {
	activateFadeInAnimation,
	activateFadeOutAnimation,
} from "../helpers/animationHelper.js";
import { setLanguage } from "../helpers/languageHelper.js";

export function initLanguageDropdown() {
	const languageTrigger = document.getElementById("languageSelect");
	const languageOptions = document.getElementById("languageOptions");

	if (!languageTrigger || !languageOptions) {
		console.warn("Language dropdown elements not found");
		return;
	}

	languageOptions.style.display = "";

	languageTrigger.addEventListener("click", (e) => {
		e.stopPropagation();
		languageTrigger.classList.toggle("active");
		languageOptions.classList.toggle("active");
	});

	languageOptions.addEventListener("click", async (e) => {
		if (e.target.classList.contains("custom-select-option")) {
			const selectedValue = e.target.dataset.value;

			languageTrigger.classList.remove("active");
			languageOptions.classList.remove("active");

			const elements = [
				document.querySelector(".header .font-quicksand"),
				document.getElementById("marquee"),
				document.getElementById("weatherResult"),
			].filter(Boolean);

			await Promise.all(
				elements.map((element) => activateFadeOutAnimation(element)),
			);

			setLanguage(selectedValue);

			const weatherResult = document.getElementById("weatherResult");
			if (weatherResult) {
				const currentCity =
					document.getElementById("cityName")?.textContent || "bishkek";
				try {
					const data = await getWeatherInfo(currentCity.toLowerCase());
					await updateWeatherResultContent(weatherResult, data);
				} catch (error) {
					console.error("Error refreshing weather data:", error);
				}
			}

			await Promise.all(
				elements.map((element) => activateFadeInAnimation(element)),
			);
		}
	});

	document.addEventListener("click", () => {
		languageTrigger.classList.remove("active");
		languageOptions.classList.remove("active");
	});
}

import { generateWeatherResultHTML } from "./updateWeatherResult.js";

async function updateWeatherResultContent(container, data) {
	container.innerHTML = generateWeatherResultHTML(data);
}
