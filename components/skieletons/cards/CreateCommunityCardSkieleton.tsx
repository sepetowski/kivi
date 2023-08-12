import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export const CreateCommunityCardSkieleton = () => {
	return (
		<div className='flex flex-col gap-4  w-full h-auto border rounded-md p-4 lg:p-6'>
			<Skeleton className='w-1/2 md:w-1/3 h-10 ' />
			<Skeleton className='w-full h-16 ' />
			<div className='mt-4 flex flex-col gap-2'>
				<Skeleton className='w-28 h-6 ' />
				<Skeleton className='w-full h-10 ' />
			</div>
			<div className='mt-4 flex flex-col gap-2'>
				<Skeleton className='w-28 h-6 ' />
				<Skeleton className='w-full h-10 ' />
			</div>
			<div className='mt-4 flex flex-col gap-2'>
				<Skeleton className='w-28 h-6 ' />
				<Skeleton className='w-full h-10 ' />
			</div>

			<div className='flex items-center justify-end mt-6 gap-4'>
				<Skeleton className='w-36 h-10 ' />
				<Skeleton className='w-20 h-10 ' />
			</div>
		</div>
	);
};
