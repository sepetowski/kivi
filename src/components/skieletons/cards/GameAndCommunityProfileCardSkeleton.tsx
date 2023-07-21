import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

export const GameAndCommunityProfileCardSkeleton = () => {
	return (
		<div className='w-full  sm:w-[75%] lg:w-80 xl:w-96 h-52 relative rounded-lg border rouned-md overflow-hidden'>
			<Skeleton className='absolute bottom-0 left-0 w-full h-14 rounded-none ' />
		</div>
	);
};
