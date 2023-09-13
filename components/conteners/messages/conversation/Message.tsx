'use client';
import { useThemeConversation } from '@/contex/ChnageConversationTheme';
import { formatTimeToNow } from '@/lib/foramtTimeToKnow';
import { ExtenedMessage } from '@/types/conversations';
import React, { useMemo, useRef } from 'react';
import { AvaibleThemes } from '@prisma/client';

interface Props {
	message: ExtenedMessage;
	activeUserId: string;
	lastMessageId: string;
}

export const Message = ({ message, activeUserId, lastMessageId }: Props) => {
	const { createdAt, id, message: text, seen, sender } = message;
	const messageRef = useRef<HTMLDivElement | null>(null);
	const { activeTheme } = useThemeConversation();

	const isActiveUserSendMasseage = useMemo(() => {
		return sender.id === activeUserId;
	}, [sender.id, activeUserId]);

	const activeThemeVaraint = useMemo(() => {
		switch (activeTheme) {
			case AvaibleThemes.PURPLE:
				return 'bg-purple-600';

			case AvaibleThemes.GREEN:
				return 'bg-green-600';

			case AvaibleThemes.RED:
				return 'bg-red-600';

			case AvaibleThemes.BLUE:
				return 'bg-blue-600';

			case AvaibleThemes.CYAN:
				return 'bg-cyan-600';

			case AvaibleThemes.EMERALD:
				return 'bg-emerald-600';

			case AvaibleThemes.INDIGO:
				return 'bg-indigo-600';

			case AvaibleThemes.LIME:
				return 'bg-lime-600';

			case AvaibleThemes.ORANGE:
				return 'bg-orange-600';
			case AvaibleThemes.FUCHSIA:
				return 'bg-fuchsia-600';

			case AvaibleThemes.PINK:
				return 'bg-pink-600';

			case AvaibleThemes.YELLOW:
				return 'bg-yellow-600';

			default:
				return 'bg-purple-600';
		}
	}, [activeTheme]);

	return (
		<div
			ref={messageRef}
			className={` w-fit max-w-[60%] flex flex-col   ${isActiveUserSendMasseage && 'self-end '}`}>
			<p
				className={`text-xs text-muted-foreground  mb-1 inline-block ${
					isActiveUserSendMasseage && 'self-end'
				}`}>
				{formatTimeToNow(new Date(createdAt))}
			</p>
			<div
				className={` text-white p-2  rounded-md shadow-sm flex justify-center   ${
					isActiveUserSendMasseage ? activeThemeVaraint : 'dark:bg-muted bg-neutral-400'
				}`}>
				<p className='text-sm md:text-base '>{text}</p>
			</div>

			{isActiveUserSendMasseage && lastMessageId === id && (
				<p className='text-xs text-muted-foreground self-end mt-0.5'>{seen ? 'Seen' : 'Send'}</p>
			)}
		</div>
	);
};
