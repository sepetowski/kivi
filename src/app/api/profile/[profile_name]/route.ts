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

	try {
		const user = await db.user.findUnique({
			where: {
				name: profile_name,
			},
			include: {
				followers: true,
				following: true,
				post: true,
			},
		});

		if (!user) return new NextResponse('User not found', { status: 400 });

		const userInfo = {
			id: user.id,
			createdAt: user.createdAt,
			name: user.name,
			image: user.image,
			profileDescription: user.profileDescription,
			following: user.following,
			followers: user.followers,
			posts: user.post,
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
