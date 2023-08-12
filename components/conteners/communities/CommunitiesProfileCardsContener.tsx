import { ProfileCommunityCard } from '@/components/cards/community/ProfileCommunityCard';
import { Communities } from '@/types/communities';
import Link from 'next/link';

interface Props {
	promise: Promise<Communities[]>;
	sessionUserPage: boolean;
}

export const CommunitiesProfileCardsContener = async ({ promise, sessionUserPage }: Props) => {
	const communities = await promise;
	return (
		<div className='flex gap-6 items-center flex-wrap w-full my-8 '>
			{communities.length !== 0 &&
				communities.map((community) => (
					<ProfileCommunityCard
						key={community.communityId}
						name={community.community.name}
						image={community.community.image}
					/>
				))}
			{communities.length === 0 && sessionUserPage && (
				<p className=' text-base md:text-lg lg:text-xl'>
					You have not join to any community yet.{' '}
					<Link className='font-bold cursor-pointer' href='/communities/browse'>
						Join now
					</Link>
				</p>
			)}
			{communities.length === 0 && !sessionUserPage && (
				<p className=' text-base md:text-lg lg:text-xl'>
					This user have not join to any community yet.
				</p>
			)}
		</div>
	);
};
