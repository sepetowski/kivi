import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export const POST = async (request: Request) => {
	const session = await getAuthSession();

	if (!session?.user)
		return new Response('Unauthorized', { status: 401, statusText: 'Unauthorized User' });

	try {
		const user = await db.user.findUnique({
			where: {
				id: session.user.id,
			},
			include: {
				userSearchHistory: true,
			},
		});

		if (!user)
			return new NextResponse('No user found', { status: 404, statusText: 'No user found' });
		if (user.userSearchHistory.length === 0)
			return new NextResponse('Nothing to delete', {
				status: 400,
				statusText: 'Nothing to delete',
			});

		await db.userSearchHistory.deleteMany({
			where: {
				user: {
					id: user.id,
				},
			},
		});

		return new NextResponse('ok', {
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
