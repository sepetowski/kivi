'use client';
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { InputError } from '@/components/forms/InputError';
import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from '@/components/ui/toast';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Loader2Icon } from 'lucide-react';
import { GithubBtn } from '../btns/GithubBtn';
import { GoogleBtn } from '../btns/GoogleBtn';
import Link from 'next/link';
import { useLoginByProviderError } from '@/hooks/useLoginByProviderError';
import { SigninSchema } from '@/validations/SinginSchema';
import { LogWithTestAccount } from '../btns/LogWithTestAccount';

export const SingInForm = () => {
	const { toast } = useToast();
	const { status } = useSession();
	useLoginByProviderError();
	const [isSending, setIsSending] = useState(false);
	const router = useRouter();

	useEffect(() => {
		if (status === 'authenticated') router.push('/');
	}, [status, router]);
	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		validationSchema: SigninSchema,

		onSubmit: async (values, { resetForm }) => {
			setIsSending(true);
			try {
				const account = await signIn('credentials', {
					email: values.email,
					password: values.password,
					redirect: false,
				});

				if (account?.error && account.error) {
					toast({
						variant: 'destructive',
						title: account.error,
					});
				} else if (account && account.ok && !account?.error) {
					resetForm();

					router.refresh();
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
			} catch (err) {
				let errMsg = 'unkown error';
				if (typeof err === 'string') {
					errMsg = err;
				} else if (err instanceof Error) {
					errMsg = err.message;
				}
				toast({
					variant: 'destructive',
					title: 'Oh no! An error has occured.',
					description: errMsg,
				});
			}

			setIsSending(false);
		},
	});
	return (
		<div className='w-full md:w-1/2 h-full   '>
			<div className='h-full w-full xl:w-2/3 mx-auto flex flex-col items-center justify-center p-4 md:p-6  '>
				<h2 className='font-bold text-2xl md:text-3xl my-4 md:mt-20 '>Login to your account</h2>
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

					<Button
						disabled={isSending || !(formik.dirty && formik.isValid)}
						type='submit'
						className='flex gap-2 text-lg w-full'>
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
				<div className='w-full flex flex-wrap justify-center  gap-4 my-4'>
					<GoogleBtn isSending={isSending} />
					<GithubBtn isSending={isSending} />
					<LogWithTestAccount isSending={isSending} onSending={setIsSending} />
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
