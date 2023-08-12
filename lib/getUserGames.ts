import { headers } from 'next/dist/client/components/headers';

export const getUserGames = async (userId: string) => {
	const res = await fetch(`http://localhost:3000/api/get-user-games?userId=${userId}`, {
		method: 'GET',
		headers: headers(),
		cache: 'no-store',
	});

	if (!res.ok) {
		return [];
	}

	return res.json();
};
