import React from 'react';
import { BrowseCommunityCard } from '@/components/cards/BrowseCommunityCard';
import { Community } from '@prisma/client';

interface Props {
	promise: Promise<Community[]>;
}

export const CommunitiesBrowseCardsContener = async ({ promise }: Props) => {
	const communities = await promise;
	return (
		<div className='flex justify-center flex-wrap mt-8 md:mt-12 gap-4 w-full items-center'>
			{communities.length !== 0 &&
				communities.map((communitiy) => <BrowseCommunityCard key={communitiy.id} name={communitiy.name} description={communitiy.description} id={communitiy.id} mebmers={communitiy.members} posts={communitiy.postCount} image={communitiy.image} />)}
		</div>
	);
};
