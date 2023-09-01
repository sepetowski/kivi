import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export const POST = async (request: Request) => {
	const session = await getAuthSession();

	if (!session?.user)
		return new Response('Unauthorized', { status: 401, statusText: 'Unauthorized User' });
	const {
		serachdUserId,
		resultId,
	}: { serachdUserId: string | undefined; resultId: string | undefined } = await request.json();

	try {
		if (serachdUserId) {
			const account = await db.userSearchHistory.findFirst({
				where: {
					userId: session.user.id,
					serachedUserId: serachdUserId,
				},
			});
			if (!account)
				await db.userSearchHistory.create({
					data: {
						userId: session.user.id,
						serachedUserId: serachdUserId,
					},
				});
			else
				await db.userSearchHistory.update({
					where: {
						id: account.id,
					},
					data: {
						serachDate: new Date(),
					},
				});
		}
		if (resultId) {
			await db.userSearchHistory.update({
				where: {
					id: resultId,
				},
				data: {
					serachDate: new Date(),
				},
			});
		}
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
