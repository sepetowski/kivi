import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getAuthSession } from '@/lib/auth';

export const POST = async (request: Request) => {
	const session = await getAuthSession();

	if (!session?.user)
		return new Response('Unauthorized', { status: 401, statusText: 'Unauthorized User' });

	const { notifyId }: { notifyId: string } = await request.json();

	if (!notifyId)
		return new NextResponse('Missing Fields.', { status: 400, statusText: 'Missing Fields.' });

	try {
		const notify = await db.notifications.findUnique({
			where: {
				id: notifyId,
			},
		});
		if (!notify)
			return new NextResponse('Notify not found', { status: 404, statusText: 'Notify not found' });

		await db.notifications.update({
			where: {
				id: notify.id,
			},
			data: {
				cliked: !notify.cliked,
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
