'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Message } from './Message';
import { ExtenedMessage } from '@/types/conversations';
import { pusherClient } from '@/lib/pusher';
import { find } from 'lodash';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { useThemeConversation } from '@/contex/ChnageConversationTheme';
import { AvaibleThemes } from '@prisma/client';
interface Props {
	initialMessages: ExtenedMessage[];
	activeUserId: string;
	conversationId: string;
	initialTheme: AvaibleThemes;
}

export const Contener = ({
	initialMessages,
	activeUserId,
	conversationId,
	initialTheme,
}: Props) => {
	const [messages, setMessages] = useState(initialMessages);
	const [isMounted, setIsMounted] = useState(false);
	const bottomRef = useRef<HTMLDivElement | null>(null);
	const { setActiveTheme } = useThemeConversation();

	useEffect(() => {
		setIsMounted(true);
	}, []);

	useEffect(() => {
		if (!isMounted) return;
		if (messages.length >= 1 && messages[messages.length - 1].sender.id !== activeUserId)
			axios.post(`/api/messages/update-to-seen`, {
				messageId: messages[messages.length - 1].id,
				conversationId,
			});
	}, [messages, activeUserId, conversationId, isMounted]);

	useEffect(() => {
		if (!isMounted) return;

		pusherClient.subscribe(conversationId);
		bottomRef?.current?.scrollIntoView();
		setActiveTheme(initialTheme);

		const messageHnadler = (message: ExtenedMessage) => {
			setMessages((current) => {
				if (find(current, { id: message.id })) {
					return current;
				}
				return [...current, message];
			});

			bottomRef?.current?.scrollIntoView();
		};

		const updateMessageHandler = (message: ExtenedMessage) => {
			setMessages((current) =>
				current.map((currentMessage) => {
					if (currentMessage.id === message.id) {
						return message;
					}

					return currentMessage;
				})
			);
		};
		const themeUpadteHandler = (theme: { id: number; theme: AvaibleThemes }) => {
			setActiveTheme(theme.theme);
		};

		pusherClient.bind('messages:new', messageHnadler);
		pusherClient.bind('message:update', updateMessageHandler);
		pusherClient.bind('theme:update', themeUpadteHandler);

		return () => {
			pusherClient.unsubscribe(conversationId);
			pusherClient.unbind('messages:new', messageHnadler);
			pusherClient.unbind('message:update', updateMessageHandler);
			pusherClient.unbind('theme:update', themeUpadteHandler);
		};
	}, [conversationId, activeUserId, isMounted]);

	if (!isMounted)
		return (
			<div className=' w-full flex-grow p-4 lg:p-6  overflow-y-auto flex  justify-center items-center'>
				<Loader2 className='animate-spin' />
			</div>
		);

	return (
		<div className=' w-full flex-grow p-4 lg:p-6  overflow-y-auto flex flex-col scrollbar-thin scrollbar-thumb-secondary scrollbar-thumb-rounded-md scrollbar-track-background gap-2'>
			{messages &&
				messages.length > 0 &&
				messages.map((message, i) => (
					<Message
						key={message.id}
						message={message}
						activeUserId={activeUserId}
						lastMessageId={messages[messages.length - 1].id}
					/>
				))}
			<div ref={bottomRef} />
		</div>
	);
};
