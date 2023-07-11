import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getAuthSession } from '@/lib/auth';

export const POST = async (request: Request) => {
	const session = await getAuthSession();

	if (!session?.user)
		return new Response('Unauthorized', { status: 401, statusText: 'Unauthorized User' });
	const { picture }: { picture: string } = await request.json();

	console.log(picture);

	if (!picture)
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

		const updatedUser = await db.user.update({
			where: {
				id: session.user.id,
			},
			data: {
				image: picture,
			},
		});

		return NextResponse.json(updatedUser, { status: 200, statusText: 'Profile picture updated!' });
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
