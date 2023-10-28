import React from 'react';
import { SingUpForm } from '@/components/forms/auth/SignUpForm';
import { FormImage } from '@/components/forms/auth/FormImage';
import { getAuthSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

const SingUp = async () => {
	const session = await getAuthSession();
	if (session) redirect('/');

	return (
		<main className=' md:h-1 min-h-screen w-full  mx-auto  flex  xl:justify-center xl:items-center flex-col md:flex-row overflow-hidden '>
			<FormImage title='Join the Ultimate Gaming Community!' />
			<SingUpForm />
		</main>
	);
};
export default SingUp;
