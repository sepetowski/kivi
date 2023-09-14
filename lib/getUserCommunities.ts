
export const getUserCommunities = async (userId:string) => {
	const res = await fetch(`https://kivi-app.vercel.app/api/communities/get-user-communities?userId=${userId}`, {
		method: 'GET',

		cache: 'no-store',
	});

	if (!res.ok) {
		return [];
	}

	return res.json();
};
