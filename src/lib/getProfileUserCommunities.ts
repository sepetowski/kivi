import { headers } from 'next/dist/client/components/headers';

export const getProfileUserCommunities = async (userId: string) => {
	const res = await fetch(
		`http://localhost:3000/api/communities/get-user-profile-communities?userId=${userId}`,
		{
			method: 'GET',
			headers: headers(),
			cache: 'no-store',
		}
	);

	if (!res.ok) {
		return [];
	}

	return res.json();
};
