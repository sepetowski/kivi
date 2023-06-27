import { Games } from '@/components/profile/games/Games';
import { ProfileBanner } from '@/components/profile/ProfileBanner';
import { getAuthSession } from '@/lib/auth';
import { getProfileInfo } from '@/lib/getProfileInfo';
import { User } from '@/types/user';
import { redirect } from 'next/navigation';

interface Params {
	params: {
		profile_name: string;
	};
}

const Profile = async ({ params: { profile_name } }: Params) => {
	const session = await getAuthSession();
	if (!session) redirect('/sign-in');

	const userData: User = await getProfileInfo(profile_name);

	return (
		<>
			<div className='w-full mx-auto max-w-[1400px] pl-4 pr-4'>
				<ProfileBanner userData={userData} session={session} />
				<Games userData={userData} />
			</div>
		</>
	);
};
export default Profile;
