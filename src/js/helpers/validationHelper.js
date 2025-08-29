import { animationDuration, wait } from "./animationHelper.js";
import { normalizeQuery } from "./stringHelpers.js";

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

	if (!/^[\p{L}][\p{L}\s-]*[\p{L}]$/u.test(normalizedQuery)) {
		throw new Error("City name can only contain letters, spaces, and hyphens");
	}

	return normalizedQuery;
}

async function showInputError(message, searchInput, errorContainer) {
	searchInput.classList.add("input-error");
	const existingError = errorContainer.querySelector(".error-message");
	if (existingError) {
		existingError.remove();
	}
	const errorDiv = document.createElement("div");
	errorDiv.className = "error-message text-xs font-nunito faded-out";
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
