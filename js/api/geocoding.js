export async function getCityCoordinates(city) {
	try {
		const resp = await fetch(
			`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=e967d8d356aa5220e28bc7e8ba35f936`,
		);

		if (!resp.ok) {
			throw new Error("Network response was not ok");
		}

		const data = await resp.json();
		const coordinates = {
			city: data[0].name,
			lat: data[0].lat,
			lon: data[0].lon,
		};

		return coordinates;
	} catch (error) {
		alert("Error fetching coordinates");
		console.error("Error fetching coordinates:", error);
	}
}
