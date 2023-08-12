import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { PAGINATION_RESULTS } from '@/lib/pagineresutls';
import { ExtednedPost } from '@/types/post';
import { NextResponse } from 'next/server';

export const GET = async (request: Request) => {
	const session = await getAuthSession();

	if (!session?.user)
		return new Response('Unauthorized', { status: 401, statusText: 'Unauthorized User' });

	try {
		const posts = await db.post.findMany({
			orderBy: {
				createdAt: 'desc',
			},
			include: {
				votes: true,
				author: true,
				comments: {
					select: {
						id: true,
					},
				},
				community: {
					select: {
						name: true,
					},
				},
			},
			take: PAGINATION_RESULTS,
		});

		const postsWithSaveStatus: ExtednedPost[] = posts.map((post) => ({
			...post,
			isSavedByUser: false, 
		}));

		for (const post of postsWithSaveStatus) {
			const savedPost = await db.savedPost.findUnique({
				where: {
					userId_postId: {
						userId: session.user.id,
						postId: post.id,
					},
				},
			});

			post.isSavedByUser = !!savedPost;
		}

		return new NextResponse(JSON.stringify(postsWithSaveStatus), {
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
