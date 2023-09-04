import { db } from '@/lib/db';
import { Notify } from '@/types/notify';
import { NextResponse } from 'next/server';

export const GET = async (request: Request) => {
	const url = new URL(request.url);
	const userId = url.searchParams.get('userId');

	if (!userId)
		return new NextResponse('Missing fields', {
			status: 400,
		});
	try {
		const notifications = await db.notifications.findMany({
			where: {
				userId,
			},
			orderBy: {
				createdDate: 'desc',
			},
		});

		const extenedNotifications: Notify[] = notifications.map((notify) => ({
			...notify,
			name: '',
			image: '',
		}));

		for (const notifyInfo of extenedNotifications) {
			const user = await db.user.findUnique({
				where: {
					id: notifyInfo.acctionMadeByUserId,
				},
			});

			notifyInfo.name = user?.name;
			notifyInfo.image = user?.image;
		}

		return new NextResponse(JSON.stringify(extenedNotifications), {
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
