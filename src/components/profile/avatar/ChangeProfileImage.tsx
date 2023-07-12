import React from 'react';

import { ImagePlus } from 'lucide-react';
import { AlertDialog, AlertDialogContent, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { ChangePorfileImageForm } from '@/components/forms/ChangePorfileImageForm';
interface Props {
	userId: string;
	image: string | null | undefined;
	name: string;
	onSave: () => void;
}

export const ChangeProfileImage = ({ userId, image, name,onSave }: Props) => {
	return (
		<AlertDialog>
			<AlertDialogTrigger
				className='absolute bottom-[-2px] right-[-2px] md:right-[-5px] z-50 '
				asChild>
				<Button className='rounded-full w-8 h-8 md:w-9 md:h-9' variant={'default'} size={'xs'}>
					<ImagePlus />
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent className='max-w-xl'>
				<ChangePorfileImageForm userId={userId} image={image} name={name} onSave={onSave} />
			</AlertDialogContent>
		</AlertDialog>
	);
};
