'use client';
import { PostCard } from '@/components/cards/post/PostCard';
import React, { useRef } from 'react';
import { useIntersection } from '@mantine/hooks';
import { useInfiniteQuery } from '@tanstack/react-query';
import { PAGINATION_RESULTS } from '@/lib/pagineresutls';
import { ExtednedPost } from '@/types/post';

interface Props {
	initialPosts: ExtednedPost[];
	communityName?: string;
	userId: string;
}

export const PostContener = ({ initialPosts, communityName, userId }: Props) => {
	const lastPostRef = useRef<null | HTMLElement>(null);

	const { entry, ref } = useIntersection({
		root: lastPostRef.current,
		threshold: 1,
	});
	const { data, isFetchingNextPage, fetchNextPage } = useInfiniteQuery(
		['infinite-query'],
		async ({ pageParam = 1 }) => {
			const query =
				`/api/post/posts?limit=${PAGINATION_RESULTS}&page=${pageParam}` +
				(!!communityName ? `&communityName=${communityName}` : '');

			const res = await fetch(query);
			const data = (await res.json()) as ExtednedPost[];
			return data;
		},
		{
			getNextPageParam: (_, pages) => {
				return pages.length + 1;
			},
			initialData: { pages: [initialPosts], pageParams: [1] },
		}
	);

	const posts = data?.pages.flatMap((page) => page) ?? initialPosts;

	return (
		<main className=' w-full  mt-16  max-w-[800px] mx-auto'>
			<ul className='w-full flex flex-col gap-6'>
				{posts.map((post, i) => {
					const { UP, DOWN } = post.votes.reduce(
						(counts, vote) => {
							if (vote.type === 'UP') {
								counts.UP++;
							} else if (vote.type === 'DOWN') {
								counts.DOWN++;
							}
							return counts;
						},
						{ UP: 0, DOWN: 0 }
					);

					const userVote = post.votes.find((vote) => vote.userId === userId);

					if (i === posts.length - 1) {
						return (
							<li key={post.id} ref={ref}>
								<PostCard
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
								/>
							</li>
						);
					} else {
						return (
							<PostCard
								key={post.id}
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
							/>
						);
					}
				})}
			</ul>
		</main>
	);
};
