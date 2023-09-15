import { domain } from "./domain";


export const getUnseenNotifactions = async (userId: string) => {
	const res = await fetch(`${domain}/api/notifications/get-unseen?userId=${userId}`, {
		method: 'GET',
		cache: 'no-store',
	});

	if (!res.ok) {
		return [];
	}

	return res.json();
};
