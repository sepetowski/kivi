'use client';

import React from 'react';
import Link from 'next/link';
import { ProfileAvatar } from '@/components/nav/ProfileAvatar';
import { signOut } from 'next-auth/react';
import { useToast } from '@/components/ui/use-toast';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
			<DropdownMenuContent className='w-64' align='end' sideOffset={10}>
				<DropdownMenuLabel className='py-0 pt-1.5'>{name}</DropdownMenuLabel>
				<DropdownMenuLabel className='py-0  pb-1.5 pt-0.5 text-xs text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
					@{email}
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<Link href={`/profile/${name}`}>Profile</Link>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<Link href='/'>Messeges</Link>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<Link href='/ '>Create Community</Link>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem className='text-destructive'>Log out</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
