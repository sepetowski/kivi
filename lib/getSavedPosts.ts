

export const getSavedPosts = async (userId:string) => {
	const res = await fetch(`http://localhost:3000/api/post/get-saved?userId=${userId}`, {
		method: 'GET',

		cache: 'no-store',
	});

	if (!res.ok) {
		return [];
	}

	return res.json();
};
