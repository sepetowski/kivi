import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { PAGINATION_RESULTS } from '@/lib/pagineresutls';
import { NextResponse } from 'next/server';

export const GET = async (request: Request) => {
	const session = await getAuthSession();

	if (!session?.user)
		return new Response('Unauthorized', { status: 401, statusText: 'Unauthorized User' });

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
