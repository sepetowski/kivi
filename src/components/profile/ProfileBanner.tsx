import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { generateUsernameInitials } from '@/lib/generateUsernameInitials';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { EditProfile } from './EditProfile';
import { User } from '@/types/user';
import { Session } from 'next-auth';
import { FollowControl } from '@/components/profile/acctions/FollowControl';
import { FollowsInfo } from './FollowsInfo';

interface Props {
	userData: User;
	session: Session;
}

export const ProfileBanner = ({ userData, session }: Props) => {
	const isAlreadyFollowing = userData.followers.some(
		(user) => !userData.sessionUserPage && user.followerId === session.user.id
	);

	const dateObj = new Date(userData.createdAt);
	const monthAndYear = dateObj.toLocaleString('en-US', { year: 'numeric', month: 'long' });

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

				<h1 className='my-2 sm:my-3 font-medium text-center cursor-pointer text-xl sm:text-2xl mb-2'>
					{userData.name}
				</h1>
				<div className='text-center text-sm w-full'>
					<p className='w-5/6 mx-auto'>{userData.profileDescription}</p>
					<p className='text-xs text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mt-2'>
						Joined <span>{monthAndYear}</span>
					</p>
				</div>

				<FollowsInfo
					postsNumber={userData.posts.length}
					followersNumber={userData.followers.length}
					followingNumber={userData.following.length}
				/>
				{userData.sessionUserPage && (
					<div className='w-full flex justify-evenly items-center gap-3  mt-6 '>
						<EditProfile
							username={userData.name}
							profileDescription={userData.profileDescription}
						/>
					</div>
				)}
				<FollowControl
					userName={userData.name}
					isAlreadyFollowing={isAlreadyFollowing}
					sessionUserId={session.user.id}
					sessionUserPage={userData.sessionUserPage}
					userId={userData.id}
				/>
				<Separator className='w-full mt-4 sm:mt-6' orientation='horizontal' />
			</header>
		</>
	);
};