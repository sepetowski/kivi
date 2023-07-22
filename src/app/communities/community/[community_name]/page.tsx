import { getAuthSession } from '@/lib/auth';
import { getCommunity } from '@/lib/getCommunity';
import { Community } from '@prisma/client';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { generateUsernameInitials } from '@/lib/generateUsernameInitials';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/foramtDate';
import { PostCard } from '@/components/cards/post/PostCard';

interface Params {
	params: {
		community_name: string;
	};
}

export async function generateMetadata({ params: { community_name } }: Params): Promise<Metadata> {
	const communityData: Community = await getCommunity(community_name);

	return {
		title: communityData.name,
		description: `Page of ${communityData.name}  - Kivi social app for gamers `,
	};
}

const Community = async ({ params: { community_name } }: Params) => {
	const session = await getAuthSession();
	if (!session) redirect('/sign-in');
	const communityData: Community = await getCommunity(community_name);
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
			<main className=' w-full  mt-16 flex flex-col gap-6 max-w-[800px] mx-auto'>
				<PostCard />
				<PostCard />
				<PostCard />
			</main>
		</div>
	);
};
export default Community;
