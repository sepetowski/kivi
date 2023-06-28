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
				games: true,
				subscription: true,
				followers: true,
				following: true,
				post: true,
				createdCategories: true,
			},
		});

		if (!user) return new NextResponse('User not found', { status: 400 });

		const userInfo = {
			id: user.id,
			createdAt: user.createdAt,
			name: user.name,
			image: user.image,
			profileDescription: user.profileDescription,
			games: user.games,
			following: user.following,
			followers: user.followers,
			posts: user.post,
			subscriptions: user.subscription,
			createdCategories: user.createdCategories,
		
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
		return new NextResponse('Database Error', { status: 500 });
	}
};
