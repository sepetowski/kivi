import React from 'react';
import { votesReduce } from '@/lib/votesReduce';
import { ExtednedPost } from '@/types/post';
import { PostCard } from '@/components/cards/post/PostCard';
import { getAuthSession } from '@/lib/auth';

interface Props {
	posts: ExtednedPost[];
	userId: string;
	userName: string;
}

export const ProfilePostsContener = async ({ posts, userId, userName }: Props) => {
	const session = await getAuthSession();

	return (
		<div className='flex flex-col justify-center items-center gap-6  flex-wrap w-full my-8 '>
			{posts.length === 0 && (
				<>
					{session && userId === session.user.id && (
						<p className='self-start'>You have not added any post yet.</p>
					)}
					{session && userId !== session.user.id && (
						<p className='self-start'>{userName} has not added any post yet.</p>
					)}
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
							profilePage={true}
							isSavedByUser={post.isSavedByUser}
						/>
					);
				})}
		</div>
	);
};
