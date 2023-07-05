import React from 'react';
import { Separator } from '@/components/ui/separator';

interface Props {
	postsNumber: number;
	followersNumber: number;
	followingNumber: number;
}

export const FollowsInfo = ({ followersNumber, followingNumber, postsNumber }: Props) => {
	return (
		<div className='flex h-10 sm:h-12 items-center space-x-8 text-sm mt-5 sm:mt-6 sm:text-lg'>
			<div className='flex flex-col justify-center items-center'>
				<p>{postsNumber}</p>
				<p className='text-xs sm:text-sm text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
					posts
				</p>
			</div>
			<Separator orientation='vertical' />
			<div className='flex flex-col justify-center items-center '>
				<p>{followersNumber}</p>
				<p className='text-xs sm:text-sm text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
					followers
				</p>
			</div>
			<Separator orientation='vertical' />
			<div className='flex flex-col justify-center items-center'>
				<p>{followingNumber}</p>
				<p className='text-xs sm:text-sm text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
					following
				</p>
			</div>
		</div>
	);
};
