import { getAuthSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

const MessagesPage = async () => {
	const session = await getAuthSession();
	if (!session) redirect('/sign-in');

	return (
		<div className='hidden md:flex w-full h-full justify-center items-center  p-4 lg:p-6'>
			<p className='font-medium text-center  text-xl lg:text-2xl 2xl:text-3xl'>
				Select chat or start a new conversation
			</p>
		</div>
	);
};
export default MessagesPage;
