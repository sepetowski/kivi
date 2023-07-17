import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getAuthSession } from '@/lib/auth';

export const POST = async (request: Request) => {
	const session = await getAuthSession();

	if (!session?.user)
		return new Response('Unauthorized', { status: 401, statusText: 'Unauthorized User' });
	const { gameName, image }: { gameName: string; image: string } = await request.json();

	if (!gameName || !image)
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

		const hasAlreadyAdded = user.games.some((game) => game.gameName === gameName);

		if (hasAlreadyAdded)
			return new NextResponse(`You have already added ${gameName}  to your profile`, {
				status: 409,
				statusText: `You have already added ${gameName}  to your profile`,
			});

		await db.game.create({
			data: {
				gameName: gameName,
				userId: session.user.id,
				image,
			},
		});

		return new NextResponse(`${gameName}  was added to Your account!`, {
			status: 200,
			statusText: `${gameName}  was added to Your account!`,
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
