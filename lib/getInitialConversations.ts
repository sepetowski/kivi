import { domain } from "./domain";


export const getInitialConversations = async (userId: string) => {
	const res = await fetch(`${domain}/api/messages/get-conversations?userId=${userId}`, {
		method: 'GET',
		cache: 'no-store',
	});

	if (!res.ok) {
		return [];
	}

	return res.json();
};
