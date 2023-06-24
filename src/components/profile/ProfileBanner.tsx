'use client';
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useSession } from 'next-auth/react';
import { generateUsernameInitials } from '@/lib/generateUsernameInitials';
import { Separator } from '@/components/ui/Separator';
import { Button } from '@/components/ui/Button';
import { UserCog2, Plus } from 'lucide-react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';



export const ProfileBanner = () => {
	const session = useSession();
	return (
		<>
			<div className='w-full  h-56 shadow-sm bg-secondary mx-auto rounded-2xl '></div>
			<header className='w-full flex flex-col justify-center items-center  mx-auto '>
				{session.status === 'authenticated' && (
					<>
						<Avatar className='w-20 h-20 mt-[-60px]'>
							{session.data.user?.image && <AvatarImage src={session.data.user?.image} />}
							{session.data?.user?.name && (
								<AvatarFallback>
									{generateUsernameInitials(session.data?.user?.name)}
								</AvatarFallback>
							)}
						</Avatar>
						<HoverCard>
							<HoverCardTrigger>
								<h1 className='my-2 font-medium text-center cursor-pointer'>
									{session.data?.user?.name}
								</h1>
							</HoverCardTrigger>
							<HoverCardContent className='text-sm text-center'>
								<p>@{session.data?.user?.email}</p>
								<p className='mt-2 text-xs'>Joined December 2021</p>
							</HoverCardContent>
						</HoverCard>
					</>
				)}
				<div className='flex h-10 items-center space-x-8 text-sm mt-4'>
					<div className='flex flex-col justify-center items-center'>
						<p>12</p>
						<p className='text-xs text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
							posts
						</p>
					</div>
					<Separator orientation='vertical' />
					<div className='flex flex-col justify-center items-center '>
						<p>22</p>
						<p className='text-xs text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
							followers
						</p>
					</div>
					<Separator orientation='vertical' />
					<div className='flex flex-col justify-center items-center'>
						<p>161</p>
						<p className='text-xs text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
							following
						</p>
					</div>
				</div>
				<div className='w-full flex justify-between items-center gap-3 mt-6'>
					<Button className='w-1/2  flex gap-2'>
						New post <Plus />
					</Button>
					<Button className='w-1/2  flex gap-2' variant='outline'>
						Edit profile
						<UserCog2 />
					</Button>
				</div>
				<Separator className='w-full mt-4' orientation='horizontal' />
			</header>
		</>
	);
};
