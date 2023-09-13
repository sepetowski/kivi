import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getAuthSession } from '@/lib/auth';
import { pusherServer } from '@/lib/pusher';

export const POST = async (request: Request) => {
	const session = await getAuthSession();

	if (!session?.user)
		return new Response('Unauthorized', { status: 401, statusText: 'Unauthorized User' });
	const {
		message,
		conversationId,
	}: {
		message: string;
		conversationId: string;
	} = await request.json();

	if (!message || !conversationId)
		return new NextResponse('Missing Fields.', { status: 400, statusText: 'Missing Fields.' });

	try {
		const newMessage = await db.message.create({
			data: {
				message,
				conversation: {
					connect: { id: conversationId },
				},
				sender: {
					connect: { id: session.user.id },
				},
			},
			include: {
				sender: true,
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
						id: newMessage.id,
					},
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
				messages: {
					include: {
						sender: true,
					},
				},
			},
		});

		await pusherServer.trigger(conversationId, 'messages:new', newMessage);

		updatedConversation.users.map((user) => {
			pusherServer.trigger(user.email!, 'conversation:update', {
				id: conversationId,
				messages: [newMessage],
				users: [updatedConversation.users],
			});
		});

		return new NextResponse(JSON.stringify(newMessage), {
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
