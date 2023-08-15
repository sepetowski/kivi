
export const getUserGames = async (userId: string) => {
	const res = await fetch(`http://localhost:3000/api/get-user-games?userId=${userId}`, {
		method: 'GET',
		cache: 'no-store',
	});

	if (!res.ok) {
		return [];
	}

	return res.json();
};
