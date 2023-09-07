export const makeShortMessage = (message: string, max = 50) => {
	if (message.length > max) {
		return message.slice(0, max) + '...';
	} else {
		return message;
	}
};
