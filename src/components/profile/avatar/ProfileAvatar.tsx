import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { generateUsernameInitials } from '@/lib/generateUsernameInitials';
import { ChangeProfileImage } from './ChangeProfileImage';

interface Props {
	image: string | null | undefined;
	name: string;
	sessionUserPage: boolean;
	userId: string;
}
export const ProfileAvatar = ({ name, image, sessionUserPage, userId }: Props) => {
	return (
		<Avatar
			className={`w-20 h-20 mt-[-2.5rem] sm:w-24 sm:h-24 sm:mt-[-3rem] lg:w-28 lg:h-28 lg:mt-[-3.5rem] relative ${
				sessionUserPage ? 'overflow-visible' : ''
			}`}>
			{image && (
				<AvatarImage
					className={`${sessionUserPage ? 'overflow-hidden rounded-full object-cover' : ''}`}
					src={image}
				/>
			)}
			{!image && (
				<AvatarFallback className='bg-accent '>{generateUsernameInitials(name)}</AvatarFallback>
			)}
			{sessionUserPage && <ChangeProfileImage userId={userId} image={image} name={name} />}
		</Avatar>
	);
};
