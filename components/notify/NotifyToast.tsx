'use client';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { Notifications } from '@prisma/client';
import { useToast } from '@/components/ui/use-toast';
import { usePathname, useRouter } from 'next/navigation';
import { domain } from '@/lib/domain';

export const NotifyToast = () => {
	const { data, status } = useSession();
	const { toast } = useToast();
	const [hasSession, setHasSession] = useState(false);
	const router = useRouter();
	const pathname = usePathname();

	useEffect(() => {
		if (status === 'authenticated') setHasSession(true);
	}, [status, data]);

	const { mutate: mutateToasted } = useMutation({
		mutationFn: async (id: string) => {
			const res = await fetch(`${domain}/api/notifications/update-toasted`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					id,
				}),
			});

			if (!res.ok) return [];

			const data = await res.json();
			return data as Notification[];
		},
	});

	const { data: notifications } = useQuery({
		queryFn: async () => {
			if (!data?.user.id) return [];
			const res = await fetch(`${domain}/api/notifications/get-untoasted?userId=${data?.user.id}`);
			const notifications = await res.json();
			if (!res.ok) return [];
			return notifications as Notifications[];
		},
		queryKey: ['toast-notify'],
		refetchInterval: 6000,
		enabled: hasSession,
	});

	useEffect(() => {
		if (!notifications) return;
		notifications.forEach((notifay) => {
			mutateToasted(notifay.id);
		});
		if (pathname === '/notifications') return;
		if (notifications.length > 1)
			toast({
				title: `You have got ${notifications.length} new notifies!`,
			});
		if (notifications.length === 1)
			toast({
				title: 'You have got a new notify!',
			});
		router.refresh();
	}, [notifications, toast, mutateToasted, router, pathname]);

	return null;
};
