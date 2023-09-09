import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getAuthSession } from '@/lib/auth';
import { pusherServer } from '@/lib/pusher';

export const POST = async (request: Request) => {
	const session = await getAuthSession();

	if (!session?.user)
		return new Response('Unauthorized', { status: 401, statusText: 'Unauthorized User' });
	const {
		messageId,
		conversationId,
	}: {
		messageId: string;
		conversationId: string;
	} = await request.json();

	if (!messageId || !conversationId)
		return new NextResponse('Missing Fields.', { status: 400, statusText: 'Missing Fields.' });

	try {
		const message = await db.message.findFirst({
			where: {
				id: messageId,
			},
			include: {
				sender: {
					select: {
						id: true,
						image: true,
						name: true,
					},
				},
			},
		});

		if (message?.seen)
			return new NextResponse(JSON.stringify(message), {
				status: 200,
			});

		const upadtedMessage = await db.message.update({
			where: {
				id: messageId,
			},
			data: {
				seen: true,
			},
			include: {
				sender: {
					select: {
						id: true,
						image: true,
						name: true,
					},
				},
			},
		});

		const updatedMessageCreatedAt = upadtedMessage.createdAt;

		await db.message.updateMany({
			where: {
				createdAt: {
					lt: updatedMessageCreatedAt,
				},
				conversation: {
					id: conversationId,
				},
			},
			data: {
				seen: true,
			},
		});

		const updatedConversation = await db.conversation.update({
			where: {
				id: conversationId,
			},
			data: {
				lastMessageAt: new Date(),
				messages: {
					connect: {
						id: upadtedMessage.id,
					},
				},
			},
			include: {
				users: true,
				messages: {
					include: {
						sender: true,
					},
				},
			},
		});

		updatedConversation.users.map((user) => {
			pusherServer.trigger(user.email!, 'conversation:update', {
				id: conversationId,
				messages: [upadtedMessage],
			});
		});

		await pusherServer.trigger(conversationId, 'message:update', upadtedMessage);

		return new NextResponse(JSON.stringify(upadtedMessage), {
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
