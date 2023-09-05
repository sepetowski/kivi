import { MessagesSidebar } from '@/components/sidebar/messages/MessagesSidebar';

export const metadata = {
	title: 'Your messages',
	description: 'Your messages in Kivi app - Social for gamers',
};

const MessagesLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<main className='flex items-center h-screen w-full'>
			<MessagesSidebar />
			{children}
		</main>
	);
};
export default MessagesLayout;
