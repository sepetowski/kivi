import { domain } from "./domain";


export const getHomePosts = async (userId: string) => {
	const res = await fetch(`${domain}/api/post/home-posts?userId=${userId}`, {
		method: 'GET',

		cache: 'no-store',
	});

	if (!res.ok) {
		return [];
	}

	return res.json();
};
