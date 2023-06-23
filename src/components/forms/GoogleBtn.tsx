'use client';
import React from 'react';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';
import { signIn } from 'next-auth/react';

interface Props {
	isSending: boolean;
}

export const GoogleBtn = ({ isSending }: Props) => {
	const onLoginHandler = () => {
		signIn('google')
	};

	return (
		<Button
			onClick={onLoginHandler}
			disabled={isSending}
			variant='outline'
			className='flex gap-2 text-lg w-full'>
			<Image src='/googleLogo.svg' width={25} height={25} alt='google logo' />
			Google
		</Button>
	);
};
