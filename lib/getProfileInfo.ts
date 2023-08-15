import { notFound } from 'next/navigation';

export const getProfileInfo = async (profile_name: string, userName: string) => {
	const res = await fetch(`${process.env.FETCH}/api/profile/${profile_name}?userName=${userName}`, {
		method: 'GET',

		cache: 'no-store',
	});

	if (!res.ok) {
		return notFound();
	}

	return res.json();
};
