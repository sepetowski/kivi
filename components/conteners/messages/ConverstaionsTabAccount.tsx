'use client';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { generateUsernameInitials } from '@/lib/generateUsernameInitials';
import { useRouter } from 'next/navigation';
import { ConversationMessage, ConversationUser } from '@/types/conversations';
import { makeShortMessage } from '@/lib/makeShortMessage';
import { formatTimeToNow } from '@/lib/foramtTimeToKnow';

interface Props {
	users: ConversationUser[];
	activeUserId: string;
	lastMessage: ConversationMessage;
}

export const ConverstaionsTabAccount = ({
	users,
	activeUserId,
	lastMessage: { sender, seen, message, createdAt, conversationId },
}: Props) => {
	const router = useRouter();

	const conversationWithUser = useMemo(() => {
		return users.filter((user) => user.id !== activeUserId).at(0);
	}, [activeUserId, users]);

	const isLastMasgeMadeByActiveUser = useMemo(() => {
		return activeUserId === sender.id;
	}, [activeUserId, sender.id]);

	const goToMessagesHandler = useCallback(() => {
		router.push(`/messages/m/${conversationId}`);
		router.refresh();
	}, [conversationId, router]);

	return (
		<div
			onClick={goToMessagesHandler}
			className='flex justify-between items-center gap-4 w-full transition-colors duration-200 hover:bg-muted p-2 cursor-pointer rounded-md relative'>
			<div className='flex items-center gap-4 w-[90%]'>
				<Avatar className='w-10 lg:w-12 h-10 lg:h-12 bg-accent'>
					{conversationWithUser?.image && (
						<AvatarImage
							src={conversationWithUser.image}
							alt={`profile image of ${conversationWithUser?.name} user`}
						/>
					)}
					{conversationWithUser?.name && (
						<AvatarFallback className='bg-accent'>
							{generateUsernameInitials(conversationWithUser.name)}
						</AvatarFallback>
					)}
				</Avatar>
				<div className='flex flex-col'>
					<p>{conversationWithUser?.name}</p>

					<p className={`text-xs text-muted-foreground  `}>
						<span className={`${!isLastMasgeMadeByActiveUser && !seen && 'text-white font-bold'} `}>
							{makeShortMessage(message)}
						</span>
						<span className='ml-1'>&#x2022; {formatTimeToNow(new Date(createdAt))}</span>
					</p>
				</div>
			</div>
			{isLastMasgeMadeByActiveUser && !seen && (
				<div className=' w-2.5 h-2.5  rounded-full border border-primary'></div>
			)}
			{isLastMasgeMadeByActiveUser && seen && (
				<Avatar className='w-3 h-3 bg-accent'>
					{conversationWithUser?.image && (
						<AvatarImage
							src={conversationWithUser.image}
							alt={`profile image of ${conversationWithUser?.name} user`}
						/>
					)}
					{conversationWithUser?.name && (
						<AvatarFallback className='bg-accent'>
							{generateUsernameInitials(conversationWithUser.name)}
						</AvatarFallback>
					)}
				</Avatar>
			)}
		</div>
	);
};
