'use client';

import React from 'react';
import Link from 'next/link';
import { ProfileAvatar } from '@/components/nav/ProfileAvatar';
import { signOut } from 'next-auth/react';
import { useToast } from '@/components/ui/use-toast';
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuSeparator,
	DropdownMenuItem,
	DropdownMenuRadioGroup,
} from '@radix-ui/react-dropdown-menu';

interface Props {
	name: string | undefined | null;
	email: string | undefined | null;
	image: string | undefined | null;
}

export const UserAccount = ({ name, email, image }: Props) => {
	const { toast } = useToast();
	const logOutHandler = () => {
		signOut();
		toast({
			title: 'You have been logout',
		});
	};
	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<ProfileAvatar image={image} name={name} />
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className='bg-muted flex flex-col rounded-md shadow-sm'
				align='end'
				sideOffset={10}>
				<div className='flex flex-col space-y-1 leading-none border-b p-3'>
					{name && <p className='font-medium'>{name}</p>}
					{email && <p className='w-[200px] truncate text-sm text-muted-foreground'>{email}</p>}
				</div>

				<DropdownMenuSeparator />
				<DropdownMenuRadioGroup className='p-2 flex flex-col gap-1'>
					<DropdownMenuItem asChild>
						<Link className='p-1' href='/'>
							Profile
						</Link>
					</DropdownMenuItem>

					<DropdownMenuItem asChild>
						<Link className='p-1' href='/'>
							Messeges
						</Link>
					</DropdownMenuItem>
					<DropdownMenuItem asChild>
						<Link className='p-1' href='/ '>
							Create Community
						</Link>
					</DropdownMenuItem>
				</DropdownMenuRadioGroup>
				<DropdownMenuSeparator />
				<DropdownMenuSeparator className='p-2 border-t'>
					<DropdownMenuItem
						className='cursor-pointer p-1 text-destructive'
						onSelect={logOutHandler}>
						Sign out
					</DropdownMenuItem>
				</DropdownMenuSeparator>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
