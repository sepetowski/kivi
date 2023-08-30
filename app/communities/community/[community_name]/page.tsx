import { getAuthSession } from '@/lib/auth';
import { getCommunity } from '@/lib/getCommunity';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { PostContener } from '@/components/conteners/posts/PostContener';
import { ExtednedCommunitiyPage } from '@/types/communities';
import { CommunityHeader } from '@/components/headers/CommunityHeader';

interface Params {
	params: {
		community_name: string;
	};
}

export async function generateMetadata({ params: { community_name } }: Params): Promise<Metadata> {
	const session = await getAuthSession();
	const communityData: ExtednedCommunitiyPage = await getCommunity(
		community_name,
		session ? session.user.id : ''
	);

	return {
		title: communityData.name,
		description: `Page of ${communityData.name}  - Kivi social app for gamers `,
	};
}

const Community = async ({ params: { community_name } }: Params) => {
	const session = await getAuthSession();
	if (!session) redirect('/sign-in');
	const communityData: ExtednedCommunitiyPage = await getCommunity(community_name, session.user.id);

	return (
		<div className=' w-full   px-4 lg:px-8  mt-36 md:mt-28 pb-6 mb-16'>
			<CommunityHeader
				userId={session.user.id}
				communityData={communityData}
				communityName={community_name}
			/>
			<PostContener
				initialPosts={communityData.posts}
				communityName={community_name}
				userId={session.user.id}
			/>
		</div>
	);
};
export default Community;
