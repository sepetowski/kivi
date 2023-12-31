'use client';
import React from 'react';
import { SerachBar } from '../../ui/SerachBar';
import { ResultsContener } from './ResultsContener';
import { ExtenedSerachHistory } from '@/types/searchHistory';
import { SearchingUser } from '@/types/searchingUser';
import { useSearchUser } from '@/hooks/useSearchUser';

interface Props {
	userSearchHistroy: ExtenedSerachHistory[];
}

export const ExploreContener = ({ userSearchHistroy }: Props) => {
	const {
		inputValue,
		isFetched,
		isFetching,
		isTyping,
		searchResults,
		debounceRequest,
		setInputValue,
		setIsTyping,
	} = useSearchUser<SearchingUser>({ api: '/api/explore/search', queryKey: 'search-users-query' });

	return (
		<>
			<SerachBar
				value={inputValue}
				onSetValue={setInputValue}
				request={debounceRequest}
				onSetTyping={() => {
					setIsTyping(true);
				}}
				isFetching={isFetching}
				className='pl-14'
			/>
			<ResultsContener
				inputEmpty={inputValue.length === 0 ? true : false}
				userSearchHistroy={userSearchHistroy}
				searchResults={searchResults}
				isFetched={isFetched}
				isFetching={isFetching}
				isTyping={isTyping}
				query={inputValue}
			/>
		</>
	);
};
