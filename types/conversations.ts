import { Conversation, Message } from '@prisma/client';

export interface ConversationUser {
	image: string;
	name: string;
	id: string;
}

export interface ConversationMessage extends Message {
	sender: ConversationUser;
}

export interface ExtendenConfersation extends Conversation {
	messages: ConversationMessage[];
	users: ConversationUser[];
}

export interface ConversationSearchResult extends ConversationUser {
	conversations: {
		id: string;
	};
}
