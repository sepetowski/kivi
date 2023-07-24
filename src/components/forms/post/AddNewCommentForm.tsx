'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { useFormik } from 'formik';
import { NewCommentSchema } from '@/validations/NewCommentSchema';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { Loader2Icon } from 'lucide-react';

interface Props {
	postId: string;
	reaplyToPostId?: string;
}

export const AddNewCommentForm = ({ postId, reaplyToPostId }: Props) => {
	const router = useRouter();
	const [isSending, setIsSending] = useState(false);

	const { toast } = useToast();
	const formik = useFormik({
		initialValues: {
			comment: '',
		},
		validationSchema: NewCommentSchema,

		onSubmit: async (values, { resetForm }) => {
			setIsSending(true);

			try {
				const res = await fetch('/api/comments/add', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						comment: values.comment,
						postId,
						reaplyToPostId,
					}),
				});
				if (!res.ok) {
					toast({
						variant: 'destructive',
						title: 'Oh no! Something went wrong.',
						description: res.statusText,
					});
				} else {
					toast({
						title: res.statusText,
					});
					resetForm();
					router.refresh();
				}
			} catch (err) {
				toast({
					variant: 'destructive',
					title: 'Oh no! Something went wrong. Please try again',
				});
			}

			setIsSending(false);
		},
	});

	return (
		<form onSubmit={formik.handleSubmit} className='flex flex-col gap-4 mt-10' action=''>
			<Textarea
				placeholder='Add new comment'
				id='comment'
				value={formik.values.comment}
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				className='max-h-44'
			/>
			<div className='flex gap-2 self-end'>
				<Button disabled={isSending || !(formik.dirty && formik.isValid)} type='submit'>
					{!isSending && <>Comment</>}
					{isSending && (
						<>
							Adding...
							<Loader2Icon className='animate-spin ml-2' />
						</>
					)}
				</Button>
				<Button type='button' onClick={() => formik.resetForm()} variant={'secondary'}>
					Clear
				</Button>
			</div>
		</form>
	);
};
