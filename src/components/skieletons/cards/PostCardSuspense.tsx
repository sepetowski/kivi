import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface Props {
	profilePage?: boolean;
}

export const PostCardSuspense = ({ profilePage }: Props) => {
	return (
		<Skeleton
			className={`flex flex-col gap-4 rounded-lg border rouned-m p-6 ${
				profilePage && 'w-full max-w-4xl'
			}`}>
			<div className='flex justify-between items-center'>
				<div className='flex items-center justify-center gap-2'>
					<Skeleton className='w-12 h-12 rounded-full bg-card'></Skeleton>
					<div className='flex flex-col gap-2'>
						<Skeleton className='w-32 h-4  rouned-m bg-card'></Skeleton>
						<Skeleton className='w-20 h-4  rouned-m bg-card'></Skeleton>
					</div>
				</div>
			</div>
			<Skeleton className='w-full h-24  rouned-m bg-card'></Skeleton>
			<Skeleton className='w-40 h-6  rouned-m bg-card'></Skeleton>
		</Skeleton>
	);
};
