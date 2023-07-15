import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getAuthSession } from '@/lib/auth';

export const POST = async (request: Request) => {
	const session = await getAuthSession();

	if (!session?.user)
		return new Response('Unauthorized', { status: 401, statusText: 'Unauthorized User' });
	const {
		picture,
		fileName,
		communityId,
	}: { picture: string; fileName: string; communityId: string } = await request.json();

	if (!picture || !fileName || !communityId)
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

		await db.community.update({
			where: {
				id: communityId,
			},
			data: {
				image: picture,
				fileName,
			},
		});

		return NextResponse.json(
			{ previousFileName: community.fileName },
			{ status: 200, statusText: `Avatar of ${community.name} was updated` }
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
