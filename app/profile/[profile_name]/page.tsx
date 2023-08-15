import { CommunitiesProfileCardsContener } from '@/components/conteners/communities/CommunitiesProfileCardsContener';
import { ProfileLikedPostsContener } from '@/components/conteners/profile/ProfileLikedPostsContener';
import { ProfilePostsContener } from '@/components/conteners/profile/ProfilePostsContener';
import { ProfileBanner } from '@/components/profile/banner/ProfileBanner';
import { GamesContent } from '@/components/profile/games/GamesContent';
import { ProfileInfo } from '@/components/profile/ProfileInfo';
import { CommunityAndGameSuspense } from '@/components/skieletons/susepnse/CommunityAndGameSuspense';
import { PostsSuspense } from '@/components/skieletons/susepnse/PostsSuspense';
import { Separator } from '@/components/ui/separator';
import { getAuthSession } from '@/lib/auth';
import { getProfileInfo } from '@/lib/getProfileInfo';
import { getProfileUserCommunities } from '@/lib/getProfileUserCommunities';
import { getProfileUserLikedPosts } from '@/lib/getProfileUserLikedPosts';
import { getUserGames } from '@/lib/getUserGames';
import { Communities } from '@/types/communities';
import { ExtednedPost } from '@/types/post';
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
	const session = await getAuthSession();

	const userData: User = await getProfileInfo(profile_name, session ? session.user.name! : '');

	return {
		title: userData.name,
		description: `This is the page of ${userData.name} - Kivi social app for gamers `,
	};
}

const Profile = async ({ params: { profile_name }, searchParams }: Params) => {
	const session = await getAuthSession();
	if (!session) redirect('/sign-in');

	const currentPath = searchParams.info ? searchParams.info : 'posts';

	const userData: User = await getProfileInfo(profile_name, session.user.name!);
	const userGames: Promise<Game[]> = getUserGames(userData.id);
	const userCommunities: Promise<Communities[]> = getProfileUserCommunities(userData.id);
	const userLikedPosts: Promise<ExtednedPost[]> = getProfileUserLikedPosts(userData.id);

	return (
		<div className='md:px-4 lg:px-8 '>
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
				{currentPath === '' ||
					(currentPath === 'posts' && (
						<ProfilePostsContener
							posts={userData.posts}
							userId={userData.id}
							userName={userData.name}
						/>
					))}
				{currentPath === 'likes' && (
					<Suspense fallback={<PostsSuspense />}>
						<ProfileLikedPostsContener
							postsPromise={userLikedPosts}
							userId={userData.id}
							userName={userData.name}
						/>
					</Suspense>
				)}
			</main>
		</div>
	);
};
export default Profile;
