import { notFound } from 'next/navigation';
import { domain } from "./domain";


export const getCommunity = async (community_name: string, userId: string) => {
	const res = await fetch(
		`${domain}/api/communities/community/${community_name}?userId=${userId}`,
		{
			method: 'GET',

			cache: 'no-store',
		}
	);

	if (!res.ok) {
		return notFound();
	}

	return res.json();
};
