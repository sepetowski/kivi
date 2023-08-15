

export const getProfileUserLikedPosts = async (userId: string) => {
	const res = await fetch(
		`http://localhost:3000/api/post/get-liked-posts?userId=${userId}`,
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
