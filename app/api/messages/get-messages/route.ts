import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export const GET = async (request: Request) => {
	const url = new URL(request.url);
	const conversationId = url.searchParams.get('conversationId');

	if (!conversationId)
		return new NextResponse('Missing fields', {
			status: 400,
		});
	try {
		const messages = await db.message.findMany({
			where: {
				conversationId: conversationId,
			},
			include: {
				sender: {
					select: {
						id: true,
					},
				},
			},
			orderBy: {
				createdAt: 'asc',
			},
		});
		return new NextResponse(JSON.stringify(messages), {
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
