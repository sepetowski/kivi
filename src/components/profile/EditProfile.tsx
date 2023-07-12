import React from 'react';
import { Button } from '@/components/ui/button';
import { UserCog2 } from 'lucide-react';
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { EdditProfileForm } from '../forms/EditProfileForm';

interface Props {
	username: string;
	profileDescription: string;
}

export const EditProfile = ({ profileDescription, username }: Props) => {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button
					className='text-xs xs:text-sm mt-2 md:mt-4 rounded-full sm:text-lg sm:p-5 flex gap-2 '
					variant='outline'>
					Edit profile
					<UserCog2 className='hidden md:inline-block' />
				</Button>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Edit profile</SheetTitle>
					<SheetDescription>
						Make changes to your profile here. Click save when you are re done.
					</SheetDescription>
				</SheetHeader>
				<EdditProfileForm profileDescription={profileDescription} username={username} />
			</SheetContent>
		</Sheet>
	);
};
