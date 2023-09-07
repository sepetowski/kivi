import { SearchingUser } from '@/types/searchingUser';
import { useQuery } from '@tanstack/react-query';
import debounce from 'lodash.debounce';
import { useCallback, useState } from 'react';

interface Props<T> {
	api: string;
	queryKey: string;
	userId?: string;
}

export function useSearchUser<T>({ api, queryKey, userId }: Props<T>) {
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
			const res = await fetch(`${api}?query=${inputValue}` + (!!userId ? `&userId=${userId}` : ''));

			if (!res.ok) return [];

			const data = await res.json();
			return data as T[];
		},
		queryKey: [{ queryKey }],
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
}
