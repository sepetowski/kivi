import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export const BrowseCommunityCradSkieleton = () => {
	return (
		<div className='flex flex-col gap-4  w-full  sm:w-[75%] lg:w-80 xl:w-96 h-72 border rounded-md p-4 lg:p-6'>
			<div className='w-full flex justify-between items-center'>
				<Skeleton  className='w-2/3 h-7 ' />
				<Skeleton className='w-9 h-9 rounded-full ' />
			</div>
			<div className='flex  gap-2 flex-col'>
				<Skeleton className='w-28 h-5 ' />
				<Skeleton className='w-28 h-5 ' />
			</div>
			<Skeleton className='w-full h-16  ' />
			<div className='flex justify-end gap-2 items-center w-full'>
				<Skeleton className='w-20 h-9 ' />
				<Skeleton className='w-20 h-9' />
			</div>
		</div>
	);
};
