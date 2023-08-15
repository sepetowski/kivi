
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export const GET = async (request: Request) => {
	const url = new URL(request.url);

	const userId = url.searchParams.get('userId');
	try {
		const communities = await db.community.findMany();

		const subscriptions = await db.subscription.findMany({
			where: {
				userId: userId ? userId : '',
			},
		});

		if (communities.length === 0) return NextResponse.json([], { status: 200 });

		const userCommunities = communities.map((community, i) => {
			const userJoined =
				subscriptions.length > 0
					? !!subscriptions.find((subscription) => subscription.communityId === community.id)
					: false;

			return {
				...community,
				userJoined,
			};
		});

		if (!communities)
			return new NextResponse('no comunities found', {
				status: 404,
			});

		userCommunities.sort((a, b) => {
			if (b.members === a.members) {
				return b.postCount - a.postCount;
			}
			return b.members - a.members;
		});

		return NextResponse.json(userCommunities, { status: 200 });
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
