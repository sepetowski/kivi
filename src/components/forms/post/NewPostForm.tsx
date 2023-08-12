'use client';

import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Loader2Icon, X } from 'lucide-react';
import { removeFromBucket } from '@/lib/removeFromBucket';
import Image from 'next/image';
import { saveImageInBucket } from '@/lib/saveImageInBucket';
import { useRouter } from 'next/navigation';
import { NewPostSchema } from '@/validations/NewPostSchema';
import { Separator } from '@/components/ui/separator';
import { ImagePlus } from 'lucide-react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { createBucket } from '@/lib/createBucket';
import { v4 as uuidv4 } from 'uuid';

interface Props {
	communityName: string;
}

export const NewPostForm = ({ communityName }: Props) => {
	const router = useRouter();
	const [image, setImage] = useState<null | string>(null);
	const [isSending, setIsSending] = useState(false);

	const { toast } = useToast();
	const formik = useFormik({
		initialValues: {
			content: '',
			picture: null,
		},
		validationSchema: NewPostSchema,

		onSubmit: async (values, { resetForm }) => {
			setIsSending(true);

			let imageFileName = null;
			let imageUrl = null;
			const bucketName = uuidv4();
			if (values.picture) {
				await createBucket(bucketName);
				const { url, fileName } = await saveImageInBucket(values.picture, bucketName);

				if (!url || !fileName) {
					toast({
						variant: 'destructive',
						title: 'Oh no! Something went wrong.',
						description: 'Could not save image. Please try again',
					});

					setIsSending(false);
					return;
				}

				imageFileName = fileName;
				imageUrl = url;
			}

			try {
				const res = await fetch('/api/post/add', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						content: values.content,
						image: imageUrl,
						imageName: imageFileName,
						communityName,
						bucketName: imageUrl ? bucketName : null,
					}),
				});
				if (!res.ok) {
					toast({
						variant: 'destructive',
						title: 'Oh no! Something went wrong.',
						description: res.statusText,
					});
					if (imageFileName) await removeFromBucket(bucketName, imageFileName);
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
				if (imageFileName) await removeFromBucket(bucketName, imageFileName);
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
	const removeImageFromPostHandler = () => {
		formik.setFieldValue('picture', null);
		setImage(null);
	};

	return (
		<form onSubmit={formik.handleSubmit}>
			<Textarea
				id='content'
				value={formik.values.content}
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				placeholder="What's hapening?"
				className='resize-none outline-none border-none h-28 my-4 '
			/>

			{image && (
				<div className='relative w-full pt-[50%] mt-6'>
					<Image
						className='w-full h-full top-0 left-0 object-contain'
						alt='preview image'
						src={image}
						fill
					/>
					<Button
						onClick={removeImageFromPostHandler}
						className='absolute top-2 right-2 z-20'
						size={'icon'}
						variant={'default'}>
						<X />
					</Button>
				</div>
			)}
			<Separator className='w-full my-6' />
			<div className='flex justify-between items-center mt-4 '>
				<div>
					<Label htmlFor='picture' className='cursor-pointer'>
						<ImagePlus size={20} />
					</Label>
					<Input id='picture' className='hidden' type='file' onChange={onImageChange} />
				</div>
				<div className='flex gap-3 items-center '>
					{formik.values.content.length <= 250 && (
						<div className='w-10 h-10'>
							<CircularProgressbar
								value={formik.values.content.length}
								maxValue={250}
								styles={buildStyles({})}
							/>
						</div>
					)}
					{formik.values.content.length > 250 && (
						<span className='text-destructive'>{250 - formik.values.content.length}</span>
					)}

					<Separator className='h-8' orientation='vertical' />
					<Button disabled={isSending || !(formik.dirty && formik.isValid)} type='submit'>
						{!isSending && <>Add Post</>}
						{isSending && (
							<>
								Adding
								<Loader2Icon className='animate-spin ml-2' />
							</>
						)}
					</Button>
				</div>
			</div>
		</form>
	);
};
