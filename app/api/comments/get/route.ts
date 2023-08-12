import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export const GET = async (request: Request) => {
	const url = new URL(request.url);
	const postId = url.searchParams.get('postId');
	const session = await getAuthSession();
	if (!session?.user)
		return new Response('Unauthorized', { status: 401, statusText: 'Unauthorized User' });

	try {
		const comments = await db.comment.findMany({
			where: {
				postId: postId ? postId : '',
				replyToId: null,
			},
			include: {
				author: true,
				votes: true,
				replies: {
					include: {
						author: true,
						votes: true,
						replies: true,
					},
				},
			},
		});
		return new NextResponse(JSON.stringify(comments), {
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
