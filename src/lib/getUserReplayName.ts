export const getUserReplayName = (input: string) => {
	const regex = /@(\S+)/;
	const match = input.match(regex);
	if (match) return match[0];
};
