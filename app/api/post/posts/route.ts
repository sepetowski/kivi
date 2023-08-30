import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { ExtednedPost } from '@/types/post';
import { NextResponse } from 'next/server';

export const GET = async (request: Request) => {
	const url = new URL(request.url);

	const limit = url.searchParams.get('limit');
	const page = url.searchParams.get('page');
	const communityName = url.searchParams.get('communityName');
	const userName = url.searchParams.get('userName');
	

	const session = await getAuthSession();

	if (!session?.user)
		return new Response('Unauthorized', { status: 401, statusText: 'Unauthorized User' });

	try {
		let whereClause = {};

		if (communityName) {
			whereClause = {
				community: {
					name: communityName,
				},
			};
		}
		if (userName) {
			whereClause = {
				author: {
					name: userName,
				},
			};
		}
		const posts = await db.post.findMany({
			take: parseInt(limit ? limit : ''),
			skip: (parseInt(page ? page : '') - 1) * parseInt(limit ? limit : ''),
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
			where: whereClause,
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
