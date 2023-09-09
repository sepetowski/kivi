import { db } from '@/lib/db';
import { notFound } from 'next/navigation';
import { NextResponse } from 'next/server';

interface Params {
	params: {
		conversation_id: string;
	};
}

export const GET = async (request: Request, { params: { conversation_id } }: Params) => {
	const url = new URL(request.url);
	const userId = url.searchParams.get('userId');

	if (!conversation_id || !userId)
		return new NextResponse('Missing fields', {
			status: 400,
		});
	try {
		const converstaion = await db.conversation.findUnique({
			where: {
				id: conversation_id,
			},
			include: {
				users: {
					select: {
						id: true,
						image: true,
						name: true,
					},
				},
			},
		});

		const user = await db.user.findUnique({
			where: {
				id: userId,
			},
			include: {
				conversations: {
					select: {
						id: true,
					},
				},
			},
		});

		const userInConversation = user?.conversations.find((userConversation) =>
			userConversation.id === converstaion?.id ? true : false
		);
		if (!userInConversation) return notFound();

		return new NextResponse(JSON.stringify(converstaion), {
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
