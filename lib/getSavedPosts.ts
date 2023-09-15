import { domain } from "./domain";


export const getSavedPosts = async (userId: string) => {
	const res = await fetch(`${domain}/api/post/get-saved?userId=${userId}`, {
		method: 'GET',

		cache: 'no-store',
	});

	if (!res.ok) {
		return [];
	}

	return res.json();
};
