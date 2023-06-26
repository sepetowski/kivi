'use client';
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { generateUsernameInitials } from '@/lib/generateUsernameInitials';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { UserPlus2, Plus } from 'lucide-react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { EditProfile } from './EditProfile';

interface Props {
	userData: User;
}

export const ProfileBanner = ({ userData }: Props) => {
	return (
		<>
			<div className='w-full  h-56 sm:h-72 shadow-sm bg-secondary mx-auto rounded-2xl '></div>
			<header className='w-full flex flex-col justify-center items-center  mx-auto '>
				<Avatar className='w-20 h-20 mt-[-2.5rem] sm:w-24 sm:h-24 sm:mt-[-3rem] '>
					{userData.image && <AvatarImage src={userData.image} />}
					{!userData.image && (
						<AvatarFallback className='bg-muted-foreground '>
							{generateUsernameInitials(userData.name)}
						</AvatarFallback>
					)}
				</Avatar>
				<HoverCard>
					<HoverCardTrigger>
						<h1 className='my-2 sm:my-3 font-medium text-center cursor-pointer text-xl sm:text-2xl'>{userData.name}</h1>
					</HoverCardTrigger>
					<HoverCardContent className='text-sm text-center hidden lg:block sm:text-base'>
						{userData.sessionUserPage && <p>@{userData.email}</p>}
						<p className='mt-2 text-xs'>Joined December 2021</p>
					</HoverCardContent>
				</HoverCard>

				<div className='flex h-10 sm:h-12 items-center space-x-8 text-sm mt-4 sm:mt-5 sm:text-lg'>
					<div className='flex flex-col justify-center items-center'>
						<p>12</p>
						<p className='text-xs sm:text-sm text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
							posts
						</p>
					</div>
					<Separator orientation='vertical' />
					<div className='flex flex-col justify-center items-center '>
						<p>22</p>
						<p className='text-xs sm:text-sm text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
							followers
						</p>
					</div>
					<Separator orientation='vertical' />
					<div className='flex flex-col justify-center items-center'>
						<p>161</p>
						<p className='text-xs sm:text-sm text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
							following
						</p>
					</div>
				</div>
				{userData.sessionUserPage && (
					<div className='w-full flex justify-evenly items-center gap-3  mt-6 '>
						<Button className='w-1/2 max-w-xs sm:text-lg sm:p-5 flex gap-2 '>
							New post <Plus />
						</Button>
						<EditProfile />
					</div>
				)}
				{!userData.sessionUserPage && (
					<Button className='w-full flex gap-2 mt-6 sm:mt-8 sm:text-lg max-w-sm sm:p-5'>
						Follow <UserPlus2 />
					</Button>
				)}
				<Separator className='w-full mt-4 sm:mt-6' orientation='horizontal' />
			</header>
		</>
	);
};
