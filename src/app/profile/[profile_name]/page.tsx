import { ProfileBanner } from '@/components/profile/banner/ProfileBanner';
import { ProfileContentBox } from '@/components/profile/ProfileContentBox';
import { ProfileInfo } from '@/components/profile/ProfileInfo';
import { Separator } from '@/components/ui/separator';
import { getAuthSession } from '@/lib/auth';
import { getProfileInfo } from '@/lib/getProfileInfo';
import { User } from '@/types/user';
import Image from 'next/image';
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
		<div className='md:px-4 lg:px-8'>
			<ProfileBanner sessionUserPage={userData.sessionUserPage} userId={userData.id} />
			<ProfileInfo userData={userData} session={session} />
			<Separator />
			<ProfileContentBox />
		</div>
	);
};
export default Profile;
