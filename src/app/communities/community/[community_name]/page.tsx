import { getAuthSession } from '@/lib/auth';
import { getCommunity } from '@/lib/getCommunity';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { generateUsernameInitials } from '@/lib/generateUsernameInitials';
import { formatDate } from '@/lib/foramtDate';
import { PostContener } from '@/components/conteners/posts/PostContener';
import { ExtednedCommunities } from '@/types/communities';

interface Params {
	params: {
		community_name: string;
	};
}

export async function generateMetadata({ params: { community_name } }: Params): Promise<Metadata> {
	const communityData: ExtednedCommunities = await getCommunity(community_name);

	return {
		title: communityData.name,
		description: `Page of ${communityData.name}  - Kivi social app for gamers `,
	};
}

const Community = async ({ params: { community_name } }: Params) => {
	const session = await getAuthSession();
	if (!session) redirect('/sign-in');
	const communityData: ExtednedCommunities = await getCommunity(community_name);
	const monthAndYear = formatDate(communityData.createdAt);

	return (
		<div className=' w-full   px-4 lg:px-8  mt-36 md:mt-28'>
			<header className='w-full'>
				<div className='flex  justify-between items-center border rounded-md p-4'>
					<div className='w-full flex items-center gap-4'>
						<Avatar className='w-20 h-20'>
							<AvatarImage src={communityData.image} alt={community_name} />
							<AvatarFallback>{generateUsernameInitials(community_name)}</AvatarFallback>
						</Avatar>
						<div>
							<h2>{communityData.name}</h2>
							<p className='text-sm text-muted-foreground max-w-xs'>{communityData.description}</p>
						</div>
					</div>
				</div>
			</header>
			<PostContener
				initialPosts={communityData.posts}
				communityName={community_name}
				userId={session.user.id}
			/>
		</div>
	);
};
export default Community;
