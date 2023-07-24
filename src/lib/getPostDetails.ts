import { headers } from 'next/dist/client/components/headers';
import { notFound } from 'next/navigation';

export const getPostDetails = async (post_id: string) => {
	const res = await fetch(`http://localhost:3000/api/post/details/${post_id}`, {
		method: 'GET',
		headers: headers(),
		cache: 'no-store',
	});

	if (!res.ok) {
		return notFound();
	}

	return res.json();
};
