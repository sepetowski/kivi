'use client';
import { PostCard } from '@/components/cards/post/PostCard';
import React from 'react';
import { ExtednedPost } from '@/types/post';
import { Loader2Icon } from 'lucide-react';
import { votesReduce } from '@/lib/votesReduce';
import { useInfinityScroll } from '@/hooks/useInfinityScroll';

interface Props {
	initialPosts: ExtednedPost[];
	userId: string;
	sessionUserId: string;
	communityName?: string;
	userName?: string;
	profilePage?: boolean;
	userLikes?: boolean;
	userSaved?: boolean;
}

export const PostContener = ({
	initialPosts,
	communityName,
	userId,
	userName,
	profilePage,
	sessionUserId,
	userLikes,
	userSaved,
}: Props) => {
	const { ref, isAllPostsFetched, posts, isFetchingNextPage } = useInfinityScroll(
		initialPosts,
		'/api/post/posts',
		[
			'infinite-query',
			communityName ? communityName : '',
			userName ? userName : '',
			userId ? userId : '',
			userLikes ? 'userLikes' : '',
			userSaved ? 'userSaved' : '',
		],
		communityName,
		userName,
		userId,
		userLikes,
		userSaved
	);


	return (
		<>
			<ul className={`w-full flex flex-col gap-6 ${profilePage && 'pt-6'}`}>
				{posts.map((post, i) => {
					const { UP, DOWN } = votesReduce(post);

					const userVote = post.votes.find((vote) => vote.userId === sessionUserId);

					if (i === posts.length - 1) {
						return (
							<li key={post.id} ref={ref}>
								<PostCard
									fileName={post.imageName}
									bucektName={post.bucketName}
									creatorId={post.authorId}
									userId={sessionUserId}
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
									isSavedByUser={post.isSavedByUser}
									profilePage={profilePage}
								/>
							</li>
						);
					} else {
						return (
							<PostCard
								key={post.id}
								fileName={post.imageName}
								bucektName={post.bucketName}
								creatorId={post.authorId}
								userId={sessionUserId}
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
								isSavedByUser={post.isSavedByUser}
								profilePage={profilePage}
							/>
						);
					}
				})}
			</ul>
			{isFetchingNextPage && (
				<li className='flex justify-center mt-8'>
					<Loader2Icon className='animate-spin' />
				</li>
			)}
			{!profilePage && isAllPostsFetched && (
				<li className='flex justify-center items-center text-center mt-8'>
					<p>That&apos;s all for now. You have seen everything &#128512;</p>
				</li>
			)}
		</>
	);
};
