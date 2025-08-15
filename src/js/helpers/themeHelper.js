const themeKey = "weatherToday.theme";
const darkTheme = "dark";
const lightTheme = "light";

export function initTheme() {
	const savedTheme = localStorage.getItem(themeKey) || lightTheme;
	setTheme(savedTheme);
}

export function toggleTheme() {
	const currentTheme = document.body.getAttribute("data-theme");
	const newTheme = currentTheme === darkTheme ? lightTheme : darkTheme;
	setTheme(newTheme);
}

function setTheme(theme) {
	document.body.setAttribute("data-theme", theme);
	localStorage.setItem(themeKey, theme);

	const themeToggle = document.getElementById("themeToggle");
	if (themeToggle) {
		themeToggle.textContent = theme === darkTheme ? "☀️" : "🌙";
	}
}
