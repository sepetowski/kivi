import { UserAvatarSkieleton } from '@/components/skieletons/avatars/UserAvatarSkieleton';
import { UserBannerskieleton } from '@/components/skieletons/banners/UserBannerskieleton';
import { Skeleton } from '@/components/ui/skeleton';

const ProfilePageLoading = () => {
	return (
		<div className='md:px-4 lg:px-8'>
			<UserBannerskieleton />
			<div className='px-4 lg:px-8'>
				<div className='w-full flex items-center justify-between'>
					<UserAvatarSkieleton />
					<Skeleton className='h-8 md:h-10 w-24 md:w-44 mt-2 md:mt-4 rounded-full' />
				</div>
				<div className='my-4 md:my-6 flex flex-col gap-3'>
					<Skeleton className='h-6 w-52' />
					<Skeleton className='h-6 w-32' />
					<Skeleton className='h-6 w-24' />
				</div>
				<div className='flex items-center  md:gap-4 my-4 md:my-6'>
					<Skeleton className='h-6 w-20' />
					<Skeleton className='h-6 w-20 ' />
					<Skeleton className='h-6 w-20 ' />
				</div>
				<div className='flex items-center justify-evenly md:justify-start md:gap-4 my-4 md:my-6'>
					<Skeleton className='h-8 w-8 md:w-24' />
					<Skeleton className='h-8 w-8 md:w-24' />
					<Skeleton className='h-8 w-8 md:w-24' />
					<Skeleton className='h-8 w-8 md:w-36' />
				</div>
			</div>
		</div>
	);
};

export default ProfilePageLoading;
