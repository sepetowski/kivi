'use client';
import React, { ChangeEvent, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { useFormik } from 'formik';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { Loader2Icon } from 'lucide-react';
import { User } from '@prisma/client';
import * as Yup from 'yup';

interface Props {
	postId: string;
	isCommentReaply?: boolean;
	author?: User;
	replyToId?: string;
	onCloseReaply?: () => void;
}

export const AddNewCommentForm = ({
	postId,
	replyToId,
	author,
	onCloseReaply,
	isCommentReaply = false,
}: Props) => {
	const router = useRouter();
	const [isSending, setIsSending] = useState(false);

	const minCommLenght = isCommentReaply && author?.name ? author.name?.length + 5 : 3;
	const maxCommLenght = isCommentReaply && author?.name ? author.name?.length + 202 : 200;
	const NewCommentSchema = Yup.object().shape({
		comment: Yup.string()
			.required('Comment is required')
			.min(minCommLenght, 'Comment is too short')
			.max(maxCommLenght, 'Comment is too long')
			.trim(),
	});

	const { toast } = useToast();

	const formik = useFormik({
		initialValues: {
			comment: isCommentReaply && author ? `@${author.name} ` : '',
		},
		validationSchema: NewCommentSchema,

		onSubmit: async (values, { resetForm }) => {
			setIsSending(true);

			try {
				const res = await fetch('/api/comments/add', {
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						comment: values.comment,
						reaplyToCommentId: replyToId,
						postId,
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

					router.refresh();
					if (isCommentReaply) onCloseReaply!();
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

	const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
		const inputValue = event.target.value;
		if (isCommentReaply && inputValue.length < minCommLenght - 2) {
			formik.resetForm();
		} else formik.setFieldValue('comment', inputValue);
	};

	return (
		<form onSubmit={formik.handleSubmit} className='flex flex-col gap-4 mt-10' action=''>
			<Textarea
				placeholder={isCommentReaply && author ? `Reaply to ${author.name}` : 'Add new comment'}
				id='comment'
				value={formik.values.comment}
				onChange={(event) => handleInputChange(event)}
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
				{!isCommentReaply && (
					<Button type='button' onClick={() => formik.resetForm()} variant={'secondary'}>
						Clear
					</Button>
				)}
				{isCommentReaply && (
					<Button type='button' onClick={() => onCloseReaply!()} variant={'secondary'}>
						Cancel
					</Button>
				)}
			</div>
		</form>
	);
};
