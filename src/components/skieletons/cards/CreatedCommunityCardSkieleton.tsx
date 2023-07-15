import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export const CreatedCommunityCardSkieleton = () => {
	return (
		<div className='flex flex-col gap-4  w-full  border rounded-md p-4 lg:p-6'>
			<div className='w-full flex justify-between items-center'>
				<Skeleton  className='w-1/3 h-7 ' />
				<Skeleton className='w-14 h-14 rounded-full ' />
			</div>
			<div className='flex  gap-2 flex-col'>
				<Skeleton className='w-28 h-5 ' />
				<Skeleton className='w-28 h-5 ' />
			</div>
			<Skeleton className='w-4/5 h-16  ' />
			<div className='flex justify-end gap-2 items-center w-full'>
				<Skeleton className='w-20 h-9 ' />
				<Skeleton className='w-20 h-9' />
			</div>
		</div>
	);
};
