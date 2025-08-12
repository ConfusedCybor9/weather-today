export function toTitleCase(str) {
	return str
		.split(" ")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
}

export function normalizeQuery(query) {
	if (!query) return "";
	// Trim whitespace, convert to lowercase, and normalize multiple spaces to single spaces
	return query.trim().toLowerCase().replace(/\s+/g, " ");
}
