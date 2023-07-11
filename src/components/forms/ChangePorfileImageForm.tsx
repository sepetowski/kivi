'use client';
import React, { useState } from 'react';
import { checkIfBucketExist } from '@/lib/checkIfBucketExist';
import { createBucket } from '@/lib/createBucket';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { generateUsernameInitials } from '@/lib/generateUsernameInitials';
import {
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { InputError } from '@/components/forms/InputError';
import { useFormik } from 'formik';
import Image from 'next/image';

interface Props {
	userId: string;
}

interface Props {
	userId: string;
	image: string | null | undefined;
	name: string;
}

export const ChangePorfileImageForm = ({ userId, image, name }: Props) => {
	const [isSending, setIsSending] = useState(false);
	const [imagePreview, setImagePreview] = useState<null | string | undefined>(image);
	const formik = useFormik({
		initialValues: {
			picture: null,
		},
		onSubmit: () => {},
	});

	const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			formik.setFieldValue('picture', e.target.files[0]);
			setImagePreview(URL.createObjectURL(e.target.files[0]));
		}
	};

	const setImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		console.log(e);
		const target = e.target.files;
		console.log(target);
		if (target?.length != 0 && target !== null) chnageImageHnalder(target);
	};

	const chnageImageHnalder = async (img: FileList) => {
		console.log(img);
		const { founded, error, errorMsg } = await checkIfBucketExist(userId);
		console.log(founded, error, errorMsg);
		if (error) return;
		if (founded) console.log('znaleziony');
		if (!error && !founded) await createBucket(userId);

		// await saveImageInBucket();
	};

	return (
		<>
			<AlertDialogHeader>
				<AlertDialogTitle>Change your profile picture.</AlertDialogTitle>
				<AlertDialogDescription>
					Upload your photo and when you are ready approve the changes
				</AlertDialogDescription>
				<form className='w-full flex flex-col md:flex-row items-center justify-evenly gap-4 '>
					<Avatar className='w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 '>
						{imagePreview && <AvatarImage src={imagePreview} />}
						{!imagePreview && (
							<AvatarFallback className='bg-accent '>
								{generateUsernameInitials(name)}
							</AvatarFallback>
						)}
					</Avatar>
					<div className='flex flex-col space-y-1.5'>
						<Input className='cursor-pointer' id='picture' type='file' onChange={onImageChange} />
						<div className='text-xs text-muted-foreground  font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 space-y-1.5'>
							<p>Supported formats: JPG, JPEG, GIF, PNG.</p>
							<p>Maximum size of image is 5MB.</p>
						</div>
					</div>
				</form>
			</AlertDialogHeader>
			<AlertDialogFooter>
				<AlertDialogCancel>Cancel</AlertDialogCancel>
				<AlertDialogAction>Save</AlertDialogAction>
			</AlertDialogFooter>
		</>
	);
};
