import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

export const GameAndCommunityProfileCardSkeleton = () => {
	return (
		<div className='w-full sm:w-[calc((100%/2)-1.5rem)] 2xl:w-[calc((100%/3)-1.5rem)] h-52 relative rounded-lg border rouned-md overflow-hidden'>
			<Skeleton className='absolute bottom-0 left-0 w-full h-14 rounded-none ' />
		</div>
	);
};
