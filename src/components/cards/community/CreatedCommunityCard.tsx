'use client';
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Button, buttonVariants } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import { DeleteCommunity } from './deleteCommunity/DeleteCommunity';
import { Edit, CheckSquare, XSquare, Divide } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CreatedCommunityCardAvatar } from './changePorfileAvatar/CreatedCommunityCardAvatar';

interface Props {
	name: string;
	posts: number;
	members: number;
	description: string;
	id: string;
	image: string;
	creatorId: string | null;
}

export const CreatedCommunityCard = ({
	name,
	description,
	id,
	members,
	posts,
	image,
	creatorId,
}: Props) => {
	const session = useSession();
	const [isNameEditting, setIsNameEditting] = useState(false);
	const [isDescriptionEditting, setIsDescriptionEditting] = useState(false);

	const { data } = session;
	const isCreatorOfCommunity = data?.user.id === creatorId;

	return (
		<Card className='w-full  '>
			<CardHeader>
				<CardTitle className='flex justify-between items-center'>
					{!isNameEditting && (
						<div className='flex items-center gap-2'>
							{name}
							<Button
								onClick={() => {
									setIsNameEditting(true);
								}}
								variant={'ghost'}
								size={'xs'}>
								<Edit />
							</Button>
						</div>
					)}
					{isNameEditting && (
						<div className='flex gap-4 w-full md:w-2/3 items-center'>
							<Input type='text' />
							<div className='flex gap-2'>
								<Button size={'xs'}>
									<CheckSquare />
								</Button>
								<Button
									onClick={() => {
										setIsNameEditting(false);
									}}
									variant={'secondary'}
									size={'xs'}>
									<XSquare />
								</Button>
							</div>
						</div>
					)}
					<CreatedCommunityCardAvatar
						communityId={id}
						image={image}
						name={name}
						isNameEditting={isNameEditting}
					/>
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
			<CardContent>
				{!isDescriptionEditting && (
					<div className='md:w-2/3 flex items-center gap-2'>
						<p>{description}</p>
						<Button
							onClick={() => {
								setIsDescriptionEditting(true);
							}}
							variant={'ghost'}
							size={'xs'}>
							<Edit />
						</Button>
					</div>
				)}
				{isDescriptionEditting && (
					<div className='md:w-2/3 flex items-start gap-4'>
						<Textarea />
						<div className='flex flex-col gap-2'>
							<Button size={'xs'}>
								<CheckSquare />
							</Button>
							<Button
								onClick={() => {
									setIsDescriptionEditting(false);
								}}
								variant={'secondary'}
								size={'xs'}>
								<XSquare />
							</Button>
						</div>
					</div>
				)}
			</CardContent>
			<CardFooter className='flex items-center justify-end gap-2'>
				<DeleteCommunity id={id} isCreatorOfCommunity={isCreatorOfCommunity} userJoined={true} />

				<Link className={buttonVariants({ variant: 'outline', size: 'sm' })} href='/'>
					Check
				</Link>
			</CardFooter>
		</Card>
	);
};
