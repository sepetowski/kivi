'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Separator } from '@/components/ui/separator';
import { ActiveLink } from '@/components/ui/ActiveLink';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, RotateCcw } from 'lucide-react';
import { useFormik } from 'formik';
import { SearchSchema } from '@/validations/SearchSchema';

export const CommunityNav = () => {
	const currentRoute = usePathname();
	const router = useRouter();
	const params = useSearchParams();
	const search = params.get('search');

	const formik = useFormik({
		initialValues: {
			search: search ? search : '',
		},
		validationSchema: SearchSchema,
		onSubmit: (values) => {
			router.push(`/communities/browse?search=${values.search}`);
		},
	});
	return (
		<nav
			className={`flex flex-col-reverse  gap-3  items-center ${
				currentRoute === '/communities/browse'
					? 'xl:flex-row xl:justify-between'
					: 'md:flex-row md:justify-end'
			}`}>
			{currentRoute === '/communities/browse' && (
				<form
					onSubmit={formik.handleSubmit}
					className='w-full sm:w-[75%]  xl:w-72 2xl:w-96 flex items-center gap-2'
					action=''>
					<Input
						id='search'
						value={formik.values.search}
						onBlur={formik.handleBlur}
						onChange={formik.handleChange}
						type='text'
						className=''
						placeholder='Serach for community...'
					/>
					<Button disabled={!formik.isValid} size={'xs'} type='submit'>
						<Search />
					</Button>

					<Button
						onClick={() => {
							router.push(`/communities/browse`);
							formik.setFieldValue('search', '');
						}}
						variant={'secondary'}
						size={'xs'}
						type='button'>
						<RotateCcw />
					</Button>
				</form>
			)}
			<div
				className={`w-full   flex flex-col gap-3 rounded-md items-center sm:justify-center border p-2  ${
					currentRoute === '/communities/browse'
						? ' md:flex-row sm:w-[75%]  xl:w-auto '
						: 'md:w-auto md:flex-row'
				}`}>
				<ActiveLink href='/communities/browse'>Browse Communities</ActiveLink>
				<Separator
					className={` ${currentRoute === '/communities/browse' ? 'md:hidden' : 'md:hidden'}`}
				/>
				<Separator
					orientation='vertical'
					className={`hidden h-6 ${
						currentRoute === '/communities/browse' ? ' md:block' : ' md:block'
					}`}
				/>
				<ActiveLink href='/communities/browse/created'>Your Creadted Communities</ActiveLink>
			</div>
		</nav>
	);
};
