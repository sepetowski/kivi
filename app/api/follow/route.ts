import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export const POST = async (request: Request) => {
	const session = await getAuthSession();

	if (!session?.user)
		return new Response('Unauthorized', { status: 401, statusText: 'Unauthorized User' });

	const { followingUserId, followerUserId } = await request.json();
	try {
		const followingExist = await db.follows.findFirst({
			where: {
				followerId: followerUserId,
				followingId: followingUserId,
			},
		});

		if (followingExist)
			return new NextResponse('You are already following this user', { status: 400 });

		await db.follows.create({
			data: {
				followerId: followerUserId,
				followingId: followingUserId,
			},
		});

		await db.notifications.create({
			data: {
				acctionMadeByUserId: session.user.id,
				notifyType: 'NEW_FOLLOW',
				userId: followingUserId,
			},
		});

		return new NextResponse('You are now following this user', {
			status: 200,
		});
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
