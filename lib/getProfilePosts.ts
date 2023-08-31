export const getProfilePosts = async (userId: string) => {
	const res = await fetch(`http://localhost:3000/api/post/profile-posts?userId=${userId}`, {
		method: 'GET',
		cache: 'no-store',
	});

	if (!res.ok) {
		return [];
	}

	return res.json();
};
