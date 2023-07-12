import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getAuthSession } from '@/lib/auth';

export const GET = async (request: Request) => {
	const session = await getAuthSession();

	if (!session?.user)
		return new Response('Unauthorized', { status: 401, statusText: 'Unauthorized User' });

	try {
		const user = await db.user.findUnique({
			where: {
				id: session.user.id,
			},
		});

		if (!user)
			return new NextResponse(`No user found`, {
				status: 404,
				statusText: `No user found`,
			});

		return NextResponse.json({ image: user.image }, { status: 200, statusText: 'Image loaded' });
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
