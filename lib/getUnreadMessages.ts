import { domain } from "./domain";


export const getUnreadMessages = async (userId: string) => {
	const res = await fetch(`${domain}/api/messages/get-unread?userId=${userId}`, {
		method: 'GET',
		cache: 'no-store',
	});

	if (!res.ok) {
		return [];
	}

	return res.json();
};
