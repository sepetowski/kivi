export const getAllNotifications = async (userId: string) => {
	const res = await fetch(`http://localhost:3000/api/notifications/get?userId=${userId}`, {
		method: 'GET',
		cache: 'no-store',
	});

	if (!res.ok) {
		return [];
	}

	return res.json();
};
