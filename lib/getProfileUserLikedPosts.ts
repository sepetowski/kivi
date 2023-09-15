import { domain } from "./domain";


export const getProfileUserLikedPosts = async (userId: string) => {
	const res = await fetch(`${domain}/api/post/get-liked-posts?userId=${userId}`, {
		method: 'GET',
		cache: 'no-store',
	});

	if (!res.ok) {
		return [];
	}

	return res.json();
};
