import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { UserAvatarSkieleton } from '../avatars/UserAvatarSkieleton';

export const UserBannerskieleton = () => {
	return (
		<Skeleton className='w-full  h-52 md:h-72 xl:h-80  2xl:h-80  shadow-sm bg-muted-foreground border-b mx-auto  mt-24 md:mt-16 md:rounded-lg lg:rounded-xl '></Skeleton>
	);
};
