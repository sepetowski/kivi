import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getAuthSession } from '@/lib/auth';

export const POST = async (request: Request) => {
	const session = await getAuthSession();

	if (!session?.user)
		return new Response('Unauthorized', { status: 401, statusText: 'Unauthorized User' });
	const { postId, voteType }: { postId: string; voteType: 'UP' | 'DOWN' } = await request.json();

	if (!postId || !voteType)
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

		const existingVote = await db.vote.findFirst({
			where: {
				userId: session.user.id,
				postId,
			},
		});

		if (!existingVote) {
			await db.vote.create({
				data: {
					type: voteType,
					userId: session.user.id,
					postId,
				},
			});
			return new NextResponse('OK', { status: 200 });
		}

		if (existingVote && existingVote.type === voteType) {
			await db.vote.delete({
				where: {
					userId_postId: {
						postId,
						userId: session.user.id,
					},
				},
			});

			return new NextResponse('OK', { status: 200 });
		}

		if (existingVote && existingVote.type !== voteType) {
			await db.vote.update({
				where: {
					userId_postId: {
						postId,
						userId: session.user.id,
					},
				},
				data: {
					type: voteType,
				},
			});
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
