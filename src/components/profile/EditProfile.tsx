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
				<Button className='w-1/2 max-w-xs sm:text-lg sm:p-5 flex gap-2 ' variant='outline'>
					Edit profile
					<UserCog2 />
				</Button>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Edit profile</SheetTitle>
					<SheetDescription>
						Make changes to your profile here. Click save when you are re done.
					</SheetDescription>
					<SheetDescription className='text-destructive uppercase font-bold'>
						if you change your username, you will be automatically logged out
					</SheetDescription>
				</SheetHeader>
				<EdditProfileForm profileDescription={profileDescription} username={username} />
			</SheetContent>
		</Sheet>
	);
};
