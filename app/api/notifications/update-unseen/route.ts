import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getAuthSession } from '@/lib/auth';

export const POST = async (request: Request) => {
	const session = await getAuthSession();

	if (!session?.user)
		return new Response('Unauthorized', { status: 401, statusText: 'Unauthorized User' });

	try {
		await db.notifications.updateMany({
			where: {
				userId: session.user.id,
			},
			data: {
				unseen: true,
			},
		});

		const upadtedNotifications = db.notifications.findMany({
			where: {
				userId: session.user.id,
			},
		});

		return new NextResponse(JSON.stringify(upadtedNotifications), {
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
