import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { ExtednedPost } from '@/types/post';
import { NextResponse } from 'next/server';

interface Params {
	params: {
		post_id: string;
	};
}

export const GET = async (request: Request, { params: { post_id } }: Params) => {
	const session = await getAuthSession();

	if (!session?.user)
		return new Response('Unauthorized', { status: 401, statusText: 'Unauthorized User' });

	try {
		const post = await db.post.findUnique({
			where: {
				id: post_id,
			},
			include: {
				comments: {
					select: {
						id: true,
					},
				},
				author: true,
				votes: true,
				community: {
					select: {
						name: true,
					},
				},
			},
		});
		if (!post) return new NextResponse('Post not found', { status: 404 });

		const savedPost = await db.savedPost.findUnique({
			where: {
				userId_postId: {
					userId: session.user.id,
					postId: post.id,
				},
			},
		});

		return new NextResponse(JSON.stringify({ ...post, isSavedByUser: savedPost ? true : false }), {
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
