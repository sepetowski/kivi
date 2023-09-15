import { redirect } from 'next/navigation';
import { domain } from "./domain";


export const getConversation = async (conversation_id: string, userId: string) => {
	const res = await fetch(
		`${domain}/api/messages/get-conversation/${conversation_id}?userId=${userId}`,
		{
			method: 'GET',
			cache: 'no-store',
		}
	);

	if (!res.ok) {
		return redirect('/messages');
	}

	return res.json();
};
