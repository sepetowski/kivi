import { domain } from "./domain";


export const getProfilePosts = async (userId: string) => {
	const res = await fetch(`${domain}/api/post/profile-posts?userId=${userId}`, {
		method: 'GET',
		cache: 'no-store',
	});

	if (!res.ok) {
		return [];
	}

	return res.json();
};
