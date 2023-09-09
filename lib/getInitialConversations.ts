import { notFound } from 'next/navigation';

export const getInitialConversations = async ( userId: string) => {
	const res = await fetch(`http://localhost:3000/api/messages/get-conversations?userId=${userId}`, {
		method: 'GET',
		cache: 'no-store',
	});

	if (!res.ok) {
		return [];
	}

	return res.json();
};


