import { BrowseCommunityCradSkieleton } from '@/components/skieletons/cards/BrowseCommunityCradSkieleton';

const BrowseLoading = () => {
	return (
		<div className='flex justify-center flex-wrap mt-8 md:mt-12 gap-4 w-full items-center'>
			<BrowseCommunityCradSkieleton />
			<BrowseCommunityCradSkieleton />
			<BrowseCommunityCradSkieleton />
			<BrowseCommunityCradSkieleton />
			<BrowseCommunityCradSkieleton />
			<BrowseCommunityCradSkieleton />
		</div>
	);
};
export default BrowseLoading;
