import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

export const GameAndCommunityProfileCardSkeleton = () => {
	return (
		<Skeleton className='w-full sm:w-[calc((100%/2)-1.5rem)] 2xl:w-[calc((100%/3)-1.5rem)] h-52  rounded-lg border rouned-md '></Skeleton>
	);
};
