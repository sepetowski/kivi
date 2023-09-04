import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getAuthSession } from '@/lib/auth';

export const POST = async (request: Request) => {
	const session = await getAuthSession();

	if (!session?.user)
		return new Response('Unauthorized', { status: 401, statusText: 'Unauthorized User' });
	const {
		postId,
		voteType,
		commentId,
	}: { postId: string; voteType: 'UP' | 'DOWN'; commentId: string } = await request.json();

	if (!postId || !voteType || !commentId)
		return new NextResponse('Missing Fields.', { status: 400, statusText: 'Missing Fields.' });

	try {
		const post = await db.post.findUnique({
			where: {
				id: postId,
			},
		});

		if (!post) {
			return new NextResponse('Post not found', { status: 404, statusText: 'Post not found' });
		}
		const comment = await db.comment.findUnique({
			where: {
				id: commentId,
			},
		});

		if (!comment) {
			return new NextResponse('Comment not found', {
				status: 404,
				statusText: 'Comment not found',
			});
		}

		const existingVote = await db.commentVote.findFirst({
			where: {
				userId: session.user.id,
				commentId,
			},
		});

		if (!existingVote) {
			await db.commentVote.create({
				data: {
					type: voteType,
					userId: session.user.id,
					commentId,
				},
			});

			if (comment.authorId !== session.user.id)
				await db.notifications.create({
					data: {
						userId: comment.authorId,
						acctionMadeByUserId: session.user.id,
						notifyType: voteType === 'UP' ? 'NEW_COMMENT_LIKE' : 'NEW_COMMENT_DISS_LIKE',
						commentId: comment.id,
						postsId: post.id,
					},
				});

			return new NextResponse('OK', { status: 200 });
		}

		if (existingVote && existingVote.type === voteType) {
			await db.commentVote.delete({
				where: {
					userId_commentId: {
						commentId,
						userId: session.user.id,
					},
				},
			});

			if (comment.authorId !== session.user.id) {
				const notify = await db.notifications.findFirst({
					where: {
						userId: comment.authorId,
						acctionMadeByUserId: session.user.id,
						commentId: comment.id,
						postsId: post.id,
						content: comment.text,
					},
				});

				if (notify)
					await db.notifications.delete({
						where: {
							id: notify.id,
						},
					});
			}

			return new NextResponse('OK', { status: 200 });
		}

		if (existingVote && existingVote.type !== voteType) {
			await db.commentVote.update({
				where: {
					userId_commentId: {
						commentId,
						userId: session.user.id,
					},
				},
				data: {
					type: voteType,
				},
			});

			if (comment.authorId !== session.user.id) {
				const notify = await db.notifications.findFirst({
					where: {
						userId: comment.authorId,
						acctionMadeByUserId: session.user.id,
						commentId: commentId,
						postsId: post.id,
					},
				});

				if (notify)
					await db.notifications.update({
						where: {
							id: notify.id,
						},
						data: {
							notifyType: voteType === 'UP' ? 'NEW_COMMENT_LIKE' : 'NEW_COMMENT_DISS_LIKE',
						},
					});
			}

			return new NextResponse('OK', { status: 200 });
		}
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
