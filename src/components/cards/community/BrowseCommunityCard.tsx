'use client';
import React from 'react';
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { Button, buttonVariants } from '@/components/ui/button';
import { generateUsernameInitials } from '@/lib/generateUsernameInitials';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useSession } from 'next-auth/react';
import { JoinToCommunity } from './joinToCommunity/JoinToCommunity';
import { LeaveFromCommunity } from './leaveFromCommunity/LeaveFromCommunity';
import { DeleteCommunity } from './deleteCommunity/DeleteCommunity';

interface Props {
	name: string;
	posts: number;
	members: number;
	description: string;
	id: string;
	image: string;
	userJoined: boolean;
	creatorId: string | null;
}

export const BrowseCommunityCard = ({
	name,
	description,
	id,
	members,
	posts,
	image,
	userJoined,
	creatorId,
}: Props) => {
	const session = useSession();

	const { data } = session;
	const isCreatorOfCommunity = data?.user.id === creatorId;

	return (
		<Card className='w-full  sm:w-[75%] lg:w-80 xl:w-96'>
			<CardHeader>
				<CardTitle className='flex justify-between items-center'>
					{name}
					<Avatar className='w-14 h-14'>
						<AvatarImage src={image} />
						<AvatarFallback>{generateUsernameInitials(name)}</AvatarFallback>
					</Avatar>
				</CardTitle>
				<div className='flex flex-col text-sm text-muted-foreground'>
					<p>
						Posts: <span className='font-medium text-primary'>{posts}</span>
					</p>

					<p>
						Members: <span className='font-medium text-primary'>{members}</span>
					</p>
				</div>
			</CardHeader>

			<ScrollArea className='h-24  p-6 pt-0 '>{description}</ScrollArea>

			<CardFooter className='flex items-center justify-end gap-2'>
				<DeleteCommunity
					id={id}
					isCreatorOfCommunity={isCreatorOfCommunity}
					userJoined={userJoined}
				/>
				<LeaveFromCommunity
					id={id}
					isCreatorOfCommunity={isCreatorOfCommunity}
					userJoined={userJoined}
				/>
				<JoinToCommunity
					isCreatorOfCommunity={isCreatorOfCommunity}
					userJoined={userJoined}
					id={id}
				/>
				<Link
					className={buttonVariants({ variant: 'outline', size: 'sm' })}
					href={`/communities/community/${name}`}>
					Check
				</Link>
			</CardFooter>
		</Card>
	);
};
