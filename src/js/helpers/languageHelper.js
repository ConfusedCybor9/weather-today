const languageKey = "weatherToday.language";
const defaultLanguage = "en";

const languages = {
	en: "English",
	ru: "Русский",
};

const translations = {
	en: {
		title: "Weather Today",
		searchPlaceholder: "Search for a city...",
		searchButton: "Search",
		feelsLike: "Feels like",
		humidity: "Humidity",
		wind: "Wind",
		iconsAttribution: "Icons created by iconixar - Flaticon",
		cities: {
			paris: "Paris",
			london: "London",
			tokyo: "Tokyo",
			moscow: "Moscow",
			bishkek: "Bishkek",
			"new york": "New York",
			"los angeles": "Los Angeles",
			chicago: "Chicago",
			miami: "Miami",
			"san francisco": "San Francisco",
			berlin: "Berlin",
			munich: "Munich",
			rome: "Rome",
			milan: "Milan",
			madrid: "Madrid",
			barcelona: "Barcelona",
			amsterdam: "Amsterdam",
			vienna: "Vienna",
			zurich: "Zurich",
			beijing: "Beijing",
			shanghai: "Shanghai",
			"hong kong": "Hong Kong",
			singapore: "Singapore",
			seoul: "Seoul",
			osaka: "Osaka",
			kyoto: "Kyoto",
			sydney: "Sydney",
			melbourne: "Melbourne",
			dubai: "Dubai",
			istanbul: "Istanbul",
			mumbai: "Mumbai",
			delhi: "Delhi",
			bangkok: "Bangkok",
			"mexico city": "Mexico City",
			"buenos aires": "Buenos Aires",
			"rio de janeiro": "Rio de Janeiro",
			"são paulo": "São Paulo",
			cairo: "Cairo",
			lagos: "Lagos",
			"cape town": "Cape Town",
			montreal: "Montreal",
			toronto: "Toronto",
			vancouver: "Vancouver",
			"saint petersburg": "Saint Petersburg",
			novosibirsk: "Novosibirsk",
			yekaterinburg: "Yekaterinburg",
			kazan: "Kazan",
			kemerovo: "Kemerovo",
			krasnoyarsk: "Krasnoyarsk",
			omsk: "Omsk",
			tomsk: "Tomsk",
			barnaul: "Barnaul",
			irkutsk: "Irkutsk",
			khabarovsk: "Khabarovsk",
			vladivostok: "Vladivostok",
			yakutsk: "Yakutsk",
			chita: "Chita",
			"ulan-ude": "Ulan-Ude",
			abakan: "Abakan",
			novokuznetsk: "Novokuznetsk",
			"komsomolsk-on-amur": "Komsomolsk-on-Amur",
			magadan: "Magadan",
			"yuzhno-sakhalinsk": "Yuzhno-Sakhalinsk",
		},
	},
	ru: {
		title: "Погода сегодня",
		searchPlaceholder: "Поиск города...",
		searchButton: "Поиск",
		feelsLike: "Ощущается как",
		humidity: "Влажность",
		wind: "Ветер",
		iconsAttribution: "Иконки созданы iconixar - Flaticon",
		cities: {
			paris: "Париж",
			london: "Лондон",
			tokyo: "Токио",
			moscow: "Москва",
			bishkek: "Бишкек",
			"new york": "Нью-Йорк",
			"los angeles": "Лос-Анджелес",
			chicago: "Чикаго",
			miami: "Майами",
			"san francisco": "Сан-Франциско",
			berlin: "Берлин",
			munich: "Мюнхен",
			rome: "Рим",
			milan: "Милан",
			madrid: "Мадрид",
			barcelona: "Барселона",
			amsterdam: "Амстердам",
			vienna: "Вена",
			zurich: "Цюрих",
			beijing: "Пекин",
			shanghai: "Шанхай",
			"hong kong": "Гонконг",
			singapore: "Сингапур",
			seoul: "Сеул",
			osaka: "Осака",
			kyoto: "Киото",
			sydney: "Сидней",
			melbourne: "Мельбурн",
			dubai: "Дубай",
			istanbul: "Стамбул",
			mumbai: "Мумбаи",
			delhi: "Дели",
			bangkok: "Бангкок",
			"mexico city": "Мехико",
			"buenos aires": "Буэнос-Айрес",
			"rio de janeiro": "Рио-де-Жанейро",
			"são paulo": "Сан-Паулу",
			cairo: "Каир",
			lagos: "Лагос",
			"cape town": "Кейптаун",
			montreal: "Монреаль",
			toronto: "Торонто",
			vancouver: "Ванкувер",
			"saint petersburg": "Санкт-Петербург",
			novosibirsk: "Новосибирск",
			yekaterinburg: "Екатеринбург",
			kazan: "Казань",
			kemerovo: "Кемерово",
			krasnoyarsk: "Красноярск",
			omsk: "Омск",
			tomsk: "Томск",
			barnaul: "Барнаул",
			irkutsk: "Иркутск",
			khabarovsk: "Хабаровск",
			vladivostok: "Владивосток",
			yakutsk: "Якутск",
			chita: "Чита",
			"ulan-ude": "Улан-Удэ",
			abakan: "Абакан",
			novokuznetsk: "Новокузнецк",
			"komsomolsk-on-amur": "Комсомольск-на-Амуре",
			magadan: "Магадан",
			"yuzhno-sakhalinsk": "Южно-Сахалинск",
		},
	},
};
export function getCurrentLanguage() {
	return localStorage.getItem(languageKey) || defaultLanguage;
}

