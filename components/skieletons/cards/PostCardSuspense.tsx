import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface Props {
	profilePage?: boolean;
}

export const PostCardSuspense = ({ profilePage }: Props) => {
	return (
		<Skeleton
			className={`flex flex-col gap-4 rounded-lg border rouned-m p-6 ${
				profilePage && 'w-full max-w-[800px]'
			}`}>
			<div className='flex justify-between items-center'>
				<div className='flex items-center justify-center gap-2'>
					<Skeleton className='w-10 h-10 rounded-full bg-card'></Skeleton>
					<div className='flex flex-col gap-2'>
						<Skeleton className='w-24 h-3  rouned-m bg-card'></Skeleton>
						<Skeleton className='w-16 h-3  rouned-m bg-card'></Skeleton>
					</div>
				</div>
			</div>
			<Skeleton className='w-full h-16  rouned-m bg-card'></Skeleton>
			<Skeleton className='w-32 h-5  rouned-m bg-card'></Skeleton>
		</Skeleton>
	);
};
