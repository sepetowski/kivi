import { Conversation, Message } from '@prisma/client';

export interface ConversationUser {
	image: string | null | undefined;
	name: string | null | undefined;
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
	conversationId: string | null;
}

export interface ConversationPageData extends Conversation {
	users: ConversationUser[];
}

export interface ExtenedMessage extends Message {
	sender: {
		id: string;
	};
}
