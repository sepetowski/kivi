import { Games } from '@/components/profile/games/Games';
import { ProfileBanner } from '@/components/profile/ProfileBanner';
import { ProfileContentBox } from '@/components/profile/ProfileContentBox';
import { ProfileInfo } from '@/components/profile/ProfileInfo';
import { Separator } from '@/components/ui/separator';
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
		<div className='md:pl-4 md:pr-4 lg:pl-8 lg:pr-8'>
			<ProfileBanner />
			<ProfileInfo userData={userData} session={session} />
			<Separator />
			<ProfileContentBox />
			{/* <Games userData={userData} /> */}
		</div>
	);
};
export default Profile;
