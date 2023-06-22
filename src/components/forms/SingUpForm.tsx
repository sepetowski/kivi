'use client';
import React from 'react';
import Image from 'next/image';
import { useFormik } from 'formik';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Separator } from '@/components/ui/Separator';
import { InputError } from '@/components/forms/InputError';
import { useTheme } from 'next-themes';
import * as Yup from 'yup';

export const SingUpForm = () => {
	const { theme } = useTheme();
	const SignupSchema = Yup.object().shape({
		name: Yup.string()
			.required('Name is required')
			.min(3, 'Name must be at least 3 characters long')
			.trim(),
		email: Yup.string().required('Email is required').email('Email must be valid').trim(),
		password: Yup.string()
			.required('Password is required')
			.min(6, 'Password must be at least 6 characters long')
			.matches(/[A-Z]/, 'Password mast have at least one uppercase char')
			.matches(/[a-z]/, 'Password mast have at least one lowercase char')
			.matches(/[0-9]/, 'Password mast have at least one number')
			.trim(),
	});

	const formik = useFormik({
		initialValues: {
			name: '',
			email: '',
			password: '',
		},
		validationSchema: SignupSchema,

		onSubmit: (values) => {
			alert(JSON.stringify(values, null, 2));
		},
	});
	return (
		<div className='w-full md:w-1/2 h-full   '>
			<div className='h-full w-full xl:w-2/3 mx-auto flex flex-col items-center justify-center p-4 md:p-6  '>
				<h2 className='font-bold text-2xl md:text-3xl my-4 md:my-0'>Create an account</h2>
				<form className='w-full flex flex-col gap-4 mt-4' onSubmit={formik.handleSubmit}>
					<div className='grid w-full  items-center gap-1.5'>
						<Label htmlFor='name'>Name</Label>
						<Input
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.name}
							type='text'
							id='name'
							placeholder='Name'
						/>
						<InputError error={formik.errors.name} isInputTouched={formik.touched.name} />
					</div>
					<div className='grid w-full  items-center gap-1.5'>
						<Label htmlFor='email'>Email</Label>
						<Input
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.email}
							type='email'
							id='email'
							placeholder='Email'
						/>
						<InputError error={formik.errors.email} isInputTouched={formik.touched.email} />
					</div>
					<div className='grid w-full  items-center gap-1.5'>
						<Label htmlFor='password'>Password</Label>
						<Input
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.password}
							type='password'
							id='password'
							placeholder='Password'
						/>
						<InputError error={formik.errors.password} isInputTouched={formik.touched.password} />
					</div>

					<Button type='submit' className='flex gap-2 text-lg w-full'>
						Sing Up
					</Button>
				</form>

				<Separator className='my-4' orientation='horizontal' />
				<p className='text-sm  font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 uppercase'>
					or continue with
				</p>
				<div className='w-full flex  gap-4 my-4'>
					<Button variant='outline' className='flex gap-2 text-lg w-full'>
						<Image src='/googleLogo.svg' width={25} height={25} alt='google logo' />
						Google
					</Button>
					<Button variant='outline' className='flex gap-2 text-lg w-full relative'>
						{theme === 'dark' && (
							<Image src='/githubLogoWhite.svg' width={30} height={30} alt='google logo' />
						)}
						{theme === 'light' && (
							<Image src='/githubLogoBlack.svg' width={30} height={30} alt='google logo' />
						)}
						Github
					</Button>
				</div>

				<p className='text-muted-foreground text-center '>
					By continuing, you agree to our <span className='underline'>Terms of Service</span> and{' '}
					<span className='underline'>Privacy Policy.</span>
				</p>
			</div>
		</div>
	);
};
