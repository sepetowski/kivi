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
		const communityExist = await db.community.findFirst({
			where: {
				id: communityId,
				creatorId: session.user.id,
			},
		});

		if (!communityExist)
			return new NextResponse('Community not found', {
				status: 404,
				statusText: 'Community not found',
			});

		await db.community.delete({
			where: {
				id: communityId,
			},
		});

		return new NextResponse(
			JSON.stringify({
				fileName: communityExist.fileName,
			}),
			{
				status: 200,
				statusText: 'Community deleted',
			}
		);
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
