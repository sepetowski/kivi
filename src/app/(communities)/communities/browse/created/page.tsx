import { getAuthSession } from '@/lib/auth';
import { getCreatedByUserCommunities } from '@/lib/getCreatedByUserCommunities';
import { Community } from '@prisma/client';
import { redirect } from 'next/navigation';
import { columns } from '@/components/table/columns';
import { CreatedCommunitiesTable } from '@/components/table/CreatedCommunitiesTable';

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
			<CreatedCommunitiesTable columns={columns} data={communities} />
		</div>
	);
};
export default Created;
