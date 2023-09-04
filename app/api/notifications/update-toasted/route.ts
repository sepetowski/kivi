import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getAuthSession } from '@/lib/auth';

export const POST = async (request: Request) => {
	const session = await getAuthSession();

	if (!session?.user)
		return new Response('Unauthorized', { status: 401, statusText: 'Unauthorized User' });
	const { id }: { id: string } = await request.json();

	if (!id)
		return new NextResponse('Missing Fields.', { status: 400, statusText: 'Missing Fields.' });

	try {
		await db.notifications.update({
			where: {
				id,
			},
			data: {
				toasted: true,
			},
		});

		const upadtedNotifications = db.notifications.findMany({
			where: {
				userId: session.user.id,
				toasted: false,
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
