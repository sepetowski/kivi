import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getAuthSession } from '@/lib/auth';

export const POST = async (request: Request) => {
	const session = await getAuthSession();

	if (!session?.user)
		return new Response('Unauthorized', { status: 401, statusText: 'Unauthorized User' });
	const { name, communityId }: { name: string; communityId: string } = await request.json();

	if (!name || !communityId)
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
				name,
			},
		});

		return new NextResponse(
			`Community name was changed from ${community.name} to ${upadtedCommunity.name}`,
			{
				status: 200,
				statusText: `Community name was changed from ${community.name} to ${upadtedCommunity.name}`,
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
