import { db } from '@/lib/db';
import { User } from '@prisma/client';
import { NextResponse } from 'next/server';

interface Conversation {
	id: string;
	createdAt: string;
	lastMessageAt: string;
}

interface ExtenedUser extends User {
	conversations: Conversation[];
}

export const GET = async (request: Request) => {
	const url = new URL(request.url);
	const query = url.searchParams.get('query');
	const userId = url.searchParams.get('userId');

	if (!query)
		return new NextResponse('Invalid query', {
			status: 400,
			statusText: 'Invalid query',
		});

	if (!userId)
		return new NextResponse('Missing fields', {
			status: 400,
			statusText: 'Missing fields',
		});

	try {
		const users = await db.user.findMany({
			where: {
				name: {
					contains: query.toLowerCase(),
				},
			},
			include: {
				conversations: {
					where: {
						users: {
							some: {
								id: userId,
							},
						},
					},
					select: {
						id: true,
					},
				},
			},
		});

		let sameUser: ExtenedUser | null = null;
		for (const user of users) {
			if (user.id === userId) {
				const fetchedUser = await db.user.findUnique({
					where: {
						id: user.id,
					},
					include: {
						conversations: {
							where: {
								users: {
									every: {
										id: user.id,
									},
								},
							},
							select: {
								id: true,
							},
						},
					},
				});

				sameUser = fetchedUser as ExtenedUser | null;
			}
		}

		const retunredUsers = users.map((user) => {
			if (sameUser && sameUser.id === user.id) {
				return {
					id: sameUser.id,
					name: sameUser.name,
					image: sameUser.image,
					conversationId: sameUser.conversations.length>0 ? sameUser.conversations[0].id : null,
				};
			}
			return {
				id: user.id,
				name: user.name,
				image: user.image,
				conversationId: user.conversations.length>0 ? user.conversations[0].id : null,
			};
		});

		return new NextResponse(JSON.stringify(retunredUsers), {
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
