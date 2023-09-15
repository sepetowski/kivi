import { notFound } from 'next/navigation';
import { domain } from "./domain";


export const getProfileInfo = async (profile_name: string, userName: string) => {
	const res = await fetch(`${domain}/api/profile/${profile_name}?userName=${userName}`, {
		method: 'GET',

		cache: 'no-store',
	});

	if (!res.ok) {
		return notFound();
	}

	return res.json();
};
