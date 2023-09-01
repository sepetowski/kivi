import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export const POST = async (request: Request) => {
	const session = await getAuthSession();

	if (!session?.user)
		return new Response('Unauthorized', { status: 401, statusText: 'Unauthorized User' });
	const { resultId }: { resultId: string | undefined } = await request.json();

	if (!resultId)
		return new NextResponse('nmisisng fields', {
			status: 400,
		});
	try {
		const account = await db.userSearchHistory.findFirst({
			where: {
				id: resultId,
			},
		});

		if (account)
			await db.userSearchHistory.delete({
				where: {
					id: resultId,
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
