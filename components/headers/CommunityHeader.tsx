'use client';
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { generateUsernameInitials } from '@/lib/generateUsernameInitials';
import { formatDate } from '@/lib/foramtDate';
import { ExtednedCommunitiyPage } from '@/types/communities';
import { buttonVariants } from '@/components/ui/button';
import { Book, Calendar, Users } from 'lucide-react';
import Link from 'next/link';
import { LeaveFromCommunity } from '../cards/community/leaveFromCommunity/LeaveFromCommunity';
import { JoinToCommunity } from '../cards/community/joinToCommunity/JoinToCommunity';

interface Props {
	communityData: ExtednedCommunitiyPage;
	communityName: string;
	userId: string;
}

export const CommunityHeader = ({ communityData, communityName, userId }: Props) => {
	const isCreatorOfCommunity = userId === communityData.creatorId;
	return (
		<header className='w-full max-w-[800px] mx-auto border rounded-md p-4'>
			<div className='flex  justify-between items-center'>
				<div className='w-full flex items-center gap-4'>
					<Avatar className='w-20 h-20'>
						<AvatarImage src={communityData.image} alt={communityName} />
						<AvatarFallback>{generateUsernameInitials(communityName)}</AvatarFallback>
					</Avatar>
					<h2 className='font-bold tetx-lg md:text-xl'>{communityData.name}</h2>
				</div>
				{isCreatorOfCommunity && communityData.userJoined && (
					<Link
						href={`/communities/browse/created?search=${communityName}`}
						className={`${buttonVariants({ variant: 'default' })}`}>
						Delete
					</Link>
				)}
				<LeaveFromCommunity
					id={communityData.id}
					isCreatorOfCommunity={isCreatorOfCommunity}
					userJoined={communityData.userJoined}
				/>
				<JoinToCommunity
					isCreatorOfCommunity={isCreatorOfCommunity}
					userJoined={communityData.userJoined}
					id={communityData.id}
				/>
			</div>

			<div className='mt-4 flex flex-col gap-2'>
				<p className='font-semibold md:text-lg'>About Community</p>
				<p className='text-muted-foreground'>{communityData.description}</p>
				<div className='flex gap-2 items-center'>
					<Calendar size={18} />
					<p className='text-muted-foreground '>
						Created <span>{formatDate(communityData.createdAt)}</span>
					</p>
				</div>
				<div className='flex gap-2 items-center'>
					<Users size={18} />
					<p className='text-muted-foreground '>
						Members <span>{communityData.members}</span>
					</p>
				</div>

				<div className='flex gap-2 items-center'>
					<Book size={18} />
					<p className='text-muted-foreground '>
						Posts <span>{communityData.postCount}</span>
					</p>
				</div>
				<Link
					href={`/communities/community/${communityName}/post`}
					className={`mt-4 sm:w-auto sm:self-start ${
						!communityData.userJoined ? 'pointer-events-none' : ''
					} ${buttonVariants({ variant: 'secondary' })}`}>
					{!communityData.userJoined && 'Join to community to add new post'}

					{communityData.userJoined && 'Add new Post'}
				</Link>
			</div>
		</header>
	);
};
