import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getAuthSession } from '@/lib/auth';

export const GET = async (request: Request) => {
	const session = await getAuthSession();

	const url = new URL(request.url);
	const userId = url.searchParams.get('userId');

	if (!session?.user)
		return new Response('Unauthorized', { status: 401, statusText: 'Unauthorized User' });
	try {
		const communities = await db.subscription.findMany({
			where: {
				userId: userId ? userId : '',
			},
			include: {
				community: {
					select: {
						image: true,
						name: true,
					},
				},
			},
		});

		return new NextResponse(JSON.stringify(communities), {
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