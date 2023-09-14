export const getUnseenNotifactions = async (userId: string) => {
	const res = await fetch(`https://kivi-app.vercel.app/api/notifications/get-unseen?userId=${userId}`, {
		method: 'GET',
		cache: 'no-store',
	});

	if (!res.ok) {
		return [];
	}

	return res.json();
};
