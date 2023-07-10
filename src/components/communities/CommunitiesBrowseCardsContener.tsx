import React from 'react';
import { BrowseCommunityCard } from '@/components/cards/BrowseCommunityCard';

export const CommunitiesBrowseCardsContener = () => {
	return (
		<div className='flex justify-center flex-wrap mt-8 gap-4 w-full items-center'>
			<BrowseCommunityCard />
			<BrowseCommunityCard />
			<BrowseCommunityCard />
			<BrowseCommunityCard />
			<BrowseCommunityCard />
			<BrowseCommunityCard />
		</div>
	);
};
