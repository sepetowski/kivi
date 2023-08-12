import { AddGameHeader } from '@/components/headers/AddGameHeader';

export const metadata = {
	title: 'Add games to profile',
	description: 'Social app for gamers',
};

const AddLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<main className='px-4 lg:px-8 mt-36 md:mt-28 flex flex-col'>
			<AddGameHeader />
			{children}
		</main>
	);
};
export default AddLayout;
