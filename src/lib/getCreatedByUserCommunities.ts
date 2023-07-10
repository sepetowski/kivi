import { headers } from 'next/dist/client/components/headers';

export const getCreatedByUserCommunities = async () => {
	const res = await fetch(`http://localhost:3000/api/community/get-created-by-user-communities`, {
		method: 'GET',
		headers: headers(),
		cache: 'no-store',
	});

	if (!res.ok) {
		return [];
	}

	return res.json();
};
