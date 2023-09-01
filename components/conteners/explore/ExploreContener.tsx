'use client';
import React, { useCallback, useState } from 'react';
import { SerachBar } from './SerachBar';
import { ResultsContener } from './ResultsContener';
import { ExtenedSerachHistory } from '@/types/searchHistory';
import { useQuery } from '@tanstack/react-query';
import debounce from 'lodash.debounce';
import { SearchingUser } from '@/types/searchingUser';

interface Props {
	userSearchHistroy: ExtenedSerachHistory[];
}

export const ExploreContener = ({ userSearchHistroy }: Props) => {
	const [inputValue, setInputValue] = useState('');
	const [isTyping, setIsTyping] = useState(false);
	

	const {
		data: searchResults,
		isFetched,
		isFetching,
		refetch,
	} = useQuery({
		queryFn: async () => {
			if (!inputValue.trim()) return [];
			const res = await fetch(`/api/explore/search?query=${inputValue}`);

			if (!res.ok) return [];

			const data = await res.json();
			return data as SearchingUser[];
		},
		queryKey: ['search-query'],
		enabled: false,
	});

	const request = debounce(async () => {
		setIsTyping(false);
		refetch();
	}, 400);

	/* eslint-disable */
	const debounceRequest = useCallback(() => {
		request();
	}, []);

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
