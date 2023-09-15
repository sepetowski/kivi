import { domain } from "./domain";


export const getUserGames = async (userId: string) => {
	const res = await fetch(`${domain}/api/get-user-games?userId=${userId}`, {
		method: 'GET',
		cache: 'no-store',
	});

	if (!res.ok) {
		return [];
	}

	return res.json();
};
