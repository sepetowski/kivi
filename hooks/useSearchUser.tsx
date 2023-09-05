import { SearchingUser } from '@/types/searchingUser';
import { useQuery } from '@tanstack/react-query';
import debounce from 'lodash.debounce';
import { useCallback, useState } from 'react';

export const useSearchUser = () => {
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

	return {
		isTyping,
		searchResults,
		isFetched,
		isFetching,
		setInputValue,
		debounceRequest,
		inputValue,
		setIsTyping,
	};
};
