import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export const POST = async (request: Request) => {
	const { game, nickName, rank, playSince, gameId, userId } = await request.json();

	if (!game || !nickName || !gameId || !userId)
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

		const theSameGame = await db.game.findFirst({
			where: {
				userId: userId,
				gameName: game.toLowerCase(),
			},
		});

		if (theSameGame)
			return new NextResponse('You have to provide any changes', {
				status: 408,
				statusText: 'You have to provide any changes',
			});

		await db.game.update({
			where: {
				id: gameId,
			},
			data: {
				gameName: game.toLowerCase(),
				nickName,
				rank,
				playingSince: playSince,
			},
		});

		return new NextResponse('Game was edited', {
			status: 200,
			statusText: 'Game was edited',
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
