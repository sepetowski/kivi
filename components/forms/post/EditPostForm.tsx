'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { useToast } from '@/components/ui/use-toast';
import { NewPostSchema } from '@/validations/NewPostSchema';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ImagePlus, Loader2Icon, X } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/label';
import { saveImageInBucket } from '@/lib/saveImageInBucket';
import { createBucket } from '@/lib/createBucket';
import { v4 as uuidv4 } from 'uuid';
import { removeFromBucket } from '@/lib/removeFromBucket';
import { removeBucket } from '@/lib/removeBucket';

interface Props {
	initalContent: string;
	initalImg: string | null;
	bucketName: string | null;
	postId: string;
	fileName: string | null;
	imageUrl: string | null;
	onCanelEdit: () => void;
}

export const EditPostForm = ({
	initalContent,
	initalImg,
	bucketName,
	postId,
	fileName,
	imageUrl,
	onCanelEdit,
}: Props) => {
	const router = useRouter();
	const [image, setImage] = useState<null | string>(initalImg);
	const [isSending, setIsSending] = useState(false);
	const [isDeleted, setIsDeleted] = useState(false);

	const { toast } = useToast();
	const formik = useFormik({
		initialValues: {
			content: initalContent,
			picture: null,
		},
		validationSchema: NewPostSchema,

		onSubmit: async (values, { resetForm }) => {
			setIsSending(true);
			let imageFileName = fileName ? fileName : null;
			let editImageUrl = imageUrl ? imageUrl : null;
			const newBucketName = uuidv4();
			let dbBucketName = bucketName ? bucketName : newBucketName;
			if (values.picture) {
				console.log(fileName, imageUrl, bucketName);
				if (!bucketName) await createBucket(newBucketName);

				const { url, fileName: newFileName } = await saveImageInBucket(
					values.picture,
					dbBucketName
				);
				if (bucketName && fileName) removeFromBucket(bucketName, fileName);

				if (!url || !newFileName) {
					toast({
						variant: 'destructive',
						title: 'Oh no! Something went wrong.',
						description: 'Could not save image. Please try again',
					});

					setIsSending(false);
					return;
				}

				imageFileName = newFileName;
				editImageUrl = url;
			}
			if (!values.picture && isDeleted) {
				console.log(isDeleted);
				if (bucketName && fileName) await removeBucket(bucketName);

				imageFileName = null;
				editImageUrl = null;
				dbBucketName = '';
			}
			try {
				const res = await fetch('/api/post/edit', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						content: values.content,
						image: editImageUrl,
						imageName: imageFileName,
						postId,
						bucketName: dbBucketName ? dbBucketName : null,
					}),
				});
				if (!res.ok) {
					toast({
						variant: 'destructive',
						title: 'Oh no! Something went wrong.',
						description: res.statusText,
					});
					if (imageFileName) await removeFromBucket(dbBucketName, imageFileName);
				} else {
					toast({
						title: res.statusText,
					});
					resetForm();
					setImage(null);
				}
			} catch (err) {
				toast({
					variant: 'destructive',
					title: 'Oh no! Something went wrong. Please try again',
				});
				if (imageFileName) await removeFromBucket(dbBucketName, imageFileName);
			}
			router.refresh();
			onCanelEdit();
			setIsSending(false);
		},
	});

	const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			formik.setFieldValue('picture', e.target.files[0]);
			setImage(URL.createObjectURL(e.target.files[0]));
			setIsDeleted(false);
		}
	};
	const removeImageFromPostHandler = () => {
		formik.setFieldValue('picture', null);
		setImage(null);
		setIsDeleted(true);
	};
	return (
		<form onSubmit={formik.handleSubmit} className='w-full'>
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
			<div className='mt-4 flex justify-between items-center gap-4 w-full'>
				<div>
					<Label htmlFor='picture' className='cursor-pointer'>
						<ImagePlus size={20} />
					</Label>
					<Input id='picture' className='hidden' type='file' onChange={onImageChange} />
				</div>
				<div className='flex  items-center gap-4 '>
					<Button
						disabled={isSending || !((formik.dirty || isDeleted) && formik.isValid)}
						type='submit'>
						{!isSending && <>Save</>}
						{isSending && (
							<>
								Saving
								<Loader2Icon className='animate-spin ml-2' />
							</>
						)}
					</Button>
					<Button onClick={onCanelEdit} type='button' variant={'secondary'}>
						Cancel
					</Button>
				</div>
			</div>
		</form>
	);
};
