import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { generateUsernameInitials } from '@/lib/generateUsernameInitials';
import { ConversationUser } from '@/types/conversations';

interface Props {
	userInfo: ConversationUser | undefined;
}

export const ConversationAvatar = ({ userInfo }: Props) => {
	return (
		<div className='flex items-center justify-center gap-2 md:gap-3'>
			<Avatar className='w-8 lg:w-10 h-8 lg:h-10 bg-accent'>
				{userInfo?.image && (
					<AvatarImage src={userInfo.image} alt={`profile image of ${userInfo.name} user`} />
				)}
				{userInfo?.name && (
					<AvatarFallback className='bg-accent'>
						{generateUsernameInitials(userInfo.name)}
					</AvatarFallback>
				)}
			</Avatar>
			<p className='text-lg md:text-xl font-medium'>{userInfo?.name}</p>
		</div>
	);
};
