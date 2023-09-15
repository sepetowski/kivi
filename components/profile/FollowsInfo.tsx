import React from 'react';
import { FollowInfo } from './FollowInfo';

interface Props {
	postsNumber: number;
	followersNumber: number;
	followingNumber: number;
}

export const FollowsInfo = ({ followersNumber, followingNumber, postsNumber }: Props) => {
	return (
		<div className='w-full flex justify-start  items-center space-x-3 text-sm mt-4'>
			<FollowInfo text='posts' number={postsNumber} />
			<FollowInfo text='followers' number={followersNumber} />
			<FollowInfo text='following' number={followingNumber} />
		</div>
	);
};
