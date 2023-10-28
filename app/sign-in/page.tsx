import React from 'react';
import { SingInForm } from '@/components/forms/auth/SignInForm';
import { FormImage } from '@/components/forms/auth/FormImage';
import { getAuthSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

const SingIn = async () => {
	const session = await getAuthSession();
	if (session) redirect('/');

	return (
		<main className=' md:h-1 min-h-screen w-full  mx-auto  flex  xl:justify-center xl:items-center flex-col md:flex-row overflow-hidden '>
			<FormImage title='Welcome Back!' />
			<SingInForm />
		</main>
	);
};
export default SingIn;
