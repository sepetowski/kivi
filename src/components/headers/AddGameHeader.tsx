'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/Input';
import { Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useFormik } from 'formik';

export const AddGameHeader = () => {
	const params = useSearchParams();
	const router = useRouter();
	const page = params.get('page');
	const search = params.get('search');

	const formik = useFormik({
		initialValues: {
			search: search ? search : '',
		},
		onSubmit: (values) => {
			const query = values.search.split(' ').join('-').toLocaleLowerCase();
			router.push(`/add/games?search=${query}`);
		},
	});

	return (
		<header>
			<form onSubmit={formik.handleSubmit} className='flex  gap-2  items-center'>
				<Input
					id='search'
					value={formik.values.search}
					onBlur={formik.handleBlur}
					onChange={formik.handleChange}
					className='w-full sm:w-72 2xl:w-96'
				/>
				<Button size={'xs'} type='submit'>
					<Search />
				</Button>
			</form>
		</header>
	);
};
