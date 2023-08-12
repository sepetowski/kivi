import React from 'react';
import { PostCard } from '@/components/cards/post/PostCard';
import { votesReduce } from '@/lib/votesReduce';
import { ExtednedPost } from '@/types/post';
import { Frown } from 'lucide-react';
import Image from 'next/image';
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
									isSavedByUser={true}
									savedPage={true}
								/>
							);
						})}
				</div>
			)}
		</>
	);
};
