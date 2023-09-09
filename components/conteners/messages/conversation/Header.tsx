import React from 'react';
import { ConversationAvatar } from './ConversationAvatar';
import { ChevronLeft, Palette } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { ConversationUser } from '@/types/conversations';

interface Props {
	userInfo: ConversationUser | undefined;
}

export const Header = ({ userInfo }: Props) => {
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
			<Palette />
		</header>
	);
};