function getTranslations(languageCode) {
	return translations[languageCode] || translations[defaultLanguage];
}

export function setLanguage(languageCode) {
	localStorage.setItem(languageKey, languageCode);

	const t = getTranslations(languageCode);

	const titleElement = document.querySelector(".header .font-quicksand");
	if (titleElement) titleElement.textContent = t.title;

	const searchInput = document.getElementById("searchInput");
	if (searchInput) searchInput.placeholder = t.searchPlaceholder;

	const searchButton = document.querySelector("#searchButton .font-nunito");
	if (searchButton) searchButton.textContent = t.searchButton;

	const iconsAttribution = document.querySelector(".icons-attribution");
	if (iconsAttribution) iconsAttribution.textContent = t.iconsAttribution;

	document.documentElement.lang = languageCode;

	const selectedLanguage = document.getElementById("selectedLanguage");
	const languageOptions = document.querySelectorAll(".custom-select-option");

	if (selectedLanguage && languages[languageCode]) {
		selectedLanguage.textContent = languages[languageCode];
	}

	languageOptions.forEach((option) => {
		option.classList.remove("selected");
		if (option.dataset.value === languageCode) {
			option.classList.add("selected");
		}
	});

	updateMarqueeContent();
}

export function initLanguage() {
	const savedLanguage = getCurrentLanguage();
	setLanguage(savedLanguage);
}

export function getTranslation(key) {
	const t = getTranslations(getCurrentLanguage());
	return t[key] || key;
}

export function translateCityName(cityName) {
	const t = getTranslations(getCurrentLanguage());
	return t.cities?.[cityName.toLowerCase()] || cityName;
}

function updateMarqueeContent() {
	const marqueeContent = document.getElementById("marqueeContent");
	const marqueeContent2 = document.getElementById("marqueeContent2");

	if (!marqueeContent || !marqueeContent2) return;

	// Update city names in existing cards
	marqueeContent.querySelectorAll(".marquee-card").forEach((card) => {
		const cityElement = card.querySelector(".text-sm.font-nunito.font-bold");
		const cityName = card.dataset.city;
		if (cityElement && cityName) {
			cityElement.textContent = translateCityName(cityName);
		}
	});

	marqueeContent2.innerHTML = marqueeContent.innerHTML;

	[marqueeContent, marqueeContent2].forEach((container) => {
		// Remove old listeners by cloning
		const newContainer = container.cloneNode(true);
		container.parentNode.replaceChild(newContainer, container);

		// Add click handler to new container
		newContainer.addEventListener("click", async (event) => {
			const card = event.target.closest(".marquee-card");
			if (card) {
				const city = card.dataset.city;
				const { getWeatherInfo } = await import("../api/weather.js");
				const { updateWeatherResult } = await import(
					"../components/updateWeatherResult.js"
				);
				const weatherData = await getWeatherInfo(city);
				updateWeatherResult(weatherData);
			}
		});
	});
}
