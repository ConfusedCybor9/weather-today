export function wait(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export const animationDuration = {
	fade: 500, // Duration of fade animations
	message: 3000, // Duration of temporary messages
};

export async function activateFadeOutAnimation(container) {
	if (!container) return;
	container.classList.add("faded-out");
	await wait(animationDuration.fade);
}

export async function activateFadeInAnimation(container) {
	if (!container) return;
	container.classList.remove("faded-out");
	await wait(animationDuration.fade);
}
