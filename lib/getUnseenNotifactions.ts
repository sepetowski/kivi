export const getUnseenNotifactions = async (userId: string) => {
	const res = await fetch(`http://localhost:3000/api/notifications/get-unseen?userId=${userId}`, {
		method: 'GET',
		cache: 'no-store',
	});

	if (!res.ok) {
		return [];
	}

	return res.json();
};
