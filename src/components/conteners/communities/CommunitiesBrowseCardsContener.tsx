'use client';

import React, { useEffect, useState } from 'react';
import { BrowseCommunityCard } from '@/components/cards/community/BrowseCommunityCard';
import { BrowseCommunity } from '@/types/communities';
import { useSearchParams } from 'next/navigation';

interface Props {
	communities: BrowseCommunity[];
}

export const CommunitiesBrowseCardsContener = ({ communities }: Props) => {
	const searchQuery = useSearchParams();
	const [queryCommunities, setQueryCommunities] = useState(communities);

	const query = searchQuery.get('search');

	useEffect(() => {
		if (!query) {
			setQueryCommunities(communities);
			return;
		}

		const community = communities.filter((community) =>
			community.name.toLocaleLowerCase().includes(query.toLowerCase())
		);
		setQueryCommunities(community);
	}, [query, communities]);

	return (
		<div className='flex justify-center flex-wrap mt-8 md:mt-12 gap-4 w-full items-center'>
			{queryCommunities.length !== 0 &&
				queryCommunities.map((communitiy) => (
					<BrowseCommunityCard
						key={communitiy.id}
						name={communitiy.name}
						description={communitiy.description}
						id={communitiy.id}
						members={communitiy.members}
						posts={communitiy.postCount}
						image={communitiy.image}
						userJoined={communitiy.userJoined}
						creatorId={communitiy.creatorId}
					/>
				))}
		</div>
	);
};
