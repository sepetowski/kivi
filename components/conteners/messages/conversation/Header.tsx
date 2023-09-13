'use client';

import React from 'react';
import { ConversationAvatar } from './ConversationAvatar';
import { ChevronLeft, Palette, Check } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { ConversationUser } from '@/types/conversations';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useThemeConversation } from '@/contex/ChnageConversationTheme';
import { themes } from '@/lib/themes';
import { AvaibleThemes } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';

interface Props {
	userInfo: ConversationUser | undefined;
	conversationId: string;
}

export const Header = ({ userInfo, conversationId }: Props) => {
	const { activeTheme, setActiveTheme } = useThemeConversation();
	const router = useRouter();
	const { toast } = useToast();

	const themeHandler = async (theme: AvaibleThemes) => {
		setActiveTheme(theme);
		try {
			const res = await fetch('/api/messages/change-theme', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					theme,
					conversationId,
				}),
			});
			if (!res.ok) {
				toast({
					variant: 'destructive',
					title: 'Oh no! Something went wrong.',
					description: 'Could not save theme in database. Please try again',
				});
			} else {
				router.refresh();
			}
		} catch (err) {
			toast({
				variant: 'destructive',
				title: 'Oh no! Something went wrong.',
				description: 'Could not save theme in database. Please try again',
			});
		}
	};

	return (
		<header className='w-full p-4 lg:p-6 border-b shadow-sm  bg-background mt-32 md:mt-20 flex justify-between items-center '>
			<div className='flex items-center gap-2'>
				<Link
					href={'/messages'}
					className={`hover:bg-transparent ${buttonVariants({ variant: 'ghost', size: 'xs' })}`}>
					<ChevronLeft />
				</Link>
				<ConversationAvatar userInfo={userInfo} />
			</div>
			<DropdownMenu>
				<DropdownMenuTrigger>
					<Palette />
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuLabel>Change theme</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<div className='grid grid-cols-3 grid-rows-4 gap-4 p-2'>
						{themes.map((theme) => (
							<DropdownMenuItem
								onClick={() => {
									themeHandler(theme.type);
								}}
								key={theme.type}
								className={` flex justify-center items-center rounded-full w-5 h-5 p-0.5 ${theme.color} ${theme.focus} cursor-pointer text-white`}>
								{activeTheme === theme.type && <Check className='w-full' />}
							</DropdownMenuItem>
						))}
					</div>
				</DropdownMenuContent>
			</DropdownMenu>
		</header>
	);
};
