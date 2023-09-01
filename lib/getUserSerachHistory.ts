

export const getUserSerachHistory = async (userId:string) => {
	const res = await fetch(`http://localhost:3000/api/explore/get-user-history?userId=${userId}`, {
		method: 'GET',
		cache: 'no-store',
	});

	if (!res.ok) {
		return [];
	}

	return res.json();
};
