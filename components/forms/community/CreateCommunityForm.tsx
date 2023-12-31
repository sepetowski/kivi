'use client';

import React, { useRef, useState } from 'react';
import { NewCommunitySchema } from '@/validations/NewCommunitySchema';
import { useFormik } from 'formik';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button, buttonVariants } from '@/components/ui/button';
import { InputError } from '@/components/forms/InputError';
import { useToast } from '@/components/ui/use-toast';
import { Loader2Icon } from 'lucide-react';
import { removeFromBucket } from '@/lib/removeFromBucket';
import Link from 'next/link';
import Image from 'next/image';
import { saveImageInBucket } from '@/lib/saveImageInBucket';
import { useRouter } from 'next/navigation';
import { COMMUNITY_AVATARS } from '@/lib/bucektsNames';

export const CreateCommunityForm = () => {
	const router = useRouter();
	const [image, setImage] = useState<null | string>(null);
	const [isSending, setIsSending] = useState(false);
	const inputRef = useRef<null | HTMLInputElement>(null);

	const { toast } = useToast();
	const formik = useFormik({
		initialValues: {
			name: '',
			description: '',
			picture: null,
		},
		validationSchema: NewCommunitySchema,

		onSubmit: async (values, { resetForm }) => {
			setIsSending(true);
			const { url, fileName } = await saveImageInBucket(values.picture!, COMMUNITY_AVATARS);

			if (!url || !fileName) {
				toast({
					variant: 'destructive',
					title: 'Oh no! Something went wrong.',
					description: 'Could not save image. Please try again',
				});

				return;
			}

			try {
				const res = await fetch('/api/communities/create', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						name: values.name.trim(),
						description: values.description,
						picture: url,
						fileName,
					}),
				});
				if (!res.ok) {
					toast({
						variant: 'destructive',
						title: 'Oh no! Something went wrong.',
						description: res.statusText,
					});
					await removeFromBucket(COMMUNITY_AVATARS, fileName);
				} else {
					toast({
						title: `${values.name.trim()} community was created!`,
					});
					resetForm();
					setImage(null);
					router.refresh();
				}
			} catch (err) {
				toast({
					variant: 'destructive',
					title: 'Oh no! Something went wrong. Please try again',
				});
				await removeFromBucket(COMMUNITY_AVATARS, fileName);
			}
			setIsSending(false);
		},
	});

	const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			formik.setFieldValue('picture', e.target.files[0]);
			setImage(URL.createObjectURL(e.target.files[0]));
		}
	};

	return (
		<form onSubmit={formik.handleSubmit}>
			<div className='grid w-full items-center gap-4'>
				<div className='flex flex-col space-y-3'>
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
				<div className='flex flex-col space-y-3'>
					<Label htmlFor='description'>Description</Label>

					<Textarea
						className='max-h-96'
						placeholder='Type your description here.'
						id='description'
						value={formik.values.description}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					/>
					<InputError
						error={formik.errors.description}
						isInputTouched={formik.touched.description}
					/>
				</div>
				<div className='flex flex-col space-y-3'>
					<Label htmlFor='picture'>Picture</Label>

					<button
						type='button'
						className='flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
						onClick={() => {
							inputRef.current?.click();
						}}>
						Choose your picture
					</button>
					<input
						onChange={onImageChange}
						ref={inputRef}
						type='file'
						id='picture'
						className='hidden'
					/>

					<div className='text-xs text-muted-foreground  font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 space-y-1.5'>
						<p>This is avatar of your community. Supported formats: JPG, JPEG, GIF, PNG.</p>
						<p>Maximum size of image is 5MB.</p>
					</div>

					{image && (
						<div className='self-center sm:self-start w-24 h-24 md:w-32 md:h-32 rounded-full relative '>
							<Image className=' rounded-full object-cover' alt='preview image' src={image} fill />
						</div>
					)}

					<InputError error={formik.errors.picture} isInputTouched={formik.touched.picture} />
				</div>
			</div>
			<div className='flex justify-end gap-4 sm:gap-6 lg:gap-7 mt-12'>
				<Button disabled={isSending} type='submit'>
					{!isSending && <>Create Community</>}
					{isSending && (
						<>
							Creating community
							<Loader2Icon className='animate-spin ml-2' />
						</>
					)}
				</Button>
				<Link href='/' className={buttonVariants({ variant: 'secondary' })}>
					Cancel
				</Link>
			</div>
		</form>
	);
};
