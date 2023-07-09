'use client';

import React from 'react';
import { ProfileAvatar } from '@/components/nav/user/ProfileAvatar';
import { signOut } from 'next-auth/react';
import { useToast } from '@/components/ui/use-toast';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useRouter } from 'next/navigation';
interface Props {
	name: string | undefined | null;
	email: string | undefined | null;
	image: string | undefined | null;
}

export const UserAccount = ({ name, email, image }: Props) => {
	const { toast } = useToast();
	const router = useRouter();

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
					<DropdownMenuItem
						className='cursor-pointer'
						onClick={() => router.push(`/profile/${name}`)}>
						Profile
					</DropdownMenuItem>
					<DropdownMenuItem className='cursor-pointer' onClick={() => router.push('/')}>
						Messeges
					</DropdownMenuItem>
					<DropdownMenuItem
						className='cursor-pointer'
						onClick={() => router.push('/communities/create')}>
						Create Community
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={logOutHandler} className='text-destructive cursor-pointer'>
					Log out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
