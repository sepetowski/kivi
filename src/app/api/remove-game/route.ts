import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getAuthSession } from '@/lib/auth';

export const POST = async (request: Request) => {
	const session = await getAuthSession();

	if (!session?.user)
		return new Response('Unauthorized', { status: 401, statusText: 'Unauthorized User' });
	const { id, gameName }: { id: string; gameName: String } = await request.json();

	if (!id || !gameName)
		return new NextResponse('Missing Fields.', { status: 400, statusText: 'Missing Fields.' });

	try {
		const user = await db.user.findUnique({
			where: {
				id: session.user.id,
			},
			include: {
				games: true,
			},
		});

		if (!user)
			return new NextResponse(`User not found`, {
				status: 404,
				statusText: `User not found`,
			});

		const hasGame = user.games.some((game) => game.id === id);

		if (!hasGame)
			return new NextResponse(`You dont't have this game in your profile. Noting to delete`, {
				status: 409,
				statusText: `You dont't have this game in your profile. Noting to delete`,
			});

		await db.game.delete({
			where: {
				id,
			},
		});

		return new NextResponse(`${gameName}  was deleted from  Your account!`, {
			status: 200,
			statusText: `${gameName}  was deleted from  Your account!`,
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
