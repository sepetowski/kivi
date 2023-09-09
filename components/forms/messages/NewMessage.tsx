'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { MessageSchema } from '@/validations/MessageSchema';
import { useFormik } from 'formik';
import { Loader2, Send } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Props {
	conversationId: string;
}

export const NewMessage = ({ conversationId }: Props) => {
	const router = useRouter();
	const { toast } = useToast();
	const [isLoading, setIsLoading] = useState(false);

	const formik = useFormik({
		initialValues: {
			message: '',
		},
		validationSchema: MessageSchema,

		onSubmit: async (values, { resetForm }) => {
			setIsLoading(true);
			resetForm();
			try {
				const res = await fetch('/api/messages/new-message', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						message: values.message,
						conversationId,
					}),
				});
				if (!res.ok) {
					toast({
						variant: 'destructive',
						title: 'Oh no! Something went wrong.',
					});
				} else {
					router.refresh();
				}
			} catch (err) {
				toast({
					variant: 'destructive',
					title: 'Oh no! Something went wrong. Please try again',
				});
			}
			setIsLoading(false);
		},
	});

	return (
		<form
			onSubmit={formik.handleSubmit}
			className='bg-background shadow-sm border-t p-4 lg:px-6 flex gap-4 items-center relative z-50'>
			<Textarea
				onKeyDown={(e) => {
					if (e.key === 'Enter' && !e.shiftKey) {
						e.preventDefault();
						formik.handleSubmit();
					}
				}}
				value={formik.values.message}
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				id='message'
				name='message'
				placeholder='Aa'
				className='h-10 min-h-[2.5rem] max-h-10 scrollbar-none'
			/>

			<Button
				disabled={isLoading || !(formik.dirty && formik.isValid)}
				type='submit'
				variant={'ghost'}
				size={'xs'}>
				{!isLoading && <Send />}
				{isLoading && <Loader2 className='animate-spin' />}
			</Button>
		</form>
	);
};
