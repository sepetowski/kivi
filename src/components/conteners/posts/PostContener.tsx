'use client';
import { PostCard } from '@/components/cards/post/PostCard';
import React, { useEffect, useRef, useState } from 'react';
import { useIntersection } from '@mantine/hooks';
import { useInfiniteQuery } from '@tanstack/react-query';
import { PAGINATION_RESULTS } from '@/lib/pagineresutls';
import { ExtednedPost } from '@/types/post';
import { Loader2Icon } from 'lucide-react';
import { votesReduce } from '@/lib/votesReduce';

interface Props {
	initialPosts: ExtednedPost[];
	communityName?: string;
	userId: string;
}

export const PostContener = ({ initialPosts, communityName, userId }: Props) => {
	const lastPostRef = useRef<null | HTMLElement>(null);
	const [isAllPostsFetched, setIsAllPostsFetched] = useState(false);

	const { entry, ref } = useIntersection({
		root: lastPostRef.current,
		threshold: 1,
	});
	const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
		['infinite-query', communityName],
		async ({ pageParam = 1 }) => {
			const query =
				`/api/post/posts?limit=${PAGINATION_RESULTS}&page=${pageParam}` +
				(!!communityName ? `&communityName=${communityName}` : '');

			const res = await fetch(query);
			const posts = (await res.json()) as ExtednedPost[];
			return posts;
		},

		{
			getNextPageParam: (_, pages) => {
				return pages.length + 1;
			},
			initialData: { pages: [initialPosts], pageParams: [1] },
		}
	);

	useEffect(() => {
		if (entry?.isIntersecting) {
			fetchNextPage();
		}
	}, [entry, fetchNextPage]);

	useEffect(() => {
		const allDataFetched = !isFetchingNextPage && data && data.pages.length > 0 ? true : false;
		setIsAllPostsFetched(allDataFetched);
	}, [data, isFetchingNextPage]);

	const posts = data?.pages.flatMap((page) => page) ?? initialPosts;

	return (
		<main className=' w-full  mt-16  max-w-[800px] mx-auto'>
			<ul className='w-full flex flex-col gap-6'>
				{posts.map((post, i) => {
					const { UP, DOWN } = votesReduce(post);

					const userVote = post.votes.find((vote) => vote.userId === userId);

					if (i === posts.length - 1) {
						return (
							<li key={post.id} ref={ref}>
								<PostCard
									creatorId={post.authorId}
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
								/>
							</li>
						);
					} else {
						return (
							<PostCard
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
			{isAllPostsFetched && (
				<li className='flex justify-center items-center text-center mt-8'>
					<p>Thats all for now. You have seen evreyting &#128512;</p>
				</li>
			)}
		</main>
	);
};
