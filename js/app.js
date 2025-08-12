import { getWeatherInfo } from "./api/weather.js";
import { createMarquee } from "./components/marquee.js";
import { updateWeatherResult } from "./components/updateWeatherResult.js";

async function init() {
	const marqueeCities = ["Paris", "London", "Tokyo", "Moscow"];
	createMarquee(marqueeCities);

	const initialCity = "bishkek";
	const data = await getWeatherInfo(initialCity);
	updateWeatherResult(data);

	const searchForm = document.getElementById("searchForm");
	const searchInput = document.getElementById("searchInput");
	searchForm.addEventListener("submit", async (e) => {
		e.preventDefault();
		const query = String(searchInput.value).trim().toLowerCase();
		if (query) {
			const data = await getWeatherInfo(query);
			updateWeatherResult(data);
			searchInput.value = "";
		}
	});
}

init();

// API key: e967d8d356aa5220e28bc7e8ba35f936
// TODO: add dark mode
// TODO: add bgs
// TODO: add marquee cities to activate search on click for full weather
// TODO: expand shown conditions
// TODO: add lang change
// TODO: add search suggests (maybe with https://nominatim.org/release-docs/latest/api/Search/)
