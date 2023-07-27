import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getAuthSession } from '@/lib/auth';

export const POST = async (request: Request) => {
	const session = await getAuthSession();

	if (!session?.user)
		return new Response('Unauthorized', { status: 401, statusText: 'Unauthorized User' });
	const {
		commentId,
	}: {
		commentId: string;
	} = await request.json();

	if (!commentId)
		return new NextResponse('Missing Fields.', { status: 400, statusText: 'Missing Fields.' });

	try {
		const comment = await db.comment.findUnique({
			where: {
				id: commentId,
			},
		});
		if (!comment)
			return new NextResponse('Comment not found', {
				status: 404,
				statusText: 'Comment not found',
			});

		await db.comment.delete({
			where: {
				id: commentId,
			},
		});

		return new NextResponse('Comment was deleted.', {
			status: 200,
			statusText: 'Comment was deleted.',
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
