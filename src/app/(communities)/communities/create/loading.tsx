import { CreateCommunityCardSkieleton } from '@/components/skieletons/CreateCommunityCardSkieleton';

const CreateLoading = () => {
	return (
		<main className=' w-full  max-w-[1000px] mx-auto px-4 lg:px-8  mt-36'>
			<CreateCommunityCardSkieleton />
		</main>
	);
};
export default CreateLoading;
