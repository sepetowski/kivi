
export const getUserGames = async (userId: string) => {
	const res = await fetch(`${process.env.FETCH}/api/get-user-games?userId=${userId}`, {
		method: 'GET',
		cache: 'no-store',
	});

	if (!res.ok) {
		return [];
	}

	return res.json();
};
