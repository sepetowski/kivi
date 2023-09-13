'use client';
import { useThemeConversation } from '@/contex/ChnageConversationTheme';
import { formatTimeToNow } from '@/lib/foramtTimeToKnow';
import { ExtenedMessage } from '@/types/conversations';
import React, { useEffect, useMemo, useRef } from 'react';
import { AvaibleThemes } from '@prisma/client';
import { colorStrenght } from '@/lib/themes';
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
				return `bg-purple-${colorStrenght}`;

			case AvaibleThemes.GREEN:
				return `bg-green-${colorStrenght}`;

			case AvaibleThemes.RED:
				return `bg-red-${colorStrenght}`;

			case AvaibleThemes.BLUE:
				return `bg-blue-${colorStrenght}`;

			case AvaibleThemes.CYAN:
				return `bg-cyan-${colorStrenght}`;

			case AvaibleThemes.EMERALD:
				return `bg-emerald-${colorStrenght}`;

			case AvaibleThemes.INDIGO:
				return `bg-indigo-${colorStrenght}`;

			case AvaibleThemes.LIME:
				return `bg-lime-${colorStrenght}`;

			case AvaibleThemes.ORANGE:
				return `bg-orange-${colorStrenght}`;
			case AvaibleThemes.FUCHSIA:
				return `bg-fuchsia-${colorStrenght}`;

			case AvaibleThemes.PINK:
				return `bg-pink-${colorStrenght}`;

			case AvaibleThemes.YELLOW:
				return `bg-yellow-${colorStrenght}`;

			default:
				return `bg-purple-${colorStrenght}`;
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
