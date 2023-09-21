'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';
import { Github } from 'lucide-react';

interface Props {
	isSending: boolean;
}

export const GithubBtn = ({ isSending }: Props) => {
	const onLoginHandler = async () => {
		await signIn('github');
	};

	return (
		<Button
			onClick={onLoginHandler}
			disabled={isSending}
			variant='outline'
			className='flex gap-2 text-lg w-full'>
			<Github /> Github
		</Button>
	);
};
