import { domain } from "./domain";


export const getMessages = async (conversation_id: string) => {
	const res = await fetch(`${domain}/api/messages/get-messages?conversationId=${conversation_id}`, {
		method: 'GET',
		cache: 'no-store',
	});

	if (!res.ok) {
		return [];
	}

	return res.json();
};
