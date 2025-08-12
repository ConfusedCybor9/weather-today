export function wait(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export const animationDuration = {
	fade: 500, // Duration of fade animations
	message: 3000, // Duration of temporary messages
};
