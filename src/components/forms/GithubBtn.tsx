'use client';
import React from 'react';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { useTheme } from 'next-themes';

interface Props {
	isSending: boolean;
}

export const GithubBtn = ({ isSending }: Props) => {
	const { theme } = useTheme();
	const onLoginHandler = () => {
		signIn('github');
	};

	return (
		<Button
			onClick={onLoginHandler}
			disabled={isSending}
			variant='outline'
			className='flex gap-2 text-lg w-full'>
			{theme === 'dark' && (
				<Image src='/githubLogoWhite.svg' width={30} height={30} alt='google logo' />
			)}
			{theme === 'light' && (
				<Image src='/githubLogoBlack.svg' width={30} height={30} alt='google logo' />
			)}
			Github
		</Button>
	);
};
