import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';


export const GET = async (request: Request) => {
	const session = await getAuthSession();
	if (!session?.user)
		return new Response('Unauthorized', { status: 401, statusText: 'Unauthorized User' });

	try {
		const communities = await db.community.findMany();

		if (!communities)
			return new NextResponse('no comunities found', {
				status: 404,
			});

		return NextResponse.json(communities, { status: 200 });
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
