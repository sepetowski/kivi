import React from 'react';

import { SingInForm } from '@/components/forms/SignInForm';
import { getAuthSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { FormImage } from '@/components/forms/FormImage';

const SingIn = async () => {
	const session = await getAuthSession();
	if (session) redirect('/');

	return (
		<header className=' md:h-1 min-h-screen w-full max-w-[1400px] mx-auto  flex  xl:justify-center xl:items-center '>
			<main className='w-full h-full md:h-full xl:h-4/5 flex flex-col md:flex-row overflow-hidden shadow-sm rounded-md xl:border-2  border-muted'>
				<FormImage title='Welcome Back!' />
				<SingInForm />
			</main>
		</header>
	);
};
export default SingIn;
