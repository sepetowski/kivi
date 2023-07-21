import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export const POST = async (request: Request) => {
	const session = await getAuthSession();

	if (!session?.user)
		return new Response('Unauthorized', { status: 401, statusText: 'Unauthorized User' });

	const { communityId } = await request.json();
	if (!communityId)
		return new NextResponse('Missing Fields.', { status: 400, statusText: 'Missing Fields.' });

	try {
		const communityExist = await db.community.findUnique({
			where: {
				id: communityId,
			},
		});

		if (!communityExist)
			return new NextResponse('Community not found', {
				status: 404,
				statusText: 'Community not found',
			});

		const checkIfAlreadyInCommunity = await db.subscription.findFirst({
			where: {
				communityId,
				userId: session.user.id,
			},
		});

		if (checkIfAlreadyInCommunity)
			return new NextResponse('You are already in this community', {
				status: 408,
				statusText: 'You are already in this community',
			});

		await db.subscription.create({
			data: {
				communityId,
				userId: session.user.id,
			},
		});
		await db.community.update({
			where: { id: communityId },
			data: { members: { increment: 1 } },
		});

		return new NextResponse('Joined to Community', {
			status: 200,
			statusText: 'Joined to Community',
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
