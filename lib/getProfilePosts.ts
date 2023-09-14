export const getProfilePosts = async (userId: string) => {
	const res = await fetch(`https://kivi-app.vercel.app/api/post/profile-posts?userId=${userId}`, {
		method: 'GET',
		cache: 'no-store',
	});

	if (!res.ok) {
		return [];
	}

	return res.json();
};
