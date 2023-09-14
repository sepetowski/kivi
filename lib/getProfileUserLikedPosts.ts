

export const getProfileUserLikedPosts = async (userId: string) => {
	const res = await fetch(
		`https://kivi-app.vercel.app/api/post/get-liked-posts?userId=${userId}`,
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
