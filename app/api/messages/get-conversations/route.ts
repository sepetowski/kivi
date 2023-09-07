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
		const converstaions = await db.conversation.findMany({
			where: {
				users: {
					some: {
						id: userId,
					},
				},
			},
			include: {
				users: {
					select: {
						image: true,
						name: true,
						id: true,
					},
				},
				messages: {
					include: {
						sender: {
							select: {
								image: true,
								name: true,
								id: true,
							},
						},
					},
					orderBy: {
						createdAt: 'desc',
					},
					take: 1,
				},
			},
			orderBy: {
				lastMessageAt: 'desc',
			},
		});

		return new NextResponse(JSON.stringify(converstaions), {
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
