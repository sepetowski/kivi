'use client';
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';

import Image from 'next/image';
interface Props {
	isSending: boolean;
}

export const GoogleBtn = ({ isSending }: Props) => {
	const onLoginHandler = async () => {
		await signIn('google');
	};

	return (
		<Button
			onClick={onLoginHandler}
			disabled={isSending}
			variant='outline'
			className='flex gap-2 text-lg w-[calc((100%/2)-0.5rem)]'>
			<Image src='/googleLogo.svg' width={25} height={25} alt='google logo' />
			Google
		</Button>
	);
};
