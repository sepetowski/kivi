import { db } from '@/lib/db';
import { PAGINATION_RESULTS } from '@/lib/pagineresutls';
import { NextResponse } from 'next/server';

export const GET = async (request: Request) => {
	const url = new URL(request.url);
	const userId = url.searchParams.get('userId');

	try {
		const posts = await db.post.findMany({
			orderBy: {
				createdAt: 'desc',
			},
			include: {
				votes: true,
				author: true,
				comments: {
					select: {
						id: true,
					},
				},
				community: {
					select: {
						name: true,
					},
				},
			},
			where: {
				votes: {
					some: {
						userId: userId ? userId : '',
						type: 'UP',
					},
				},
			},
			take: PAGINATION_RESULTS,
		});

		return new NextResponse(JSON.stringify(posts), {
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
