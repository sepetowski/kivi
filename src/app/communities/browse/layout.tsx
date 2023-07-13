import { CommunityNav } from '@/components/nav/communityNav/CommunityNav';

const CommunityLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<main className='px-4 lg:px-8 mt-36 md:mt-28 flex flex-col'>
				<CommunityNav />
				{children}
			</main>
		</>
	);
};
export default CommunityLayout;
