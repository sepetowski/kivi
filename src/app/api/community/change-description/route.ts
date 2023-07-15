import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getAuthSession } from '@/lib/auth';

export const POST = async (request: Request) => {
	const session = await getAuthSession();

	if (!session?.user)
		return new Response('Unauthorized', { status: 401, statusText: 'Unauthorized User' });
	const { description, communityId }: { description: string; communityId: string } =
		await request.json();

	if (!description || !communityId)
		return new NextResponse('Missing Fields.', { status: 400, statusText: 'Missing Fields.' });

	try {
		const community = await db.community.findUnique({
			where: {
				id: communityId,
			},
		});

		if (!community)
			return new NextResponse(`No community found`, {
				status: 404,
				statusText: `No community found`,
			});

		const upadtedCommunity = await db.community.update({
			where: {
				id: communityId,
			},
			data: {
				description,
			},
		});

		return new NextResponse(
			`Community description was changed from ${community.description} to ${upadtedCommunity.description}`,
			{
				status: 200,
				statusText: `Community description was changed from ${community.description} to ${upadtedCommunity.description}`,
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
