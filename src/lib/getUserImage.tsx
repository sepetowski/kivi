import { headers } from 'next/dist/client/components/headers';

export const getUserImage = async () => {
	const res = await fetch(`http://localhost:3000/api/get-user-profile-image`, {
		method: 'GET',
		headers: headers(),
		cache: 'no-store',
	});

	if (!res.ok) {
		return { image: null };
	}

	return res.json();
};
