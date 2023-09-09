import React from 'react';
import { SearchConversationsTabAccount } from './SearchConversationsTabAccount';
import { ConversationSearchResult } from '@/types/conversations';

interface Props {
	isFetched: boolean;
	isFetching: boolean;
	results: ConversationSearchResult[] | undefined;
}

export const SearchConversationTab = ({ isFetched, results, isFetching }: Props) => {
	

	return (
		<div className='flex flex-col gap-5  sm:h-2/3  p-4 lg:p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-secondary scrollbar-thumb-rounded-md scrollbar-track-background '>
			{isFetched && !isFetching && results?.length === 0 && (
				<div className='flex justify-center items-center mt-6'>
					<p className='text-lg md:text-xl'>No user found</p>
				</div>
			)}
			{isFetched && !isFetching && results && results?.length > 0 && (
				<>
					{results.map((result) => (
						<SearchConversationsTabAccount
							key={result.id}
							userId={result.id}
							conversationId={result.conversationId}
							image={result.image}
							name={result.name}
						/>
					))}
				</>
			)}
		</div>
	);
};
