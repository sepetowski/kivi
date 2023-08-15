

export const getHomePosts = async (userId:string) => {
	const res = await fetch(`${process.env.FETCH}/api/post/home-posts?userId=${userId}`, {
		method: 'GET',

		cache: 'no-store',
	});

	if (!res.ok) {
		return [];
	}

	return res.json();
};
