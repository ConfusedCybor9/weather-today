import { getWeatherInfo } from "../api/weather.js";
import { setLanguage } from "../helpers/languageHelper.js";
import { createMarquee } from "./marquee.js";
import { updateWeatherResult } from "./updateWeatherResult.js";

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

			setLanguage(selectedValue);

			const currentCity =
				document.getElementById("cityName")?.textContent || "bishkek";
			const marqueeCities = ["Paris", "London", "Tokyo", "Moscow"];

			try {
				const data = await getWeatherInfo(currentCity.toLowerCase());
				updateWeatherResult(data);
				createMarquee(marqueeCities);
			} catch (error) {
				console.error("Error refreshing weather data:", error);
			}
		}
	});

	// Close dropdown when clicking outside
	document.addEventListener("click", () => {
		languageTrigger.classList.remove("active");
		languageOptions.classList.remove("active");
	});
}
