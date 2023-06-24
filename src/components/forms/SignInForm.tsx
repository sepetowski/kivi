'use client';
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Separator } from '@/components/ui/Separator';
import { InputError } from '@/components/forms/InputError';
import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from '@/components/ui/toast';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Loader2Icon } from 'lucide-react';
import { GithubBtn } from './GithubBtn';
import { GoogleBtn } from './GoogleBtn';
import Link from 'next/link';
import * as Yup from 'yup';
import { useLoginByProviderError } from '@/hooks/useLoginByProviderError';

export const SingInForm = () => {
	const { toast } = useToast();
	const { status } = useSession();
	useLoginByProviderError();
	const [isSending, setIsSending] = useState(false);
	const router = useRouter();
	const SigninSchema = Yup.object().shape({
		email: Yup.string().required('Email is required').email('Email must be valid').trim(),
		password: Yup.string()
			.required('Password is required')
			.min(6, 'Password must be at least 6 characters long')
			.matches(/[A-Z]/, 'Password mast have at least one uppercase char')
			.matches(/[a-z]/, 'Password mast have at least one lowercase char')
			.matches(/[0-9]/, 'Password mast have at least one number')
			.trim(),
	});

	useEffect(() => {
		if (status === 'authenticated') router.push('/');
	}, [status, router]);
	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		validationSchema: SigninSchema,

		onSubmit: (values, { resetForm }) => {
			setIsSending(true);
			signIn('credentials', {
				email: values.email,
				password: values.password,
				redirect: false,
			})
				.then((res) => {
					if (res?.error && res.error)
						toast({
							variant: 'destructive',
							title: res.error,
						});
					else if (res && res.ok && !res?.error) {
						resetForm();
					} else {
						toast({
							variant: 'destructive',
							title: 'Oh no! An error has occured.',
							description: 'Something went wrong, please try again',
							action: (
								<ToastAction onClick={() => formik.submitForm} altText='Try again'>
									Try again
								</ToastAction>
							),
						});
					}
				})
				.finally(() => {
					setIsSending(false);
				});
		},
	});
	return (
		<div className='w-full md:w-1/2 h-full   '>
			<div className='h-full w-full xl:w-2/3 mx-auto flex flex-col items-center justify-center p-4 md:p-6  '>
				<h2 className='font-bold text-2xl md:text-3xl my-4 '>Login to your account</h2>
				<form className='w-full flex flex-col gap-4 mt-4' onSubmit={formik.handleSubmit}>
					<div className='grid w-full  items-center gap-1.5'>
						<Label className='font-bold' htmlFor='email'>
							Email
						</Label>
						<Input
							autoComplete='email'
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
						<Label className='font-bold' htmlFor='password'>
							Password
						</Label>
						<Input
							autoComplete='password'
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.password}
							type='password'
							id='password'
							placeholder='Password'
						/>
						<InputError error={formik.errors.password} isInputTouched={formik.touched.password} />
					</div>

					<Button disabled={isSending} type='submit' className='flex gap-2 text-lg w-full'>
						{!isSending && <>Sign In</>}
						{isSending && (
							<>
								Please wait
								<Loader2Icon className='animate-spin' />
							</>
						)}
					</Button>
				</form>

				<Separator className='my-4' orientation='horizontal' />
				<p className='text-sm  font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 uppercase'>
					or continue with
				</p>
				<div className='w-full flex  gap-4 my-4'>
					<GoogleBtn isSending={isSending} />
					<GithubBtn isSending={isSending} />
				</div>

				<p className='text-muted-foreground text-center '>
					Dont have an account yet?
					<Link className='text-purple-500 font-bold ml-2' href='/sign-up'>
						Sing up
					</Link>
				</p>
			</div>
		</div>
	);
};
