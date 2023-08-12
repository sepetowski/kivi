import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getAuthSession } from '@/lib/auth';

export const PATCH = async (request: Request) => {
	const session = await getAuthSession();

	if (!session?.user)
		return new Response('Unauthorized', { status: 401, statusText: 'Unauthorized User' });
	const {
		comment,
		postId,
		reaplyToCommentId,
	}: {
		comment: string;
		reaplyToCommentId: string | null;
		postId: string | null;
		communityName: string;
	} = await request.json();

	if (!comment || !postId)
		return new NextResponse('Missing Fields.', { status: 400, statusText: 'Missing Fields.' });

	try {
		const post = await db.post.findUnique({
			where: {
				id: postId,
			},
		});

		if (!post)
			return new NextResponse('Post not found.', { status: 404, statusText: 'Post not found.' });

		await db.comment.create({
			data: {
				text: comment,
				postId,
				authorId: session.user.id,
				replyToId: reaplyToCommentId,
			},
		});

		return new NextResponse('Comment was created.', {
			status: 200,
			statusText: 'Comment was created.',
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
