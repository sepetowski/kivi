import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getAuthSession } from '@/lib/auth';

export const POST = async (request: Request) => {
	const session = await getAuthSession();

	if (!session?.user)
		return new Response('Unauthorized', { status: 401, statusText: 'Unauthorized User' });
	const { picture, fileName }: { picture: string; fileName: string } = await request.json();

	if (!picture || !fileName)
		return new NextResponse('Missing Fields.', { status: 400, statusText: 'Missing Fields.' });

	try {
		const user = await db.user.findUnique({
			where: {
				id: session.user.id,
			},
		});

		if (!user)
			return new NextResponse(`No user found`, {
				status: 404,
				statusText: `No user found`,
			});

		await db.user.update({
			where: {
				id: session.user.id,
			},
			data: {
				backgroundImage: picture,
				backgroundImageFileName: fileName,
			},
		});

		return NextResponse.json(
			{ previousFileName: user.backgroundImageFileName },
			{ status: 200, statusText: 'Background image updated!' }
		);
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
