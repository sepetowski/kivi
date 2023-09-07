'use client';
import { ConversationsTab } from '@/components/conteners/messages/ConversationsTab';
import { SerachBar } from '@/components/ui/SerachBar';
import { useSearchUser } from '@/hooks/useSearchUser';
import { ConversationSearchResult, ExtendenConfersation } from '@/types/conversations';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface Props {
	userId: string;
}

export const MessagesSidebar = ({ userId }: Props) => {
	const params = useParams();
	const [isConversationsTab, setIsConversationsTab] = useState(true);

	const { data: conversations } = useQuery({
		queryFn: async () => {
			const res = await fetch(`/api/messages/get-conversations?userId=${userId}`);
			if (!res.ok) return [];
			const conversations = await res.json();
			return conversations as ExtendenConfersation[];
		},
		queryKey: ['conversations'],
	});

	const {
		inputValue,
		isFetched,
		isFetching,
		isTyping,
		searchResults,
		debounceRequest,
		setInputValue,
		setIsTyping,
	} = useSearchUser<ConversationSearchResult>({
		api: '/api/messages/serach-for-conversation',
		queryKey: 'serach-conversations-query',
		userId,
	});

	console.log(searchResults);

	useEffect(() => {
		if (!inputValue) {
			setIsConversationsTab(true);
		} else {
			if (isTyping) return;
			setIsConversationsTab(false);
		}
	}, [inputValue, isTyping]);

	return (
		<aside
			className={`w-full h-full md:w-96 lg:w-[29rem] lx:w-[32rem] border overflow-hidden  flex-col ${
				params.conversation_id ? 'hidden md:flex' : 'flex'
			}`}>
			<div className='p-4 lg:p-6 mt-32 md:mt-24 '>
				<h3 className=' lg:text-center text-xl font-bold mb-4 '>Your conversations</h3>
				<SerachBar
					className='pl-14'
					value={inputValue}
					onSetValue={setInputValue}
					request={debounceRequest}
					onSetTyping={() => {
						setIsTyping(true);
					}}
					isFetching={isFetching}
				/>
			</div>
			{isConversationsTab && (
				<ConversationsTab conversations={conversations} activeUserId={userId} />
			)}
			{!isConversationsTab && <div></div>}
		</aside>
	);
};
