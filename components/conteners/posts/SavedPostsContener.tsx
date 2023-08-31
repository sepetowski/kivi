import React from 'react';
import { ExtednedPost } from '@/types/post';
import { Frown } from 'lucide-react';
import Image from 'next/image';
import { PostContener } from './PostContener';
interface Props {
	posts: ExtednedPost[];
	userId: string;
}

export const SavedPostsContener = ({ posts, userId }: Props) => {
	return (
		<>
			{posts.length === 0 && (
				<div className='flex flex-col items-center justify-center mt-40 gap-12'>
					<div className='flex items-center justify-center gap-2'>
						<p className='text-lg md:text-xl lg:text-2xl'>You have not saved any post yet. </p>
						<Frown />
					</div>
					<div className='relative w-96 h-96 lg:w-[30rem] lg:h-[30rem]'>
						<Image className='object-cover' fill src='/empty.png' alt='' />
					</div>
				</div>
			)}
			{posts.length > 0 && (
				<div className='w-full flex flex-col gap-6 '>
					<PostContener initialPosts={posts} userId={userId} profilePage userSaved />
				</div>
			)}
		</>
	);
};
