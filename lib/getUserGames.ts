
export const getUserGames = async (userId: string) => {
	const res = await fetch(`https://kivi-app.vercel.app/api/get-user-games?userId=${userId}`, {
		method: 'GET',
		cache: 'no-store',
	});

	if (!res.ok) {
		return [];
	}

	return res.json();
};
