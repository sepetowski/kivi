import React from 'react';
import { votesReduce } from '@/lib/votesReduce';
import { ExtednedPost } from '@/types/post';
import { PostCard } from '@/components/cards/post/PostCard';
import { getAuthSession } from '@/lib/auth';
import { PostContener } from '../posts/PostContener';

interface Props {
	postsPromise: Promise<ExtednedPost[]>;
	userId: string;
	userName: string;
}

export const ProfileLikedPostsContener = async ({ postsPromise, userId, userName }: Props) => {
	const session = await getAuthSession();
	const posts = await postsPromise;

	return (
		<div className='w-full'>
			{posts.length === 0 && (
				<>
					{session && userId === session.user.id && (
						<p className='self-start'>You have not liked any post yet.</p>
					)}
					{session && userId !== session.user.id && (
						<p className='self-start'>{userName} has not liked any post yet.</p>
					)}
				</>
			)}
			{posts.length > 0 && (
				<PostContener initialPosts={posts} userId={userId} profilePage userLikes />
			)}
		</div>
	);
};
