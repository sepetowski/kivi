import { MessagesSidebar } from '@/components/sidebar/messages/MessagesSidebar';
import { ThemeConversationProvider } from '@/contex/ChnageConversationTheme';
import { getAuthSession } from '@/lib/auth';
import { getInitialConversations } from '@/lib/getInitialConversations';
import { ExtendenConfersation } from '@/types/conversations';
import { redirect } from 'next/navigation';

export const metadata = {
	title: 'Your messages',
	description: 'Your messages in Kivi app - Social for gamers',
};

const MessagesLayout = async ({ children }: { children: React.ReactNode }) => {
	const session = await getAuthSession();
	if (!session) redirect('/sign-in');

	const initialConversations: ExtendenConfersation[] = await getInitialConversations(
		session.user.id
	);

	return (
		<ThemeConversationProvider>
			<main className='flex items-center h-screen w-full'>
				<MessagesSidebar
					userId={session.user.id}
					initialConversations={initialConversations}
					userEmial={session.user.email!}
				/>
				{children}
			</main>
		</ThemeConversationProvider>
	);
};
export default MessagesLayout;
