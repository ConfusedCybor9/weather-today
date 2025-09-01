export function toTitleCase(str) {
	return str
		.split(" ")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
}

export function capitalizeFirst(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

export function normalizeQuery(query) {
	if (!query) return "";
	return query.trim().toLowerCase().replace(/\s+/g, " ");
}
