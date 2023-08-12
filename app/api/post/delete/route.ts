import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getAuthSession } from '@/lib/auth';

export const POST = async (request: Request) => {
	const session = await getAuthSession();

	if (!session?.user)
		return new Response('Unauthorized', { status: 401, statusText: 'Unauthorized User' });
	const {
		postId,
		communityName,
	}: {
		postId: string;
		communityName: string;
	} = await request.json();

	if (!postId)
		return new NextResponse('Missing Fields.', { status: 400, statusText: 'Missing Fields.' });

	try {
		const post = await db.post.findUnique({
			where: {
				id: postId,
			},
		});
		if (!post)
			return new NextResponse('Post not found', {
				status: 404,
				statusText: 'Post not found',
			});

		await db.post.delete({
			where: {
				id: postId,
			},
		});

		const community = await db.community.findUnique({
			where: {
				name: communityName,
			},
		});
		await db.community.update({
			where: { id: community!.id },
			data: { postCount: { decrement: 1 } },
		});

		return new NextResponse(
			JSON.stringify({ imageName: post.imageName, bucketName: post.bucketName }),
			{
				status: 200,
				statusText: 'Post was deleted',
			}
		);
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
