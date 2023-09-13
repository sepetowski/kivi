'use client';
import { ConversationsTab } from '@/components/conteners/messages/conversationTab/ConversationsTab';
import { SearchConversationTab } from '@/components/conteners/messages/searchTab/SearchConversationTab';
import { SerachBar } from '@/components/ui/SerachBar';
import { useSearchUser } from '@/hooks/useSearchUser';
import { pusherClient } from '@/lib/pusher';
import { ConversationSearchResult, ExtendenConfersation } from '@/types/conversations';
import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { find } from 'lodash';
interface Props {
	userId: string;
	userEmial: string;
	initialConversations: ExtendenConfersation[];
}

export const MessagesSidebar = ({ userId, userEmial, initialConversations }: Props) => {
	const params = useParams();
	const [isConversationsTab, setIsConversationsTab] = useState(true);
	const [conversations, setConversations] = useState(initialConversations);

	const router = useRouter();

	useEffect(() => {
		pusherClient.subscribe(userEmial);

		const updateHandler = (conversation: ExtendenConfersation) => {
			setConversations((current) =>
				current.map((currentConversation) => {
					if (currentConversation.id === conversation.id) {
						return {
							...currentConversation,
							messages: conversation.messages,
						};
					}

					return currentConversation;
				})
			);
		};

		const newHandler = (conversation: ExtendenConfersation) => {
			setConversations((current) => {
				if (find(current, { id: conversation.id })) {
					return current;
				}

				return [conversation, ...current];
			});
		};

		pusherClient.bind('conversation:update', updateHandler);
		pusherClient.bind('conversation:new', newHandler);

		return () => {
			pusherClient.unsubscribe(userEmial);
			pusherClient.unbind('conversation:update', updateHandler);
			pusherClient.unbind('conversation:new', newHandler);
		};
	}, [userEmial, router]);

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
			className={`w-full h-full lg:w-[29rem] lx:w-[32rem] border overflow-hidden  flex-col ${
				params.conversation_id ? 'hidden lg:flex' : 'flex'
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
			{!isConversationsTab && (
				<SearchConversationTab
					isFetched={isFetched}
					results={searchResults}
					isFetching={isFetching}
				/>
			)}
		</aside>
	);
};
