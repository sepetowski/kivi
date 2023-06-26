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
		});

		if (!user) return new NextResponse('User not found', { status: 400 });

		if (session?.user?.name === profile_name)
			return new NextResponse(
				JSON.stringify({
					email: user.email,
					createdAt: user.createdAt,
					name: user.name,
					image: user.image,
					sessionUserPage: true,
				}),
				{ status: 200 }
			);
		else
			return new NextResponse(
				JSON.stringify({
					createdAt: user.createdAt,
					name: user.name,
					image: user.image,
					sessionUserPage: false,
				}),
				{ status: 200 }
			);
	} catch (err) {
		return new NextResponse('Database Error', { status: 500 });
	}
};
