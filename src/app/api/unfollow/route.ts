import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export const POST = async (request: Request) => {
	const { followingUserId, followerUserId } = await request.json();
	try {
		const followingExist = await db.follows.findFirst({
			where: {
				followerId: followerUserId,
				followingId: followingUserId,
			},
		});

		if (!followingExist)
			return new NextResponse('You are not following this user yet', { status: 400 });

		await db.follows.delete({
			where: {
				followerId_followingId: {
					followerId: followerUserId,
					followingId: followingUserId,
				},
			},
		});

		return new NextResponse('You are no longer following this user', {
			status: 200,
		});
	} catch (err) {
		let errMsg = 'Database Error';
		if (typeof err === 'string') {
			errMsg = err;
		} else if (err instanceof Error) {
			errMsg = err.message;
		}
		return new NextResponse(errMsg, { status: 500 });
	}
};