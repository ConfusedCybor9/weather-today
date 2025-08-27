import { getWeatherInfo } from "./js/api/weather.js";
import { createMarquee } from "./js/components/marquee.js";
import { updateWeatherResult } from "./js/components/updateWeatherResult.js";
import { initTheme, toggleTheme } from "./js/helpers/themeHelper.js";
import {
	showInputError,
	validateCityName,
} from "./js/helpers/validationHelper.js";
import "../src/sass/main.scss";

async function init() {
	initTheme();

	const marqueeCities = ["Paris", "London", "Tokyo", "Moscow"];
	createMarquee(marqueeCities);

	const initialCity = "bishkek";
	const data = await getWeatherInfo(initialCity);
	updateWeatherResult(data);

	const searchForm = document.getElementById("searchForm");
	const searchInput = document.getElementById("searchInput");
	const errorContainer = document.getElementById("errorContainer");

	searchForm.addEventListener("submit", async (e) => {
		e.preventDefault();
		const query = searchInput.value;

		try {
			validateCityName(query);
			const data = await getWeatherInfo(query);
			if (data) {
				updateWeatherResult(data);
				searchInput.value = "";
			}
		} catch (error) {
			showInputError(error.message, searchInput, errorContainer);
		}
	});

	const themeToggle = document.getElementById("themeToggle");
	themeToggle.addEventListener("click", toggleTheme);
}

init();

// TODO: hide API key API key: e967d8d356aa5220e28bc7e8ba35f936
// TODO: add lang change
// TODO: add search suggests (maybe with https://nominatim.org/release-docs/latest/api/Search/)
