import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export const POST = async (request: Request) => {
	const { game, nickName, rank, playSince, userId } = await request.json();

	if (!game || !nickName || !userId)
		return new NextResponse('Missing Fields.', { status: 400, statusText: 'Missing Fields.' });

	const user = await db.user.findFirst({
		where: {
			id: userId,
		},
	});

	if (!user) return new NextResponse('No user found', { status: 404, statusText: 'No user found' });

	const exisitingGame = await db.game.findFirst({
		where: {
			userId: userId,
			gameName: game.toLowerCase(),
		},
	});
	if (exisitingGame)
		return new NextResponse('Game is already added to account', {
			status: 404,
			statusText: 'Game is already added to account',
		});

	await db.game.create({
		data: {
			gameName: game.toLowerCase(),
			nickName: nickName,
			rank,
			playingSince: playSince,
			userId: user.id,
		},
	});
	return new NextResponse('Game was added to your account', {
		status: 200,
		statusText: 'Game was added to your account',
	});
};
