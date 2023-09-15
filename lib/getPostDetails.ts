import { notFound } from 'next/navigation';
import { domain } from "./domain";


export const getPostDetails = async (post_id: string, userId: string) => {
	const res = await fetch(`${domain}/api/post/details/${post_id}?userId=${userId}`, {
		method: 'GET',
		cache: 'no-store',
	});

	if (!res.ok) {
		return notFound();
	}

	return res.json();
};
