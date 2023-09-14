

export const getUserSerachHistory = async (userId:string) => {
	const res = await fetch(`https://kivi-app.vercel.app/api/explore/get-user-history?userId=${userId}`, {
		method: 'GET',
		cache: 'no-store',
	});

	if (!res.ok) {
		return [];
	}

	return res.json();
};
