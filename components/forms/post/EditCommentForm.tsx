'use client';
import React, { ChangeEvent, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useFormik } from 'formik';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { Loader2Icon } from 'lucide-react';
import * as Yup from 'yup';
import { useQueryClient } from '@tanstack/react-query';
interface Props {
	commentId: string;
	commentText: string;
	replayName: string | undefined;
	onEdit: () => void;
}

export const EditCommentForm = ({ commentId, commentText, replayName, onEdit }: Props) => {
	const router = useRouter();
	const { toast } = useToast();
	const [isSending, setIsSending] = useState(false);
	const queryClient = useQueryClient();

	const minCommLenght = replayName ? replayName.length + 4 : 3;
	const maxCommLenght = replayName ? replayName.length + 202 : 200;
	const NewCommentSchema = Yup.object().shape({
		comment: Yup.string()
			.required('Comment is required')
			.min(minCommLenght, 'Comment is too short')
			.max(maxCommLenght, 'Comment is too long')
			.trim(),
	});

	const formik = useFormik({
		initialValues: {
			comment: replayName ? replayName + commentText : commentText,
		},
		validationSchema: NewCommentSchema,

		onSubmit: async (values) => {
			setIsSending(true);

			try {
				const res = await fetch('/api/comments/edit', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						commentId,
						commentText: values.comment,
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

					queryClient.invalidateQueries();
					onEdit();
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

	const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
		const inputValue = event.target.value;
		if (replayName && inputValue.length < minCommLenght - 3) {
			formik.setFieldValue('comment', replayName + ' ');
		} else formik.setFieldValue('comment', inputValue);
	};

	return (
		<form onSubmit={formik.handleSubmit} className='flex flex-col gap-4 mt-10' action=''>
			<Textarea
				placeholder={'Eddit comment'}
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

				<Button onClick={() => onEdit()} type='button' variant={'secondary'}>
					Cancel
				</Button>
			</div>
		</form>
	);
};
