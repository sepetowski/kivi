'use client';

import { PAGINATION_RESULTS } from '@/lib/pagineresutls';
import { ExtednedPost } from '@/types/post';
import { useIntersection } from '@mantine/hooks';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';

export const useInfinityScroll = (
	initialPosts: ExtednedPost[],
	api: string,
	dependencies: string[],
	communityName?: string,
	userName?: string,
	userId?: string,
	userLikes?: boolean,
	userSaved?: boolean
) => {
	const lastPostRef = useRef<null | HTMLElement>(null);
	const [isAllPostsFetched, setIsAllPostsFetched] = useState(false);

	const { entry, ref } = useIntersection({
		root: lastPostRef.current,
		threshold: 1,
	});

	const filteredDependencies = dependencies.filter((el) => el !== '');

	const { data, fetchNextPage, isFetchingNextPage} = useInfiniteQuery(
		filteredDependencies,
		async ({ pageParam = 1 }) => {
			const query =
				`${api}?limit=${PAGINATION_RESULTS}&page=${pageParam}` +
				(!!communityName ? `&communityName=${communityName}` : '') +
				(!!userName ? `&userName=${userName}` : '') +
				(!!userId ? `&userId=${userId}` : '') +
				(userSaved ? `&userSaved=userSaved` : '') +
				(userLikes ? `&userLikes=userLikes` : '');

			const res = await fetch(query);
			const posts = (await res.json()) as ExtednedPost[];
			return posts;
		},

		{
			getNextPageParam: (_, pages) => {
				return pages.length + 1;
			},
			initialData: { pages: [initialPosts], pageParams: [1] },
			cacheTime: 0,
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

	return { posts, isAllPostsFetched, isFetchingNextPage, ref };
};
