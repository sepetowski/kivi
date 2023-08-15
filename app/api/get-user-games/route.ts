
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export const GET = async (request: Request) => {

	const url = new URL(request.url);

	const userId = url.searchParams.get('userId');


	try {
		const games = await db.game.findMany({
			where: {
				userId: userId ? userId : '',
			},
		});

		return new NextResponse(JSON.stringify(games), {
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
