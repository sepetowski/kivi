import { Contener } from '@/components/conteners/messages/conversation/Contener';
import { Footer } from '@/components/conteners/messages/conversation/Footer';
import { Header } from '@/components/conteners/messages/conversation/Header';
import { getAuthSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

interface Params {
	params: {
		conversation_id: string;
	};
}

const ConversationPage = async ({ params: { conversation_id } }: Params) => {
	const session = await getAuthSession();
	if (!session) redirect('/sign-in');

	console.log(conversation_id);

	return (
		<div className='w-full h-full flex flex-col'>
			<Header />
			<Contener />
			<Footer />
		</div>
	);
};
export default ConversationPage;
