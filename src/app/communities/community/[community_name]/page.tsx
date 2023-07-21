import { getAuthSession } from '@/lib/auth';
import { getCommunity } from '@/lib/getCommunity';
import { Community } from '@prisma/client';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { generateUsernameInitials } from '@/lib/generateUsernameInitials';
import Image from 'next/image';

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

	return (
		<div className='w-full mt-16 '>
			<header className='w-full bg-secondary h-48'>
				<div className='w-full h-full mx-auto max-w-[800px] flex justify-start items-center'>
					<Avatar className='w-20 h-20'>
						<AvatarImage src={communityData.image} alt={communityData.name} />
						<AvatarFallback>{generateUsernameInitials(communityData.name)}</AvatarFallback>
					</Avatar>
				</div>
			</header>
			<main className=' px-4 lg:px-8   max-w-[800px] mx-auto  bg-red-950  mt-16 '>
				{communityData.name}
			</main>
		</div>
	);
};
export default Community;
