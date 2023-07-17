'use client';
import React, { useState } from 'react';
import { checkIfBucketExist } from '@/lib/checkIfBucketExist';
import { createBucket } from '@/lib/createBucket';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { generateUsernameInitials } from '@/lib/generateUsernameInitials';
import { useToast } from '@/components/ui/use-toast';
import {
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { InputError } from '@/components/forms/InputError';
import { useFormik } from 'formik';
import { ImageSchema } from '@/validations/UploadImageSchema';
import { saveImageInBucket } from '@/lib/saveImageInBucket';
import { removeFromBucket } from '@/lib/removeFromBucket';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

interface Props {
	userId: string;
	image: string | null | undefined;
	name: string;
	onSave: () => void;
}

export const ChangePorfileImageForm = ({ userId, image, name, onSave }: Props) => {
	const session = useSession();
	const router = useRouter();
	const [imagePreview, setImagePreview] = useState<null | string | undefined>(image);
	const { toast } = useToast();

	const formik = useFormik({
		initialValues: {
			picture: null,
		},
		validationSchema: ImageSchema,

		onSubmit: async (values) => {
			onSave();
			toast({
				title: 'Saving your profile picture. Please wait...',
			});

			const { founded, error, errorMsg } = await checkIfBucketExist(userId);

			if (error) {
				toast({
					variant: 'destructive',
					title: 'Ops. Sometnig went wrong!',
					description: errorMsg,
				});
				return;
			}

			if (!error && !founded) await createBucket(userId);
			const { url, fileName } = await saveImageInBucket(values.picture!, userId);

			if (!url || !fileName) {
				toast({
					variant: 'destructive',
					title: 'Oh no! Something went wrong.',
					description: 'Could not save image. Please try again',
				});

				return;
			}

			try {
				const res = await fetch('/api/change-profile-picture', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
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
					await removeFromBucket(userId, fileName);
				} else {
					toast({
						title: res.statusText,
					});
					await session.update();

					const { previousFileName }: { previousFileName: string | null } = await res.json();
					if (previousFileName) await removeFromBucket(userId, previousFileName);
					router.refresh();
				}
			} catch (err) {
				toast({
					variant: 'destructive',
					title: 'Oh no! Something went wrong. Please try again',
				});
				await removeFromBucket(userId, fileName);
			}
			onSave();
		},
	});

	const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			formik.setFieldValue('picture', e.target.files[0]);
			setImagePreview(URL.createObjectURL(e.target.files[0]));
		}
	};

	return (
		<>
			<AlertDialogHeader>
				<AlertDialogTitle>Change your profile picture.</AlertDialogTitle>
				<AlertDialogDescription>
					Upload your photo and when you are ready approve the changes
				</AlertDialogDescription>
				<form
					onSubmit={formik.handleSubmit}
					className='w-full flex flex-col md:flex-row items-center justify-evenly gap-4 '>
					<Avatar className='w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 '>
						{imagePreview && <AvatarImage className='object-cover' src={imagePreview} />}
						{!imagePreview && (
							<AvatarFallback className='bg-accent  '>
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
						<InputError error={formik.errors.picture} isInputTouched={formik.touched.picture} />
					</div>
				</form>
			</AlertDialogHeader>
			<AlertDialogFooter>
				<AlertDialogCancel>Cancel</AlertDialogCancel>
				<AlertDialogAction disabled={!(formik.dirty && formik.isValid)} onClick={formik.submitForm}>
					Save
				</AlertDialogAction>
			</AlertDialogFooter>
		</>
	);
};
