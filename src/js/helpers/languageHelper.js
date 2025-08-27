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
	},
	ru: {
		title: "Погода сегодня",
		searchPlaceholder: "Поиск города...",
		searchButton: "Поиск",
		feelsLike: "Ощущается как",
		humidity: "Влажность",
		wind: "Ветер",
		iconsAttribution: "Иконки созданы iconixar - Flaticon",
	},
};

export function getCurrentLanguage() {
	return localStorage.getItem(languageKey) || defaultLanguage;
}

export function setLanguage(languageCode) {
	localStorage.setItem(languageKey, languageCode);

	const t = translations[languageCode] || translations[defaultLanguage];

	// Update UI elements
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
}

export function initLanguage() {
	const savedLanguage = getCurrentLanguage();
	setLanguage(savedLanguage);
}

export function getTranslation(key) {
	const currentLang = getCurrentLanguage();
	const t = translations[currentLang] || translations[defaultLanguage];
	return t[key] || key;
}
