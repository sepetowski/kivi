import React from 'react';

import { ImagePlus } from 'lucide-react';
import { AlertDialog, AlertDialogContent, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { ChangeCommunityAvatarForm } from '@/components/forms/community/ChangeCommunityAvatarForm';
interface Props {
	communityId: string;
	image: string | null | undefined;
	name: string;
	onSave: () => void;
}

export const ChangeCreatedCommunityCardAvatar = ({ communityId, image, name, onSave }: Props) => {
	return (
		<AlertDialog>
			<AlertDialogTrigger className='absolute bottom-[-8px] left-[-8px]  z-50 ' asChild>
				<Button className='rounded-full w-8 h-8 ' variant={'default'} size={'icon'}>
					<ImagePlus size={20} />
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent className='max-w-xl'>
				<ChangeCommunityAvatarForm
					communityId={communityId}
					image={image}
					name={name}
					onSave={onSave}
				/>
			</AlertDialogContent>
		</AlertDialog>
	);
};
