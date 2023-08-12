
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { generateUsernameInitials } from '@/lib/generateUsernameInitials';

interface Props {
	image: string | undefined | null;
	name: string | undefined | null;
}

export const ProfileAvatar = ({ image, name }: Props) => {
	return (
		<Avatar className='w-10 h-10 '>
			{image && <AvatarImage src={image} />}
			{name && (
				<AvatarFallback className='bg-accent'>{generateUsernameInitials(name)}</AvatarFallback>
			)}
		</Avatar>
	);
};
