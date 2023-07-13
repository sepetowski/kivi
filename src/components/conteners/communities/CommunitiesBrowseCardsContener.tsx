import React from 'react';
import { BrowseCommunityCard } from '@/components/cards/community/BrowseCommunityCard';
import { BrowseCommunity } from '@/types/communities';

interface Props {
	promise: Promise<BrowseCommunity[]>;
}

export const CommunitiesBrowseCardsContener = async ({ promise }: Props) => {
	const communities = await promise;
	return (
		<div className='flex justify-center flex-wrap mt-8 md:mt-12 gap-4 w-full items-center'>
			{communities.length !== 0 &&
				communities.map((communitiy) => (
					<BrowseCommunityCard
						key={communitiy.id}
						name={communitiy.name}
						description={communitiy.description}
						id={communitiy.id}
						members={communitiy.members}
						posts={communitiy.postCount}
						image={communitiy.image}
						userJoined={communitiy.userJoined}
						creatorId={communitiy.creatorId}
					/>
				))}
		</div>
	);
};
