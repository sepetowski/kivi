export const generateUsernameInitials = (name: string) => {
	const firstLetter = name[0];
	const lastLetter = name[name.length - 1];
	return (firstLetter + lastLetter).toUpperCase();
};
