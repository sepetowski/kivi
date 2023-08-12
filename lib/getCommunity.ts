import { headers } from 'next/dist/client/components/headers';
import { notFound } from 'next/navigation';

export const getCommunity = async (community_name: string) => {
	const res = await fetch(`http://localhost:3000/api/communities/community/${community_name}`, {
		method: 'GET',
		headers: headers(),
		cache: 'no-store',
	});

	if (!res.ok) {
		return notFound();
	}

	return res.json();
};
