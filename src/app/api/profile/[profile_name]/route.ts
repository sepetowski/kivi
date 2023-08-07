import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

interface Params {
	params: {
		profile_name: string;
	};
}

export const GET = async (request: Request, { params: { profile_name } }: Params) => {
	const session = await getAuthSession();

	if (!session?.user)
		return new Response('Unauthorized', { status: 401, statusText: 'Unauthorized User' });

	try {
		const user = await db.user.findUnique({
			where: {
				name: profile_name,
			},
			include: {
				followers: true,
				following: true,
				post: {
					include: {
						votes: true,
						author: true,
						comments: {
							select: {
								id: true,
							},
						},
						community: {
							select: {
								name: true,
							},
						},
					},
				},
			},
		});

		if (!user) return new NextResponse('User not found', { status: 404 });

		const userInfo = {
			id: user.id,
			createdAt: user.createdAt,
			name: user.name,
			image: user.image,
			profileDescription: user.profileDescription,
			following: user.following,
			followers: user.followers,
			posts: user.post,
			backgroundImage: user.backgroundImage,
		};

		if (session?.user?.name === profile_name)
			return new NextResponse(JSON.stringify({ ...userInfo, sessionUserPage: true }), {
				status: 200,
			});
		else
			return new NextResponse(JSON.stringify({ ...userInfo, sessionUserPage: false }), {
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
