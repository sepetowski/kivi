'use client';

import React, { useState } from 'react';
import { NewCommunitySchema } from '@/validations/NewCommunitySchema';
import { useFormik } from 'formik';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button, buttonVariants } from '@/components/ui/button';
import { InputError } from '@/components/forms/InputError';
import Link from 'next/link';
import { useToast } from '@/components/ui/use-toast';
export const CreateCommunityForm = () => {
	const [isSending, setIsSending] = useState(false);
	const { toast } = useToast();
	const formik = useFormik({
		initialValues: {
			name: '',
			description: '',
		},
		validationSchema: NewCommunitySchema,

		onSubmit: async (values, { resetForm }) => {
			setIsSending(true);
			try {
				setIsSending(false);
				const res = await fetch('/api/community/create', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						name: values.name,
						description: values.description,
					}),
				});
				console.log(res);
				if (!res.ok)
					toast({
						variant: 'destructive',
						title: 'Oh no! Something went wrong.',
						description: res.statusText,
					});
				else {
					toast({
						title: res.statusText,
					});
					resetForm();
				}
			} catch (err) {
				toast({
					variant: 'destructive',
					title: 'Oh no! Something went wrong. Please try again',
				});
			}
		},
	});
	return (
		<form onSubmit={formik.handleSubmit}>
			<div className='grid w-full items-center gap-4'>
				<div className='flex flex-col space-y-1.5'>
					<Label htmlFor='name'>Name</Label>
					<Input
						id='name'
						type='text'
						placeholder='Name of your Community'
						value={formik.values.name}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					/>
					<InputError error={formik.errors.name} isInputTouched={formik.touched.name} />
				</div>
				<div className='flex flex-col space-y-1.5'>
					<Label htmlFor='description'>Description</Label>
					<Input
						id='description'
						type='text'
						placeholder='Description of your Community'
						value={formik.values.description}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					/>
					<InputError
						error={formik.errors.description}
						isInputTouched={formik.touched.description}
					/>
				</div>
			</div>
			<div className='flex justify-end gap-4 sm:gap-6 lg:gap-7 mt-12'>
				<Button type='submit'>Create Community</Button>
				<Link href='/' className={buttonVariants({ variant: 'secondary' })}>
					Cancel
				</Link>
			</div>
		</form>
	);
};
