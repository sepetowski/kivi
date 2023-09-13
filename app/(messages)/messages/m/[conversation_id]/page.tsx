import { Contener } from '@/components/conteners/messages/conversation/Contener';
import { Footer } from '@/components/conteners/messages/conversation/Footer';
import { Header } from '@/components/conteners/messages/conversation/Header';
import { getAuthSession } from '@/lib/auth';
import { getConversation } from '@/lib/getConversation';
import { getMessages } from '@/lib/getMessages';
import { ConversationPageData, ExtenedMessage } from '@/types/conversations';

interface Params {
	params: {
		conversation_id: string;
	};
}

const ConversationPage = async ({ params: { conversation_id } }: Params) => {
	const session = await getAuthSession();

	const [conversationData, initialMessages]: [ConversationPageData, ExtenedMessage[]] =
		await Promise.all([
			getConversation(conversation_id, session?.user.id!),
			getMessages(conversation_id),
		]);
	const chatingWitUserData = () => {
		if (conversationData.users.length > 1)
			return conversationData.users.filter((user) => user.id !== session?.user.id!).at(0);
		else return conversationData.users[0];
	};

	return (
		<div className='w-full h-full flex flex-col'>
			<Header userInfo={chatingWitUserData()} conversationId={conversation_id} />
			<Contener
				initialMessages={initialMessages}
				activeUserId={session?.user.id!}
				conversationId={conversation_id}
				initialTheme={conversationData.currentTheme}
			/>
			<Footer conversationId={conversation_id} />
		</div>
	);
};
export default ConversationPage;
