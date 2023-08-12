'use client';

import React, { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { generateUsernameInitials } from '@/lib/generateUsernameInitials';
import { ChangeProfileImage } from './ChangeProfileImage';
import { Loader2Icon } from 'lucide-react';
import { UserAvatarSkieleton } from '@/components/skieletons/avatars/UserAvatarSkieleton';

interface Props {
	image: string | null | undefined;
	name: string;
	sessionUserPage: boolean;
	userId: string;
}
export const ProfileAvatar = ({ name, image, sessionUserPage, userId }: Props) => {
	const [isSending, setIsSending] = useState(false);
	const [isLoaded, setIsLoaded] = useState(false);
	const [isShown, setIsShown] = useState(false);

	useEffect(() => {
		setIsShown(true);
	}, [isLoaded]);

	const toogleSendingHanlder = () => {
		setIsSending((prev) => !prev);
	};

	if (!isShown) return <UserAvatarSkieleton  />;

	return (
		<Avatar
			className={`w-20 h-20 mt-[-2.5rem] sm:w-24 sm:h-24 sm:mt-[-3rem] lg:w-28 lg:h-28 lg:mt-[-3.5rem] relative ${
				sessionUserPage ? 'overflow-visible' : ''
			}`}>
			{image && (
				<AvatarImage
					onLoad={() => {
						setIsLoaded(true);
					}}
					className={`${sessionUserPage ? 'overflow-hidden rounded-full object-cover' : ''}`}
					src={image}
				/>
			)}
			{isSending && (
				<div className=' absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] flex justify-center items-center '>
					<Loader2Icon className='animate-spin' />
				</div>
			)}
			{!image && (
				<AvatarFallback className='bg-accent '>{generateUsernameInitials(name)}</AvatarFallback>
			)}
			{sessionUserPage && (
				<ChangeProfileImage
					userId={userId}
					image={image}
					name={name}
					onSave={toogleSendingHanlder}
				/>
			)}
		</Avatar>
	);
};
