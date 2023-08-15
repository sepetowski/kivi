
import { db } from '@/lib/db';
import { PAGINATION_RESULTS } from '@/lib/pagineresutls';
import { NextResponse } from 'next/server';

interface Params {
	params: {
		community_name: string;
	};
}

export const GET = async (request: Request, { params: { community_name } }: Params) => {
	

	try {
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
		return new NextResponse(JSON.stringify(community), {
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
