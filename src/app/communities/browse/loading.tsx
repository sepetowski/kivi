import { BrowseCommunityCradSkieleton } from '@/components/skieletons/BrowseCommunityCradSkieleton';

const BrowseLoading = () => {
	return (
		<main className='px-4 lg:px-8 mt-36 md:mt-28 flex flex-col'>
			<div className='flex justify-center flex-wrap mt-8 md:mt-12 gap-4 w-full items-center'>
				<BrowseCommunityCradSkieleton />
				<BrowseCommunityCradSkieleton />
				<BrowseCommunityCradSkieleton />
				<BrowseCommunityCradSkieleton />
				<BrowseCommunityCradSkieleton />
				<BrowseCommunityCradSkieleton />
			</div>
		</main>
	);
};
export default BrowseLoading;
