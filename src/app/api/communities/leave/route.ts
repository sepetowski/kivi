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

		if (!checkIfAlreadyInCommunity)
			return new NextResponse('You have not joined to this community yet.', {
				status: 408,
				statusText: 'You have bot joined not this community yet.',
			});

		await db.subscription.delete({
			where: {
				userId_communityId: {
					communityId,
					userId: session.user.id,
				},
			},
		});
		await db.community.update({
			where: { id: communityId },
			data: { members: { decrement: 1 } },
		});

		return new NextResponse('Left from Community', {
			status: 200,
			statusText: 'Left from Community',
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
