import { headers } from 'next/dist/client/components/headers';

export const getHomePosts = async () => {
	const res = await fetch('http://localhost:3000/api/post/home-posts', {
		method: 'GET',
		headers: headers(),
		cache: 'no-store',
	});

	if (!res.ok) {
		return [];
	}

	return res.json();
};
