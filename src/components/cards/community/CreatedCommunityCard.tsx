'use client';
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Button, buttonVariants } from '@/components/ui/button';
import { DeleteCommunity } from './deleteCommunity/DeleteCommunity';
import { Edit, CheckSquare, XSquare, Loader2Icon } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/textarea';
import { CreatedCommunityCardAvatar } from './changePorfileAvatar/CreatedCommunityCardAvatar';
import { useFormik } from 'formik';
import { CommunityNameSchema } from '@/validations/CommunityNameSchema';
import { InputError } from '@/components/forms/InputError';
import { CommunityDescriptionSchema } from '@/validations/CommunityDescriptionSchema';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

interface Props {
	name: string;
	posts: number;
	members: number;
	description: string;
	id: string;
	image: string;
	creatorId: string | null;
}

export const CreatedCommunityCard = ({ name, description, id, members, posts, image }: Props) => {
	const [isNameEditting, setIsNameEditting] = useState(false);
	const [isSendingName, setIsSendingName] = useState(false);
	const [isSendingDescription, setIsSendingDescription] = useState(false);
	const [isDescriptionEditting, setIsDescriptionEditting] = useState(false);
	const router = useRouter();
	const { toast } = useToast();

	const changeName = useFormik({
		initialValues: {
			name,
		},
		validationSchema: CommunityNameSchema,
		onSubmit: async (values) => {
			setIsSendingName(true);
			try {
				const res = await fetch('/api/communities/change-name', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						name: values.name,
						communityId: id,
					}),
				});
				if (!res.ok) {
					toast({
						variant: 'destructive',
						title: 'Oh no! Something went wrong.',
						description: res.statusText,
					});
				} else {
					toast({
						title: res.statusText,
					});
					setIsNameEditting(false);
					router.refresh();
				}
			} catch (err) {
				toast({
					variant: 'destructive',
					title: 'Oh no! Something went wrong. Please try again',
				});
			}
			setIsSendingName(false);
		},
	});
	const changeDescription = useFormik({
		initialValues: {
			description,
		},
		validationSchema: CommunityDescriptionSchema,
		onSubmit: async (values) => {
			setIsSendingDescription(true);
			try {
				const res = await fetch('/api/communities/change-description', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						description: values.description,
						communityId: id,
					}),
				});
				if (!res.ok) {
					toast({
						variant: 'destructive',
						title: 'Oh no! Something went wrong.',
						description: res.statusText,
					});
				} else {
					toast({
						title: res.statusText,
					});
					setIsDescriptionEditting(false);
					router.refresh();
				}
			} catch (err) {
				toast({
					variant: 'destructive',
					title: 'Oh no! Something went wrong. Please try again',
				});
			}
			setIsSendingDescription(false);
		},
	});

	return (
		<Card className='w-full  '>
			<CardHeader>
				<div className='flex justify-between items-center'>
					{!isNameEditting && !isSendingName && (
						<div className='flex items-center gap-2'>
							<CardTitle>{name}</CardTitle>
							<Button
								onClick={() => {
									setIsNameEditting(true);
									setIsDescriptionEditting(false);
								}}
								variant={'ghost'}
								size={'xs'}>
								<Edit />
							</Button>
						</div>
					)}
					{isNameEditting && isSendingName && (
						<div className='flex items-center'>
							<p>Changing name. Please wait...</p>
							<Loader2Icon className='animate-spin' />
						</div>
					)}
					{isNameEditting && !isSendingName && (
						<form onSubmit={changeName.handleSubmit} className='flex flex-col gap-2 w-full'>
							<div className='flex  gap-4 w-full md:w-4/5 items-center'>
								<Input
									id='name'
									type='text'
									placeholder='Name of your Community'
									value={changeName.values.name}
									onChange={changeName.handleChange}
									onBlur={changeName.handleBlur}
								/>
								<div className='flex gap-2'>
									<Button disabled={!(changeName.isValid && changeName.dirty)} size={'xs'}>
										<CheckSquare />
									</Button>
									<Button
										onClick={() => {
											setIsNameEditting(false);
											changeName.setFieldValue('name', name);
										}}
										variant={'secondary'}
										size={'xs'}>
										<XSquare />
									</Button>
								</div>
							</div>
							<InputError error={changeName.errors.name} isInputTouched={changeName.touched.name} />
						</form>
					)}
					<CreatedCommunityCardAvatar
						communityId={id}
						image={image}
						name={name}
						isNameEditting={isNameEditting}
					/>
				</div>
				<div className='flex flex-col text-sm text-muted-foreground'>
					<p>
						Posts: <span className='font-medium text-primary'>{posts}</span>
					</p>

					<p>
						Members: <span className='font-medium text-primary'>{members}</span>
					</p>
				</div>
			</CardHeader>
			<CardContent>
				{!isDescriptionEditting && !isSendingDescription && (
					<div className='md:w-4/5 flex items-center gap-2'>
						<p>{description}</p>
						<Button
							onClick={() => {
								setIsDescriptionEditting(true);
								setIsNameEditting(false);
							}}
							variant={'ghost'}
							size={'xs'}>
							<Edit />
						</Button>
					</div>
				)}
				{isDescriptionEditting && isSendingDescription && (
					<div className='flex items-center'>
						<p>Changing Description. Please wait...</p>
						<Loader2Icon className='animate-spin' />
					</div>
				)}
				{isDescriptionEditting && !isSendingDescription && (
					<form onSubmit={changeDescription.handleSubmit} className='w-full flex flex-col gap-2'>
						<div className='md:w-4/5 flex items-start gap-4'>
							<Textarea
								id='description'
								placeholder='Description of your Community'
								value={changeDescription.values.description}
								onChange={changeDescription.handleChange}
								onBlur={changeDescription.handleBlur}
							/>
							<div className='flex flex-col gap-2'>
								<Button
									disabled={!(changeDescription.isValid && changeDescription.dirty)}
									size={'xs'}>
									<CheckSquare />
								</Button>
								<Button
									onClick={() => {
										setIsDescriptionEditting(false);
										changeDescription.setFieldValue('description', description);
									}}
									variant={'secondary'}
									size={'xs'}>
									<XSquare />
								</Button>
							</div>
						</div>
						<InputError
							error={changeDescription.errors.description}
							isInputTouched={changeDescription.touched.description}
						/>
					</form>
				)}
			</CardContent>
			<CardFooter className='flex items-center justify-end gap-2'>
				<DeleteCommunity id={id} isCreatorOfCommunity={true} userJoined={true} />
				<Link
					className={buttonVariants({ variant: 'outline', size: 'sm' })}
					href={`/communities/community/${name}`}>
					Check
				</Link>
			</CardFooter>
		</Card>
	);
};
