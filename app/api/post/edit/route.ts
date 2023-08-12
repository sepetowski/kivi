import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getAuthSession } from '@/lib/auth';

export const POST = async (request: Request) => {
	const session = await getAuthSession();

	if (!session?.user)
		return new Response('Unauthorized', { status: 401, statusText: 'Unauthorized User' });
	const {
		content,
		image,
		imageName,
		postId,
		bucketName,
	}: {
		content: string;
		image: string | null;
		imageName: string | null;
		postId: string;
		bucketName: string | null;
	} = await request.json();

	if (!content || !postId)
		return new NextResponse('Missing Fields.', { status: 400, statusText: 'Missing Fields.' });

	try {
		const post = await db.post.findUnique({
			where: {
				id: postId,
			},
		});
		if (!post)
			return new NextResponse('This post does not exist.', {
				status: 409,
				statusText: 'This post does not exist.',
			});

		await db.post.update({
			where: {
				id: postId,
			},
			data: {
				content,
				image,
				imageName,
				bucketName,
				wasEdited: true,
			},
		});

		return new NextResponse('Post was updated.', {
			status: 200,
			statusText: 'Post was updated.',
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
