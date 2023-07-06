import React from 'react';

interface Props {
	postsNumber: number;
	followersNumber: number;
	followingNumber: number;
}

export const FollowsInfo = ({ followersNumber, followingNumber, postsNumber }: Props) => {
	return (
		<div className='w-full flex justify-start  items-center space-x-4 text-sm mt-4'>
			<div className='flex gap-1 items-center'>
				<p className='font-medium'>{postsNumber}</p>
				<p className='text-xs sm:text-sm text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
					posts
				</p>
			</div>

			<div className='flex gap-1 items-center'>
				<p className='font-medium'>{followersNumber}</p>
				<p className='text-xs sm:text-sm text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
					followers
				</p>
			</div>

			<div className='flex gap-1 items-center'>
				<p className='font-medium'>{followingNumber}</p>
				<p className='text-xs sm:text-sm text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
					following
				</p>
			</div>
		</div>
	);
};
