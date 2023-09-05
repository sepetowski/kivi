import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { generateUsernameInitials } from '@/lib/generateUsernameInitials';

export const ConversationAvatar = () => {
	return (
		<div className='flex items-center justify-center gap-2 md:gap-3'>
			<Avatar className='w-8 lg:w-10 h-8 lg:h-10 bg-accent'>
				<AvatarImage src='https://github.com/shadcn.png' alt={`profile image of name user`} />
				<AvatarFallback className='bg-accent'>{generateUsernameInitials('nazwa')}</AvatarFallback>
			</Avatar>
			<p className='text-lg md:text-xl font-medium'>Nazwa</p>
		</div>
	);
};
