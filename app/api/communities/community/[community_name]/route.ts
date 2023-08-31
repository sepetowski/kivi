import { db } from '@/lib/db';
import { PAGINATION_RESULTS } from '@/lib/pagineresutls';
import {  ExtednedCommunitiyPage } from '@/types/communities';
import { ExtednedPost } from '@/types/post';
import { NextResponse } from 'next/server';

interface Params {
	params: {
		community_name: string;
	};
}

export const GET = async (request: Request, { params: { community_name } }: Params) => {
	const url = new URL(request.url);

	const userId = url.searchParams.get('userId');

	try {
		const subscriptions = await db.subscription.findMany({
			where: {
				userId: userId ? userId : '',
			},
		});

		const community = await db.community.findUnique({
			where: {
				name: community_name,
			},
			include: {
				posts: {
					take: PAGINATION_RESULTS,
					include: {
						author: true,
						votes: true,
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
					orderBy: {
						createdAt: 'desc',
					},
				},

				subscription: true,
			},
		});
		if (!community) return new NextResponse('Community not found', { status: 404 });

		const userJoined =
			subscriptions.length > 0
				? !!subscriptions.find((subscription) => subscription.communityId === community.id)
				: false;

		const postsWithSaveStatus: ExtednedPost[] = community.posts.map((post) => ({
			...post,
			isSavedByUser: false,
		}));

		for (const post of postsWithSaveStatus) {
			const savedPost = await db.savedPost.findUnique({
				where: {
					userId_postId: {
						userId: userId ? userId : '',
						postId: post.id,
					},
				},
			});

			post.isSavedByUser = !!savedPost;
		}

		const updaetedCommunity: ExtednedCommunitiyPage = {
			...community,
			posts: [...postsWithSaveStatus],
			userJoined,
		};

		return new NextResponse(JSON.stringify(updaetedCommunity), {
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
