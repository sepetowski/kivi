import { domain } from "./domain";

export const getAllCommunities = async (userId: string) => {
	const res = await fetch(`${domain}/api/communities/get-all-communities?userId=${userId}`, {
		method: 'GET',
		cache: 'no-store',
	});

	if (!res.ok) {
		return [];
	}

	return res.json();
};
