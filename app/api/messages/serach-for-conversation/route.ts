import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

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
					contains: query,
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

		console.log(users);

		const retunredUsers = users.map((user) => {
			return {
				id: user.id,
				name: user.name,
				image: user.image,
				conversations: user.conversations,
			};
		});

		console.log(retunredUsers);

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
