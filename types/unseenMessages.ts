import { AvaibleThemes } from '@prisma/client';

interface message {
	id: string;
}
export interface UnseenMessage {
	id: string;
	createdAt: Date;
	lastMessageAt: Date;
	currentTheme: AvaibleThemes;
	messages: message[];
}
