import React from 'react';
import { GameAndCommunityProfileCardSkeleton } from '../cards/GameAndCommunityProfileCardSkeleton';

export const CommunityAndGameSuspense = () => {
	return (
		<div className=' flex gap-6 items-center flex-wrap w-full my-8'>
			<GameAndCommunityProfileCardSkeleton />
			<GameAndCommunityProfileCardSkeleton />
			<GameAndCommunityProfileCardSkeleton />
		</div>
	);
};
