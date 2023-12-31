import React from 'react';

import { ImagePlus } from 'lucide-react';
import { AlertDialog, AlertDialogContent, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { ChangeProfileBackgroundImageForm } from '@/components/forms/profile/ChangeProfileBackgroundImageForm';
interface Props {
	userId: string;
	backgroundImage: string | null;
	onSave: () => void;
}

export const ChnageBackgroundImage = ({ userId, backgroundImage, onSave }: Props) => {
	return (
		<AlertDialog>
			<AlertDialogTrigger className='absolute bottom-2 md:bottom-3 right-5 ' asChild>
				<Button className='flex gap-2' variant={'secondary'} size={'xs'}>
					<ImagePlus />
					<p className='hidden md:inline'>Change your background</p>
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent className='max-w-2xl lg:max-w-4xl'>
				<ChangeProfileBackgroundImageForm
					userId={userId}
					backgroundImage={backgroundImage}
					onSave={onSave}
				/>
			</AlertDialogContent>
		</AlertDialog>
	);
};
