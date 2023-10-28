'use client';
import React from 'react';

import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';
import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from '@/components/ui/toast';

interface Props {
	isSending: boolean;
	onSending: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LogWithTestAccount = ({ isSending, onSending }: Props) => {
	const { toast } = useToast();

	const loginHandler = async () => {
		onSending(true);
		try {
			await signIn('credentials', {
				email: 'test@test.pl',
				password: 'Test123',
				redirect: false,
			});
		} catch (_) {
			toast({
				variant: 'destructive',
				title: 'Oh no! An error has occured.',
				description: 'Something went wrong, please try again',
				action: (
					<ToastAction onClick={() => loginHandler} altText='Try again'>
						Try again
					</ToastAction>
				),
			});
		}
		onSending(false);
	};
	return (
		<Button
			disabled={isSending}
			onClick={loginHandler}
			variant='outline'
			className='flex gap-2 text-lg w-full'>
			Sign in with test account
		</Button>
	);
};
