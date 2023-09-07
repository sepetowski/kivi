import { MessagesSidebar } from '@/components/sidebar/messages/MessagesSidebar';
import { getAuthSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export const metadata = {
	title: 'Your messages',
	description: 'Your messages in Kivi app - Social for gamers',
};

const MessagesLayout = async ({ children }: { children: React.ReactNode }) => {
	const session = await getAuthSession();
	if (!session) redirect('/sign-in');



	return (
		<main className='flex items-center h-screen w-full'>
			<MessagesSidebar userId={session.user.id} />
			{children}
		</main>
	);
};
export default MessagesLayout;
