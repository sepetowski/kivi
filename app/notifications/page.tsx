import { getAuthSession } from '@/lib/auth';
import { getAllNotifications } from '@/lib/getAllNotifications';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { NotifyContener } from '@/components/conteners/notify/NotifyContener';
import { Notify } from '@/types/notify';

export const metadata = {
	title: 'Your notifications',
	description: 'Your notifications in Kivi app - Social for gamers',
};

const Notifications = async () => {
	const session = await getAuthSession();
	if (!session) redirect('/sign-in');

	const notifications: Notify[] = await getAllNotifications(session.user.id);

	return (
		<main className=' w-full   px-4 lg:px-8  mt-36 md:mt-32 pb-6  max-w-[800px] mx-auto flex flex-col gap-4'>
			<NotifyContener notifications={notifications} />
		</main>
	);
};
export default Notifications;
