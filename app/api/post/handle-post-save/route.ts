import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getAuthSession } from '@/lib/auth';

export const POST = async (request: Request) => {
	const session = await getAuthSession();

	if (!session?.user)
		return new Response('Unauthorized', { status: 401, statusText: 'Unauthorized User' });
	const { postId }: { postId: string } = await request.json();

	if (!postId)
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

		const savedPost = await db.savedPost.findUnique({
			where: {
				userId_postId: {
					userId: session.user.id,
					postId: postId,
				},
			},
		});

		if (!savedPost) {
			await db.savedPost.create({
				data: {
					user: { connect: { id: session.user.id } },
					post: { connect: { id: postId } },
				},
			});
			return new NextResponse('Post was saved', { status: 200, statusText: 'Post was saved' });
		} else {
			await db.savedPost.delete({
				where: { userId_postId: { userId: session.user.id, postId: postId } },
			});
			return new NextResponse('Post was deleted from saved', { status: 200, statusText: 'Post was deleted from saved' });
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
