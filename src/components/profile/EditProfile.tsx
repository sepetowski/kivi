import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UserCog2 } from 'lucide-react';
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';

export const EditProfile = () => {
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
				</SheetHeader>
				<div className='grid gap-4 py-4'>
					<div className='grid grid-cols-4 items-center gap-4'>
						<Label htmlFor='name' className='text-right'>
							Name
						</Label>
						<Input id='name' value='Pedro Duarte' className='col-span-3' />
					</div>
					<div className='grid grid-cols-4 items-center gap-4'>
						<Label htmlFor='username' className='text-right'>
							Username
						</Label>
						<Input id='username' value='@peduarte' className='col-span-3' />
					</div>
				</div>
				<SheetFooter>
					<SheetClose asChild>
						<Button type='submit'>Save changes</Button>
					</SheetClose>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
};
