import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export const POST = async (request: Request) => {
	const session = await getAuthSession();

	if (!session?.user)
		return new Response('Unauthorized', { status: 401, statusText: 'Unauthorized User' });
	try {
		const savedPosts = await db.savedPost.findMany({
			where: {
				id: session.user.id,
			},
		});

		if (!savedPosts)
			return new NextResponse('No post to delete', {
				status: 404,
				statusText: 'No post to delete',
			});
            
		await db.savedPost.deleteMany({
			where: {
				user: {
					id: session.user.id,
				},
			},
		});

		return new NextResponse('All saved post deleted', {
			status: 200,
			statusText: 'All saved post deleted',
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
