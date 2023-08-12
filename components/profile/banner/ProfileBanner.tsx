'use client';
import { ChnageBackgroundImage } from '@/components/profile/banner/ChnageBackgroundImage';
import Image from 'next/image';
import { useState } from 'react';
import { Loader2Icon } from 'lucide-react';

interface Props {
	sessionUserPage: boolean;
	userId: string;
	backgroundImage: string | null;
}

export const ProfileBanner = ({ sessionUserPage, userId, backgroundImage }: Props) => {
	const [isSending, setIsSending] = useState(false);

	const toogleSendingHanlder = () => {
		setIsSending((prev) => !prev);
	};

	return (
		<div className='w-full  h-52 md:h-72 xl:h-80  2xl:h-80  shadow-sm bg-muted-foreground border-b mx-auto  mt-24 md:mt-16 md:rounded-lg lg:rounded-xl relative overflow-hidden '>
			{isSending && (
				<div className=' absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] flex justify-center items-center z-50 '>
					<Loader2Icon size={60} className='animate-spin' />
				</div>
			)}
			{backgroundImage && (
				<Image className='object-cover' src={backgroundImage} fill alt='User background image' />
			)}
			{sessionUserPage && (
				<ChnageBackgroundImage userId={userId} backgroundImage={backgroundImage} onSave={toogleSendingHanlder} />
			)}
		</div>
	);
};
