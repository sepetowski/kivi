'use client';

import React, { useState } from 'react';
import { NewCommunitySchema } from '@/validations/NewCommunitySchema';
import { useFormik } from 'formik';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button, buttonVariants } from '@/components/ui/button';
import { InputError } from '@/components/forms/InputError';
import { useToast } from '@/components/ui/use-toast';
import { Loader2Icon } from 'lucide-react';
import { removeFromBucket } from '@/lib/removeFromBucket';
import Link from 'next/link';
import Image from 'next/image';
import { saveImageInBucket } from '@/lib/saveImageInBucket';
import { useRouter } from 'next/navigation';

const COMMUNITY_AVATARS = 'communitiesavatars';

export const CreateCommunityForm = () => {
	const router = useRouter();
	const [image, setImage] = useState<null | string>(null);
	const [isSending, setIsSending] = useState(false);

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
			const urlAndFileName = await saveImageInBucket(values.picture!, COMMUNITY_AVATARS);

			if (typeof urlAndFileName === null) {
				toast({
					variant: 'destructive',
					title: 'Oh no! Something went wrong.',
					description: 'Could not save community avatar in database, please try again!',
				});
				return;
			}
			if (
				Array.isArray(urlAndFileName) &&
				urlAndFileName.every((item) => typeof item === 'string')
			) {
				const [url, fileName] = urlAndFileName;
				try {
					const res = await fetch('/api/community/create', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							name: values.name,
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
							title: res.statusText,
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
				<div className='flex flex-col space-y-1.5'>
					<Label htmlFor='picture'>Picture</Label>

					<Input className='cursor-pointer' id='picture' type='file' onChange={onImageChange} />
					<div className='text-xs text-muted-foreground  font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 space-y-1.5'>
						<p>This is avatar of your community. Supported formats: JPG, JPEG, GIF, PNG.</p>
						<p>Maximum size of image is 5MB.</p>
					</div>

					{image && (
						<div className='self-center sm:self-start w-24 h-24 md:w-32 md:h-32 rounded-full relative '>
							<Image className=' rounded-full' alt='preview image' src={image} fill />
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
							Please wait
							<Loader2Icon className='animate-spin' />
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
