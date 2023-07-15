'use client';

import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { generateUsernameInitials } from '@/lib/generateUsernameInitials';
import { Loader2Icon } from 'lucide-react';
import { ChangeCreatedCommunityCardAvatar } from './ChangeCreatedCommunityCardAvatar';

interface Props {
	image: string;
	name: string;
	isNameEditting: boolean;
	communityId: string;
}

export const CreatedCommunityCardAvatar = ({ image, name, isNameEditting, communityId }: Props) => {
	const [isSending, setIsSending] = useState(false);

	const toogleSendingHanlder = () => {
		setIsSending((prev) => !prev);
	};

	return (
		<Avatar
			className={`relative overflow-visible w-14 h-14 ${isNameEditting ? 'hidden md:block' : ''}`}>
			<AvatarImage className='overflow-hidden rounded-full object-cover' src={image} />

			{isSending && (
				<div className=' absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] flex justify-center items-center '>
					<Loader2Icon className='animate-spin' />
				</div>
			)}

			<AvatarFallback className='bg-accent '>{generateUsernameInitials(name)}</AvatarFallback>
			<ChangeCreatedCommunityCardAvatar
				name={name}
				image={image}
				communityId={communityId}
				onSave={toogleSendingHanlder}
			/>
		</Avatar>
	);
};
