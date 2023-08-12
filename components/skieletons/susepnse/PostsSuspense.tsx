import React from 'react';
import { PostCardSuspense } from '../cards/PostCardSuspense';

export const PostsSuspense = () => {
	return (
		<div className='flex flex-col justify-center items-center gap-6  flex-wrap w-full my-8 '>
			<PostCardSuspense profilePage={true} />
			<PostCardSuspense profilePage={true} />
			<PostCardSuspense profilePage={true} />
		</div>
	);
};
