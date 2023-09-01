import { db } from '@/lib/db';
import { ExtenedSerachHistory } from '@/types/searchHistory';
import { NextResponse } from 'next/server';

export const GET = async (request: Request) => {
	const url = new URL(request.url);
	const userId = url.searchParams.get('userId');

	try {
		const serachUsers = await db.userSearchHistory.findMany({
			where: {
				userId: userId ? userId : '',
			},
			orderBy: {
				serachDate: 'desc',
			},
		});

		const serachHistory: ExtenedSerachHistory[] = serachUsers.map((user) => ({
			...user,
			name: '',
			image: '',
			desc: '',
		}));

		for (const userData of serachHistory) {
			const user = await db.user.findUnique({
				where: {
					id: userData.serachedUserId,
				},
			});

			userData.name = user?.name;
			userData.image = user?.image;
			userData.desc = user?.profileDescription;
		}

		return new NextResponse(JSON.stringify(serachHistory), {
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
