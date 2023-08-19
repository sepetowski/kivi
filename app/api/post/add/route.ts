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
		communityName,
		bucketName,
	}: {
		content: string;
		image: string | null;
		imageName: string | null;
		communityName: string;
		bucketName: string | null;
	} = await request.json();

	if (!content || !communityName)
		return new NextResponse('Missing Fields.', { status: 400, statusText: 'Missing Fields.' });

	try {
		const community = await db.community.findUnique({
			where: {
				name: communityName,
			},
		});

		if (!community)
			return new NextResponse('This community does not exist.', {
				status: 409,
				statusText: 'This community does not exist.',
			});

		const subscription = await db.subscription.findFirst({
			where: {
				communityId: community.id,
				userId: session.user.id,
			},
		});
		if (!subscription)
			return new NextResponse('You are not in this community. Please join first', {
				status: 409,
				statusText: 'You are not in this community. Please join first',
			});

		await db.post.create({
			data: {
				content,
				image,
				imageName,
				bucketName,
				authorId: session.user.id,
				communityId: community.id,
			},
		});
		await db.community.update({
			where: { id: community.id },
			data: { postCount: { increment: 1 } },
		});

		return new NextResponse('Post was created.', {
			status: 200,
			statusText: 'Post was created.',
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
