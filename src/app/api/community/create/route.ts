import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getAuthSession } from '@/lib/auth';

export const POST = async (request: Request) => {
	const session = await getAuthSession();

	if (!session?.user)
		return new Response('Unauthorized', { status: 401, statusText: 'Unauthorized User' });
	const {
		name,
		description,
		picture,
		fileName,
	}: { name: string; description: string; picture: string; fileName: string } =
		await request.json();

	console.log(picture);

	const communityName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
	console.log(communityName);

	if (!name || !description || !picture || !fileName)
		return new NextResponse('Missing Fields.', { status: 400, statusText: 'Missing Fields.' });

	try {
		const community = await db.community.findUnique({
			where: {
				name: communityName,
			},
		});

		if (community)
			return new NextResponse(
				`This community already exist, join to ${communityName} or create other.`,
				{
					status: 409,
					statusText: `This community already exist, join to ${communityName} or create other.`,
				}
			);

		const createdCommunity = await db.community.create({
			data: {
				name: communityName,
				description,
				creatorId: session.user.id,
				image: picture,
				fileName,
			},
		});

		await db.subscription.create({
			data: {
				userId: session.user.id,
				communityId: createdCommunity.id,
			},
		});

		return new NextResponse(`${communityName} Community was created sucesfully!`, {
			status: 200,
			statusText: `${communityName} Community was created sucesfully!`,
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
