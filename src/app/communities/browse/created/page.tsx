import { getAuthSession } from '@/lib/auth';
import { getCreatedByUserCommunities } from '@/lib/getCreatedByUserCommunities';
import { Community } from '@prisma/client';
import { redirect } from 'next/navigation';
import Link from 'next/link';


export const metadata = {
	title: 'Created Communities',
	description: 'Your created Communities in  Kivi app - Social for gamers',
};

const Created = async () => {
	const session = await getAuthSession();
	if (!session) redirect('/sign-in');

	const communities: Community[] = await getCreatedByUserCommunities();

	return (
		<div className='w-full mx-auto max-w-5xl mt-8 sm:mt-14'>
		
			{communities.length === 0 && (
				<p className='text-center mt-16 text-lg md:text-xl xl:text-2xl'>
					You have not created any community yet.{' '}
					<Link className='font-bold cursor-pointer' href='/communities/create'>
						Create Your first community!
					</Link>{' '}
				</p>
			)}
		
		</div>
	);
};
export default Created;
