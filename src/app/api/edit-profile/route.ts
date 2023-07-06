import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getAuthSession } from '@/lib/auth';

export const POST = async (request: Request) => {
	const session = await getAuthSession();

	if (!session?.user) return new Response('Unauthorized', { status: 401 ,statusText:"Unauthorized User"});

	const { username, profileDescription, orignalUserName } = await request.json();

	if (!username || !profileDescription || !orignalUserName)
		return new NextResponse('Missing Fields.', { status: 400, statusText: 'Missing Fields.' });

	try {
		const user = await db.user.findUnique({
			where: {
				name: orignalUserName,
			},
		});

		if (!user)
			return new NextResponse('User not Found', { status: 404, statusText: 'User not Found' });
		const { name, profileDescription: originalProfileDescription } = user;

		if (username === name && profileDescription === originalProfileDescription)
			return new NextResponse('You have to provide any changes', {
				status: 400,
				statusText: 'You have to provide any changes',
			});

		//change the username
		if (username !== name && profileDescription === originalProfileDescription) {
			const isNotAvaible = await db.user.findUnique({
				where: {
					name: username,
				},
			});
			if (isNotAvaible)
				return new NextResponse('Username is already taken', {
					status: 400,
					statusText: 'Username is already taken',
				});

			await db.user.update({
				where: {
					name: orignalUserName,
				},
				data: {
					name: username,
				},
			});

			return new NextResponse('Username was changed. You will be logged out', {
				status: 201,
				statusText: 'Username was changed. You will be logged out',
			});
		}
		//chnage desceription
		if (username === name && profileDescription !== originalProfileDescription) {
			await db.user.update({
				where: {
					name: orignalUserName,
				},
				data: {
					profileDescription,
				},
			});
			return new NextResponse('Profile description was changed', {
				status: 200,
				statusText: 'Profile description was changed',
			});
		}
		//chnage both
		if (username !== name && profileDescription !== originalProfileDescription) {
			const isNotAvaible = await db.user.findUnique({
				where: {
					name: username,
				},
			});
			if (isNotAvaible)
				return new NextResponse('Username is already taken', {
					status: 400,
					statusText: 'Username is already taken',
				});

			await db.user.update({
				where: {
					name: orignalUserName,
				},
				data: {
					name: username,
					profileDescription,
				},
			});

			return new NextResponse('Your profile data was changed. You will be logged out', {
				status: 201,
				statusText: 'Your profile data was changed. You will be logged out',
			});
		}
	} catch (err) {
		let errMsg = 'Database Error';
		if (typeof err === 'string') {
			errMsg = err;
		} else if (err instanceof Error) {
			errMsg = err.message;
		}
		return new NextResponse(errMsg, { status: 500, statusText: errMsg });
	}
};
