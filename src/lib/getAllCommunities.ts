import { headers } from 'next/dist/client/components/headers';


export const getAllCommunities = async () => {
	const res = await fetch(`http://localhost:3000/api/get-all-communities`, {
		method: 'GET',
		headers: headers(),
		cache: 'no-store',
	});

	if (!res.ok) {
		return [];
	}

	return res.json();
};
