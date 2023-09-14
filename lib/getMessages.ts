export const getMessages = async (conversation_id: string) => {
	const res = await fetch(
		`https://kivi-app.vercel.app/api/messages/get-messages?conversationId=${conversation_id}`,
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
