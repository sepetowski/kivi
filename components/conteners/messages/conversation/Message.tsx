'use client';
import { formatTimeToNow } from '@/lib/foramtTimeToKnow';
import { ExtenedMessage } from '@/types/conversations';
import React, { useEffect, useMemo, useRef, useState } from 'react';

interface Props {
	message: ExtenedMessage;
	activeUserId: string;
	lastMessageId: string;
}

export const Message = ({ message, activeUserId, lastMessageId }: Props) => {
	const { createdAt, id, message: text, seen, sender } = message;
	const messageRef = useRef<HTMLDivElement | null>(null);

	const isActiveUserSendMasseage = useMemo(() => {
		return sender.id === activeUserId;
	}, [sender.id, activeUserId]);

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
					isActiveUserSendMasseage ? 'bg-purple-600 ' : 'dark:bg-muted bg-neutral-500'
				}`}>
				<p className='text-sm md:text-base '>{text}</p>
			</div>

			{isActiveUserSendMasseage && lastMessageId === id && (
				<p className='text-xs text-muted-foreground self-end mt-0.5'>{seen ? 'Seen' : 'Send'}</p>
			)}
		</div>
	);
};
