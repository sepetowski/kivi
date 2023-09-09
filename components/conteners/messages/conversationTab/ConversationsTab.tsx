import React from 'react';
import { ConversationsTabAccount } from './ConversationsTabAccount';
import { ExtendenConfersation } from '@/types/conversations';

interface Props {
	conversations: ExtendenConfersation[] | undefined;
	activeUserId: string;
}

export const ConversationsTab = ({ conversations, activeUserId }: Props) => {
	return (
		<div className='flex flex-col gap-5  sm:h-2/3  p-4 lg:p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-secondary scrollbar-thumb-rounded-md scrollbar-track-background '>
			{conversations &&
				conversations.length > 0 &&
				conversations.map((conversation) => {
					const lastMessage = conversation.messages ? conversation?.messages[0] : '';
					if (lastMessage)
						return (
							<ConversationsTabAccount
								key={conversation.id}
								users={conversation.users}
								activeUserId={activeUserId}
								lastMessage={lastMessage}
							/>
						);
					else return null;
				})}
		</div>
	);
};
