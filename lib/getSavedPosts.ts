

export const getSavedPosts = async (userId:string) => {
	const res = await fetch(`${process.env.FETCH}/api/post/get-saved?userId=${userId}`, {
		method: 'GET',

		cache: 'no-store',
	});

	if (!res.ok) {
		return [];
	}

	return res.json();
};
