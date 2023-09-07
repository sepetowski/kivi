import React from 'react';
import { ConverstaionsTabAccount } from './ConverstaionsTabAccount';
import { ExtendenConfersation } from '@/types/conversations';

interface Props {
	conversations: ExtendenConfersation[] | undefined;
	activeUserId: string;
}

export const ConversationsTab = ({ conversations, activeUserId }: Props) => {
	console.log(conversations);
	return (
		<div className='flex flex-col gap-5  sm:h-2/3  p-4 lg:p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-secondary scrollbar-thumb-rounded-md scrollbar-track-background '>
			{conversations &&
				conversations.length > 0 &&
				conversations.map((conversation) => (
					<ConverstaionsTabAccount
						key={conversation.id}
						users={conversation.users}
						activeUserId={activeUserId}
						lastMessage={conversation.messages && conversation.messages[0]}
					/>
				))}
		</div>
	);
};
