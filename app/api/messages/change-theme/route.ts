import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getAuthSession } from '@/lib/auth';
import { pusherServer } from '@/lib/pusher';
import { AvaibleThemes } from '@prisma/client';

export const POST = async (request: Request) => {
	const session = await getAuthSession();

	if (!session?.user)
		return new Response('Unauthorized', { status: 401, statusText: 'Unauthorized User' });
	const {
		theme,
		conversationId,
	}: {
		theme: AvaibleThemes;
		conversationId: string;
	} = await request.json();

	if (!theme || !conversationId)
		return new NextResponse('Missing Fields.', { status: 400, statusText: 'Missing Fields.' });

	try {
		const updatedConversation = await db.conversation.update({
			where: {
				id: conversationId,
			},
			data: {
				currentTheme: theme,
			},
			include: {
				users: true,
			},
		});

		updatedConversation.users.map((user) => {
			pusherServer.trigger(user.email!, 'theme:update', {
				id: conversationId,
				theme,
			});
		});

		return new NextResponse(JSON.stringify(updatedConversation), {
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
