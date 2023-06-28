import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export const POST = async (request: Request) => {
	const { gameId } = await request.json();

	if (!gameId)
		return new NextResponse('Missing Fields.', { status: 400, statusText: 'Missing Fields.' });

	try {
		const exisitingGame = await db.game.findFirst({
			where: {
				id: gameId,
			},
		});
		if (!exisitingGame)
			return new NextResponse('No game found', {
				status: 404,
				statusText: 'No game found',
			});

		await db.game.delete({
			where: {
				id: gameId,
			},
		});

		return new NextResponse('Game was deleted', {
			status: 200,
			statusText: 'Game was deleted',
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
