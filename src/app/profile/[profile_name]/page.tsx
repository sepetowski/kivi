import { CommunitiesProfileCardsContener } from '@/components/conteners/communities/CommunitiesProfileCardsContener';
import { ProfileBanner } from '@/components/profile/banner/ProfileBanner';
import { GamesContent } from '@/components/profile/games/GamesContent';
import { ProfileInfo } from '@/components/profile/ProfileInfo';
import { CommunityAndGameSuspense } from '@/components/skieletons/susepnse/CommunityAndGameSuspense';
import { Separator } from '@/components/ui/separator';
import { getAuthSession } from '@/lib/auth';
import { getProfileInfo } from '@/lib/getProfileInfo';
import { getUserCommunities } from '@/lib/getUserCommunities';
import { getUserGames } from '@/lib/getUserGames';
import { Communities } from '@/types/communities';
import { User } from '@/types/user';
import { Game } from '@prisma/client';
import { Metadata } from 'next';
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

export async function generateMetadata({ params: { profile_name } }: Params): Promise<Metadata> {
	const userData: User = await getProfileInfo(profile_name);

	return {
		title: userData.name,
		description: `This is the page of ${userData.name} - Kivi social app for gamers `,
	};
}

const Profile = async ({ params: { profile_name }, searchParams }: Params) => {
	const session = await getAuthSession();
	if (!session) redirect('/sign-in');

	const currentPath = searchParams.info ? searchParams.info : 'posts';

	const userData: User = await getProfileInfo(profile_name);
	const userGames: Promise<Game[]> = getUserGames();
	const userCommunities: Promise<Communities[]> = getUserCommunities();

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
					<Suspense fallback={<CommunityAndGameSuspense />}>
						<GamesContent promise={userGames} sessionUserPage={userData.sessionUserPage} />
					</Suspense>
				)}
				{currentPath === 'communities' && (
					<Suspense fallback={<CommunityAndGameSuspense />}>
						<CommunitiesProfileCardsContener
							promise={userCommunities}
							sessionUserPage={userData.sessionUserPage}
						/>
					</Suspense>
				)}
			</main>
		</div>
	);
};
export default Profile;
