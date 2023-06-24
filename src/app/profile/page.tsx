import { Games } from '@/components/profile/Games/Games';
import { ProfileBanner } from '@/components/profile/ProfileBanner';
import { getAuthSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

const Profile = async () => {
	const session = await getAuthSession();
	if (!session) redirect('/sign-in');
	return (
		<>
			<div className='w-full mx-auto max-w-[1400px] pl-4 pr-4'>
				<ProfileBanner />
				<Games />
			</div>
		</>
	);
};
export default Profile;
