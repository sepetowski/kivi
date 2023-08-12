import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export const UserAvatarSkieleton = () => {
	return (
		<Skeleton className='w-20 h-20 mt-[-2.5rem] sm:w-24 sm:h-24 sm:mt-[-3rem] lg:w-28 lg:h-28 lg:mt-[-3.5rem] bg-muted relative rounded-full'></Skeleton>
	);
};
