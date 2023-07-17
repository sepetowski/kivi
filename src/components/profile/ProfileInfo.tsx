import React from 'react';
import { Heart, LayoutGrid, Gamepad, Users2 } from 'lucide-react';
import { EditProfile } from './EditProfile';
import { User } from '@/types/user';
import { Session } from 'next-auth';
import { FollowControl } from '@/components/profile/follow/FollowControl';
import { FollowsInfo } from './FollowsInfo';
import { Calendar } from 'lucide-react';
import Link from 'next/link';
import { ProfileAvatar } from '@/components/profile/avatar/ProfileAvatar';

interface Props {
	userData: User;
	session: Session;
}

export const ProfileInfo = ({ session, userData }: Props) => {
	const isAlreadyFollowing = userData.followers.some(
		(user) => !userData.sessionUserPage && user.followerId === session.user.id
	);

	const dateObj = new Date(userData.createdAt);
	const monthAndYear = dateObj.toLocaleString('en-US', { year: 'numeric', month: 'long' });

	return (
		<header className='w-full flex flex-col justify-start items-center  mx-auto px-4 lg:px-8   '>
			<div className='flex justify-between  w-full'>
				<ProfileAvatar
					image={userData.image}
					name={userData.name}
					sessionUserPage={userData.sessionUserPage}
					userId={userData.id}
				/>

				{userData.sessionUserPage && (
					<EditProfile username={userData.name} profileDescription={userData.profileDescription} />
				)}
				<FollowControl
					userName={userData.name}
					isAlreadyFollowing={isAlreadyFollowing}
					sessionUserId={session.user.id}
					sessionUserPage={userData.sessionUserPage}
					userId={userData.id}
				/>
			</div>
			<div className=' text-sm w-full flex flex-col gap-2 mt-2'>
				<h2 className='text-xl font-medium '>{userData.name}</h2>
				<p>{userData.profileDescription}</p>
				<div className='flex items-center gap-2 text-xs text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 '>
					<Calendar size={20} />
					<p>
						Joined <span>{monthAndYear}</span>
					</p>
				</div>
			</div>

			<FollowsInfo
				postsNumber={userData.posts.length}
				followersNumber={userData.followers.length}
				followingNumber={userData.following.length}
			/>
			<div className='w-full mt-8 flex  items-center justify-evenly sm:justify-start sm:gap-6 text-lg lg:text-xl overflow-x-auto mb-2'>
				<Link
					href={{
						pathname: `/profile/${userData.name}`,
						query: { info: 'posts' },
					}}
					className='flex gap-1 lg:gap-2 cursor-pointer hover:text-muted-foreground  transiti duration-200'>
					<LayoutGrid />
					<span className='hidden sm:inline'>Posts</span>
				</Link>

				<Link
					href={{
						pathname: `/profile/${userData.name}`,
						query: { info: 'likes' },
					}}
					className='flex gap-1 lg:gap-2 cursor-pointer hover:text-muted-foreground  transiti duration-200'>
					<Heart />
					<span className='hidden sm:inline'>Likes</span>
				</Link>

				<Link
					href={{
						pathname: `/profile/${userData.name}`,
						query: { info: 'games' },
					}}
					className='flex gap-1 lg:gap-2 cursor-pointer hover:text-muted-foreground  transiti duration-200'>
					<Gamepad />
					<span className='hidden sm:inline'>Games</span>
				</Link>

				<Link
					href={{
						pathname: `/profile/${userData.name}`,
						query: { info: 'communities' },
					}}
					className='flex gap-1 lg:gap-2 cursor-pointer hover:text-muted-foreground  transiti duration-200'>
					<Users2 />
					<span className='hidden sm:inline'>Communities</span>
				</Link>
			</div>
		</header>
	);
};
