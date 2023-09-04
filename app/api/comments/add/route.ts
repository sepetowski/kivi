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
		reaplyAuthorId,
	}: {
		comment: string;
		reaplyToCommentId: string | null;
		postId: string | null;
		communityName: string;
		reaplyAuthorId: string | undefined;
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

		const createdComment = await db.comment.create({
			data: {
				text: comment,
				postId,
				authorId: session.user.id,
				replyToId: reaplyToCommentId,
			},
		});

		if (!reaplyToCommentId && post.authorId !== session.user.id)
			await db.notifications.create({
				data: {
					userId: post.authorId,
					acctionMadeByUserId: session.user.id,
					notifyType: 'NEW_COMMENT',
					postsId: post.id,
					commentId: createdComment.id,
					content: comment,
				},
			});

		if (reaplyToCommentId && reaplyAuthorId && reaplyAuthorId !== session.user.id) {
			await db.notifications.create({
				data: {
					userId: reaplyAuthorId,
					acctionMadeByUserId: session.user.id,
					notifyType: 'NEW_REPALY',
					postsId: post.id,
					commentId: createdComment.id,
					content: comment,
				},
			});
		}

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
