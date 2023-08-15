

export const getAllCommunities = async (userId: string) => {
	const res = await fetch(
		`http://localhost:3000/api/communities/get-all-communities?userId=${userId}`,
		{
			method: 'GET',
			cache: 'no-store',
		}
	);

	if (!res.ok) {
		return [];
	}

	return res.json();
};
