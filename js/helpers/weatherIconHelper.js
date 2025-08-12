export function getTempIconURL(temp) {
	if (temp) {
		if (temp > 28) {
			return "./assets/weather-icons/temp/hot.png";
		} else if (temp < 15) {
			return "./assets/weather-icons/temp/cold.png";
		} else {
			return "./assets/weather-icons/temp/moderate.png";
		}
	}
}

export function getWeatherIconURL(weatherId) {
	const conditions = [
		{
			range: [200, 232],
			icon: "./assets/weather-icons/conditions/thunderstorm.png",
		},
		{
			range: [300, 321],
			icon: "./assets/weather-icons/conditions/drizzle.png",
		},
		{ range: [500, 531], icon: "./assets/weather-icons/conditions/rain.png" },
		{ range: [600, 622], icon: "./assets/weather-icons/conditions/snow.png" },
		{
			range: [701, 781],
			icon: "./assets/weather-icons/conditions/atmosphere.png",
		},
		{
			range: [800, 800],
			icon: "./assets/weather-icons/conditions/clear-sky.png",
		},
		{ range: [801, 804], icon: "./assets/weather-icons/conditions/clouds.png" },
	];

	const match = conditions.find(
		(item) => weatherId >= item.range[0] && weatherId <= item.range[1],
	);
	return match ? match.icon : "./assets/weather-icons/cloudy.png";
}
