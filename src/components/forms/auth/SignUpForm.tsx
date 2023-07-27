'use client';
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Separator } from '@/components/ui/separator';
import { InputError } from '@/components/forms/InputError';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Loader2Icon } from 'lucide-react';
import { GithubBtn } from '../btns/GithubBtn';
import { GoogleBtn } from '../btns/GoogleBtn';

import { useLoginByProviderError } from '@/hooks/useLoginByProviderError';
import { SignupSchema } from '@/validations/SingupSchema';

export const SingUpForm = () => {
	const { toast } = useToast();
	const [isSending, setIsSending] = useState(false);
	useLoginByProviderError();
	const router = useRouter();
	const { status } = useSession();

	useEffect(() => {
		if (status === 'authenticated') router.push('/');
	}, [status, router]);

	const formik = useFormik({
		initialValues: {
			username: '',
			email: '',
			password: '',
		},
		validationSchema: SignupSchema,

		onSubmit: async (values, { resetForm }) => {
			setIsSending(true);

			try {
				const res = await fetch('/api/auth/register', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						name: values.username,
						email: values.email,
						password: values.password,
					}),
				});

				switch (res.status) {
					case 200: {
						toast({
							title: 'Account was created!',
						});
						signIn('credentials', {
							email: values.email,
							password: values.password,
							redirect: false,
						});
						resetForm();

						break;
					}
					case 201: {
						toast({
							variant: 'destructive',
							title: 'Email is already in use.',
						});

						break;
					}
					case 202: {
						toast({
							variant: 'destructive',
							title: `Username ${values.username} is taken.`,
						});

						break;
					}
					case 400: {
						toast({
							variant: 'destructive',
							title: 'Missing Fields.',
							description: 'Please enter all fields',
						});
						break;
					}
					default:
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
			} catch (err) {}
			setIsSending(false);
		},
	});
	return (
		<div className='w-full md:w-1/2 h-full   '>
			<div className='h-full w-full xl:w-2/3 mx-auto flex flex-col items-center justify-center p-4 md:p-6  '>
				<h2 className='font-bold text-2xl md:text-3xl my-4 '>Create an account</h2>
				<form className='w-full flex flex-col gap-4 mt-4' onSubmit={formik.handleSubmit}>
					<div className='grid w-full  items-center gap-1.5'>
						<Label className='font-bold' htmlFor='username'>
							Username
						</Label>
						<Input
							autoComplete='username'
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.username}
							type='text'
							id='username'
							placeholder='Username'
						/>
						<p className='text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
							This is your public display name. It is unqie
						</p>
						<InputError error={formik.errors.username} isInputTouched={formik.touched.username} />
					</div>
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
						{!isSending && <>Sign Up</>}
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
					By continuing, you agree to our <span className='underline'>Terms of Service</span> and{' '}
					<span className='underline'>Privacy Policy.</span>
				</p>
			</div>
		</div>
	);
};
