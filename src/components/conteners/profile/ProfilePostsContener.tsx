'use client';

import React from 'react';
import { votesReduce } from '@/lib/votesReduce';
import { ExtednedPost } from '@/types/post';
import { PostCard } from '@/components/cards/post/PostCard';
import { useSession } from 'next-auth/react';

interface Props {
	posts: ExtednedPost[];
	userId: string;
	userName: string;
}

export const ProfilePostsContener = ({ posts, userId, userName }: Props) => {
	const session = useSession();

	return (
		<div className='flex gap-6 items-center flex-wrap w-full my-8 '>
			{posts.length === 0 && (
				<>
					{userId === session.data?.user.id && <p>You have not added any post yet.</p>}
					{userId !== session.data?.user.id && <p>{userName} has not added any post yet.</p>}
				</>
			)}
			{posts.length > 0 &&
				posts.map((post) => {
					const { UP, DOWN } = votesReduce(post);
					const userVote = post.votes.find((vote) => vote.userId === userId);
					return (
						<PostCard
							fileName={post.imageName}
							bucektName={post.bucketName}
							creatorId={post.authorId}
							key={post.id}
							userId={userId}
							postId={post.id}
							added={post.createdAt}
							communityName={post.community.name}
							content={post.content}
							userName={post.author.name}
							userImage={post.author.image}
							postImage={post.image}
							likes={UP}
							dislikes={DOWN}
							initialVote={userVote?.type}
							commentsLength={post.comments.length}
							wasEdited={post.wasEdited}
							imageUrl={post.image}
							horizontal={true}
						/>
					);
				})}
		</div>
	);
};
