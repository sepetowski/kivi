import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export const GET = async (request: Request) => {
	const url = new URL(request.url);
	const query = url.searchParams.get('query');

	if (!query)
		return new NextResponse('Invalid query', {
			status: 400,
			statusText: 'Invalid query',
		});

	try {
		const users = await db.user.findMany({
			where: {
				name: {
					contains: query,
				},
			},
			include: {
				userSearchHistory: {
					select: {
						serachedUserId:true
						
					},
				},
			},
		});
		

		const returnedUsers = users.map((user, i) => {
			return {
				id: user.id,
				name: user.name,
				desc: user.name,
				image: user.image,
				resultId: user.userSearchHistory[0]?.serachedUserId,
			};
		});

		return new NextResponse(JSON.stringify(returnedUsers), {
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
