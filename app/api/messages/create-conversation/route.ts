import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getAuthSession } from '@/lib/auth';
import { pusherServer } from '@/lib/pusher';

export const POST = async (request: Request) => {
	const session = await getAuthSession();

	if (!session?.user)
		return new Response('Unauthorized', { status: 401, statusText: 'Unauthorized User' });
	const {
		connectToUserId,
	}: {
		connectToUserId: string;
	} = await request.json();

	if (!connectToUserId)
		return new NextResponse('Missing Fields.', { status: 400, statusText: 'Missing Fields.' });

	try {
		const conversation = await db.conversation.findFirst({
			where: {
				AND: [
					{
						users: {
							some: {
								id: session.user.id,
							},
						},
					},
					{
						users: {
							some: {
								id: connectToUserId,
							},
						},
					},
				],
			},
		});

		if (conversation)
			return new NextResponse(JSON.stringify(conversation.id), {
				status: 200,
			});

		if (session.user.id === connectToUserId) {
			const sameUserConversation = await db.conversation.create({
				data: {
					users: {
						connect: [
							{
								id: session.user.id,
							},
						],
					},
				},
			});

			return new NextResponse(JSON.stringify(sameUserConversation.id), {
				status: 200,
			});
		}

		const newConversation = await db.conversation.create({
			data: {
				users: {
					connect: [
						{
							id: session.user.id,
						},
						{
							id: connectToUserId,
						},
					],
				},
			},
			include: {
				users: {
					select: {
						id: true,
						email: true,
						image: true,
						name: true,
					},
				},
			},
		});

		newConversation.users.map((user) => {
			if (user.email) {
				pusherServer.trigger(user.email, 'conversation:new', newConversation);
			}
		});

		return new NextResponse(JSON.stringify(newConversation.id), {
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
