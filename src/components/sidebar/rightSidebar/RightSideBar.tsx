import React from 'react';
import { Sidebar } from '@/components/sidebar/Sidebar';
import { Users2 } from 'lucide-react';
import { getUserCommunities } from '@/lib/getUserCommunities';
import { Communities } from '@/types/communities';
import { CommunityItem } from '@/components/sidebar/rightSidebar/CommunityItem';
import { ScrollArea } from '@/components/ui/scroll-area';
import Link from 'next/link';
export const RightSidebar = async () => {
	const communities = (await getUserCommunities()) as Communities[];
	return (
		<Sidebar left={true}>
			<div className='mt-24 w-full h-5/6 flex flex-col items-center lg:items-start p-4 lg:p-6 gap-6 lg:gap-10 text-sm '>
				<div className='flex gap-3 items-center '>
					<Users2 />
					<p className='hidden lg:inline font-bold uppercase text-center'>Your Communities</p>
				</div>
				<div className='w-full h-full flex flex-col   gap-4  xl:text-lg'>
					{communities.length !== 0 &&
						communities.map((community) => (
							<CommunityItem
								key={community.communityId}
								name={community.community.name}
								url={community.community.image}
							/>
						))}
					{communities.length === 0 && (
						<p className='text-center text-sm lg:text-base'>
							You have not join to any community yet.{' '}
							<Link className='font-bold cursor-pointer' href='/communities/browse'>
								Join now
							</Link>
						</p>
					)}
				</div>
			</div>
		</Sidebar>
	);
};
