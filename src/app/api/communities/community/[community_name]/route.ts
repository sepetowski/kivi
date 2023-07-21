import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

interface Params {
	params: {
		community_name: string;
	};
}

export const GET = async (request: Request, { params: { community_name } }: Params) => {
	const session = await getAuthSession();

	if (!session?.user)
		return new Response('Unauthorized', { status: 401, statusText: 'Unauthorized User' });

	try {
		const community = await db.community.findUnique({
			where: {
				name: community_name,
			},
		});

		if (!community) return new NextResponse('Community not found', { status: 404 });

		return new NextResponse(JSON.stringify(community), {
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
