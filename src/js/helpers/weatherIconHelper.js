import atmosphere from "../../assets/img/weather-icons/conditions/atmosphere.png";
import clearSky from "../../assets/img/weather-icons/conditions/clear-sky.png";
import clouds from "../../assets/img/weather-icons/conditions/clouds.png";
import drizzle from "../../assets/img/weather-icons/conditions/drizzle.png";
import rain from "../../assets/img/weather-icons/conditions/rain.png";
import snow from "../../assets/img/weather-icons/conditions/snow.png";
import thunderstorm from "../../assets/img/weather-icons/conditions/thunderstorm.png";
import cold from "../../assets/img/weather-icons/temperature/cold.png";
import hot from "../../assets/img/weather-icons/temperature/hot.png";
import moderate from "../../assets/img/weather-icons/temperature/moderate.png";

export function getTempIconURL(temp) {
	if (typeof temp === "number") {
		if (temp > 28) {
			return hot;
		} else if (temp < 15) {
			return cold;
		} else {
			return moderate;
		}
	}
}

export function getWeatherIconURL(weatherId) {
	const conditions = [
		{
			range: [200, 232],
			icon: thunderstorm,
		},
		{
			range: [300, 321],
			icon: drizzle,
		},
		{ range: [500, 531], icon: rain },
		{ range: [600, 622], icon: snow },
		{
			range: [701, 781],
			icon: atmosphere,
		},
		{
			range: [800, 800],
			icon: clearSky,
		},
		{ range: [801, 804], icon: clouds },
	];

	const match = conditions.find(
		(item) => weatherId >= item.range[0] && weatherId <= item.range[1],
	);
	return match ? match.icon : "./assets/weather-icons/cloudy.png";
}
