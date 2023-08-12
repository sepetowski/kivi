import { headers } from 'next/dist/client/components/headers';

export const getComments = async (post_id: string) => {
	const res = await fetch(`http://localhost:3000/api/comments/get?postId=${post_id}`, {
		method: 'GET',
		headers: headers(),
		cache: 'no-store',
	});

	if (!res.ok) {
		return [];
	}

	return res.json();
};
