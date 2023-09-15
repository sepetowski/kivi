import { domain } from "./domain";


export const getProfileUserCommunities = async (userId: string) => {
	const res = await fetch(
		`${domain}/api/communities/get-user-profile-communities?userId=${userId}`,
		{
			method: 'GET',
			cache: 'no-store',
		}
	);

	if (!res.ok) {
		return [];
	}

	return res.json();
};
