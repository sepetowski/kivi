
import { notFound } from 'next/navigation';

export const getPostDetails = async (post_id: string,userId:string) => {
	const res = await fetch(`http://localhost:3000/api/post/details/${post_id}?userId=${userId}`, {
		method: 'GET',
		cache: 'no-store',
	});

	if (!res.ok) {
		return notFound();
	}

	return res.json();
};
