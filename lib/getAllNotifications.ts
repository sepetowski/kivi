import { domain } from "./domain";


export const getAllNotifications = async (userId: string) => {
	const res = await fetch(`${domain}/api/notifications/get?userId=${userId}`, {
		method: 'GET',
		cache: 'no-store',
	});

	if (!res.ok) {
		return [];
	}

	return res.json();
};
