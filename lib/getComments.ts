import { domain } from "./domain";


export const getComments = async (post_id: string) => {
	const res = await fetch(`${domain}/api/comments/get?postId=${post_id}`, {
		method: 'GET',
		cache: 'no-store',
	});

	if (!res.ok) {
		return [];
	}

	return res.json();
};
