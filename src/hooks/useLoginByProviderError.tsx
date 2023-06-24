import { useRouter, useSearchParams } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';

export const useLoginByProviderError = () => {
	const params = useSearchParams();

	const router = useRouter();
	const session = useSession();
	const { toast } = useToast();

	useEffect(() => {
		const error = params.get('error');
		if (error) {
			if (error === 'OAuthAccountNotLinked' && session.status === 'unauthenticated')
				toast({
					variant: 'destructive',
					title: 'Failed to Sgin up',
					description: 'Email is already taken',
				});

			if (error === 'Callback' && session.status === 'unauthenticated')
				toast({
					variant: 'destructive',
					title: 'Failed to Sgin up',
					description: 'Login aborted',
				});
			const timer = setTimeout(() => {
				router.replace('/sign-in');
			}, 2000);
			return () => {
				clearTimeout(timer);
			};
		}
		if (session.status === 'authenticated') {
			toast({
				title: 'You have been logged in.',
			});
		}
	}, [params, toast, session, router]);
};
