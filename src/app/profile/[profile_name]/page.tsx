import { ProfileBanner } from '@/components/profile/banner/ProfileBanner';
import { GamesContent } from '@/components/profile/games/GamesContent';
import { ProfileInfo } from '@/components/profile/ProfileInfo';
import { Separator } from '@/components/ui/separator';
import { getAuthSession } from '@/lib/auth';
import { getProfileInfo } from '@/lib/getProfileInfo';
import { getUserGames } from '@/lib/getUserGames';
import { User } from '@/types/user';
import { Game } from '@prisma/client';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

interface Params {
	params: {
		profile_name: string;
	};
	searchParams: {
		[key: string]: string | undefined;
	};
}

const Profile = async ({ params: { profile_name }, searchParams }: Params) => {
	const session = await getAuthSession();
	if (!session) redirect('/sign-in');

	const currentPath = searchParams.info ? searchParams.info : 'posts';

	const userData: User = await getProfileInfo(profile_name);
	const userGames: Promise<Game[]> = getUserGames();

	return (
		<div className='md:px-4 lg:px-8'>
			<ProfileBanner
				sessionUserPage={userData.sessionUserPage}
				userId={userData.id}
				backgroundImage={userData.backgroundImage}
			/>
			<ProfileInfo userData={userData} session={session} />
			<Separator />
			<main className='px-4 lg:px-8 w-full'>
				{currentPath === 'games' && (
					<Suspense  fallback={<p>loading</p>}>
						<GamesContent promise={userGames} sessionUserPage={userData.sessionUserPage} />
					</Suspense>
				)}
			</main>
		</div>
	);
};
export default Profile;
