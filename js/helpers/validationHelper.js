import { normalizeQuery } from "./stringHelpers.js";
import { wait, animationDuration } from "./animationHelper.js";

function validateCityName(query) {
	const normalizedQuery = normalizeQuery(query);
	const maxCityNameLength = 50;

	if (!normalizedQuery) {
		throw new Error("Please enter a city name");
	}

	if (normalizedQuery.length < 2) {
		throw new Error("City name is too short");
	}

	if (normalizedQuery.length > maxCityNameLength) {
		throw new Error(
			`City name cannot be longer than ${maxCityNameLength} characters`,
		);
	}

	// Check for valid characters and format
	if (!/^[a-zA-Z]+(?:[a-zA-Z\s]|-[a-zA-Z]+)*[a-zA-Z]+$/.test(normalizedQuery)) {
		throw new Error(
			"City name can only contain letters, single hyphens between words, and spaces",
		);
	}

	return normalizedQuery;
}

function showInputError(message, searchInput, errorContainer) {
	searchInput.classList.add("input-error");
	const existingError = errorContainer.querySelector(".error-message");
	if (existingError) {
		existingError.remove();
	}
	const errorDiv = document.createElement("div");
	errorDiv.className =
		"error-message text-xs font-nunito transition-opacity faded-out";
	errorDiv.textContent = message;
	errorContainer.appendChild(errorDiv);

	// Force reflow to trigger animation
	errorDiv.offsetHeight;
	errorDiv.classList.remove("faded-out");

	setTimeout(async () => {
		errorDiv.classList.add("faded-out");
		searchInput.classList.remove("input-error");
		await wait(animationDuration.fade);
		errorDiv.remove();
	}, animationDuration.message);
}

export { validateCityName, showInputError };
