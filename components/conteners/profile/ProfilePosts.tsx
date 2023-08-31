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
	paragrphs: [string, string];
	userLieks?: boolean;
}

export const ProfilePosts = async ({
	postsPromise,
	userId,
	userName,
	paragrphs,
	userLieks,
}: Props) => {
	const session = await getAuthSession();
	const posts = await postsPromise;

	return (
		<div className=' mt-6 '>
			{posts.length === 0 && (
				<>
					{session && userId === session.user.id && <p className='self-start'>{paragrphs[0]}</p>}
					{session && userId !== session.user.id && (
						<p className='self-start'>
							{userName}
							{''}
							{paragrphs[1]}
						</p>
					)}
				</>
			)}
			{posts.length > 0 && (
				<div className='max-w-[800px] mx-auto'>
					<PostContener
						initialPosts={posts}
						userId={userId}
						userName={userName}
						profilePage
						userLikes={userLieks}
					/>
				</div>
			)}
		</div>
	);
};
