'use client';

import React, { useEffect, useState } from 'react';
import { CreatedCommunityCard } from '@/components/cards/community/CreatedCommunityCard';
import { Community } from '@prisma/client';
import { useSearchParams } from 'next/navigation';
import { BrowseCommunityCradSkieleton } from '@/components/skieletons/cards/BrowseCommunityCradSkieleton';
import { CreatedCommunityCardSkieleton } from '@/components/skieletons/cards/CreatedCommunityCardSkieleton';

interface Props {
	communities: Community[];
}

export const CommunitiesCreatedCardsContener = ({ communities }: Props) => {
	const searchQuery = useSearchParams();
	const [queryCommunities, setQueryCommunities] = useState(communities);
	const [isEmpty, setIsEmpty] = useState(false);
	const [isMounted, setIsMounted] = useState(false);

	const query = searchQuery.get('search');

	useEffect(() => {
		setIsMounted(true);
	}, []);

	useEffect(() => {
		setIsEmpty(false);
		if (!query) {
			setQueryCommunities(communities);
			return;
		}

		if (communities.length === 0) return;
		const community = communities.filter((community) =>
			community.name.toLocaleLowerCase().includes(query.toLowerCase())
		);
		setQueryCommunities(community);
		if (community.length === 0) setIsEmpty(true);
	}, [query, communities]);

	if (!isMounted && query)
		return (
			<div className='flex justify-center flex-wrap my-8 md:my-12 gap-4 w-full items-center'>
				<CreatedCommunityCardSkieleton />
				<CreatedCommunityCardSkieleton />
			</div>
		);

	return (
		<div className='flex justify-center flex-wrap my-8 md:my-12 gap-4 w-full items-center'>
			{queryCommunities.length !== 0 &&
				queryCommunities.map((communitiy) => (
					<CreatedCommunityCard
						key={communitiy.id}
						name={communitiy.name}
						description={communitiy.description}
						id={communitiy.id}
						members={communitiy.members}
						posts={communitiy.postCount}
						image={communitiy.image}
						creatorId={communitiy.creatorId}
					/>
				))}

			{communities.length !== 0 && isEmpty && (
				<div className='flex flex-col gap-2 text-center mt-20'>
					<p className='text-2xl md:text-4xl'>
						No results for {''}
						<span className='font-bold'>
							<q>{query}</q>
						</span>
					</p>
					<p>Try searching for something else.</p>
				</div>
			)}
		</div>
	);
};
