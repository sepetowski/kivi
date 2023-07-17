import { CreatedCommunityCardSkieleton } from '@/components/skieletons/cards/CreatedCommunityCardSkieleton';

const CreatedLoading = () => {
	return (
		<div className='w-full flex flex-col gap-4 mx-auto max-w-5xl mt-8 sm:mt-14'>
			<CreatedCommunityCardSkieleton />
			<CreatedCommunityCardSkieleton />
		</div>
	);
};
export default CreatedLoading;
