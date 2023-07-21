'use client';

import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Input } from '@/components/ui/input';
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
import { NewPostSchema } from '@/validations/NewPostSchema';
import { Separator } from '@/components/ui/separator';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { File, ImagePlus, SmilePlus } from 'lucide-react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export const NewPostForm = () => {
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
			

			<Textarea
				id='content'
				value={formik.values.content}
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				placeholder="What's hapening?"
				className='resize-none outline-none border-none h-28 my-4 '
			/>

			{image && (
				<div className='relative w-full h-96 mt-6'>
					<Image alt='preview image' src={image} fill />
				</div>
			)}
			<Separator className='w-full my-6' />
			<div className='flex justify-between items-center mt-4 '>
				<div className='flex gap-3 items-center'>
					<Label htmlFor='picture' className='cursor-pointer'>
						<ImagePlus size={20} />
					</Label>
					<Input id='picture' className='hidden' type='file' onChange={onImageChange} />
					<SmilePlus />
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
					<Button disabled={!(formik.dirty && formik.isValid)} type='submit'>
						Add Post
					</Button>
				</div>
			</div>
		</form>
	);
};
