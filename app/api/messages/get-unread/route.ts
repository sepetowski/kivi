import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export const GET = async (request: Request) => {
	const url = new URL(request.url);
	const userId = url.searchParams.get('userId');

	if (!userId)
		return new NextResponse('Missing fields', {
			status: 400,
		});
	try {
		const unreadMessages = await db.conversation.findMany({
			where: {
				users: {
					some: {
						id: userId,
					},
				},
			},
			include: {
				messages: {
					select: {
						id: true,
					},
					where: {
						sender: {
							id: userId,
						},
						seen: false,
					},
				},
			},
		});
		return new NextResponse(JSON.stringify(unreadMessages), {
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
