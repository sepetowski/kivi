import { domain } from "./domain";


export const getUserSerachHistory = async (userId: string) => {
	const res = await fetch(`${domain}/api/explore/get-user-history?userId=${userId}`, {
		method: 'GET',
		cache: 'no-store',
	});

	if (!res.ok) {
		return [];
	}

	return res.json();
};
