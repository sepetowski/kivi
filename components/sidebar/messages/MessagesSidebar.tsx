'use client';
import { ConversationsTab } from '@/components/conteners/messages/ConversationsTab';
import { SerachBar } from '@/components/ui/SerachBar';
import { useSearchUser } from '@/hooks/useSearchUser';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export const MessagesSidebar = () => {
	const params = useParams();
	const [isConversationsTab, setIsConversationsTab] = useState(true);

	console.log(params.conversation_id);

	const {
		inputValue,
		isFetched,
		isFetching,
		isTyping,
		searchResults,
		debounceRequest,
		setInputValue,
		setIsTyping,
	} = useSearchUser();

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
			className={`w-full h-full md:w-96 lg:w-[29rem] lx:w-[32rem] border overflow-hidden  flex-col justify-center ${
				params.conversation_id ? 'hidden md:flex' : 'flex'
			}`}>
			<div className='p-4 lg:p-6 mt-32 md:mt-12 '>
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
			{isConversationsTab && <ConversationsTab />}
			{!isConversationsTab && <div></div>}
		</aside>
	);
};
