'use client';
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { NewGameSchema } from '@/validations/GameSchema';
import { InputError } from '@/components/forms/InputError';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { useFormik } from 'formik';
import { Loader2Icon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

interface Props {
	game: string;
	account: string;
	rank: string | null;
	since: string | null;
	gameId: string;
}

export const EdditGameForm = ({ account, game, rank, since, gameId }: Props) => {
	const { toast } = useToast();
	const router = useRouter();
	const session = useSession();
	const [isSending, setIsSending] = useState(false);
	const formik = useFormik({
		initialValues: {
			game,
			nickName: account,
			rank: rank,
			playSince: since,
		},
		validationSchema: NewGameSchema,

		onSubmit: async (values, { resetForm }) => {
			setIsSending(true);
			try {
				const res = await fetch('/api/games/edit', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						game: values.game,
						nickName: values.nickName,
						rank: values.rank,
						playSince: values.playSince,
						gameId,
						userId: session.data?.user.id,
					}),
				});
				if (!res.ok)
					toast({
						variant: 'destructive',
						title: 'Oh no! Something went wrong.',
						description: res.statusText,
					});
				else {
					toast({
						title: res.statusText,
					});

					router.refresh();
				}
			} catch (err) {
				console.log(err);
			}

			setIsSending(false);
		},
	});

	return (
		<form onSubmit={formik.handleSubmit}>
			<div className='grid gap-4 py-4'>
				<div className='grid w-full  items-center gap-2'>
					<Label htmlFor='game'>Game</Label>
					<Input
						id='game'
						autoComplete='game'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.game}
						type='text'
						placeholder='Your game name e.g War Thunder'
						className='col-span-3'
					/>
					<InputError error={formik.errors.game} isInputTouched={formik.touched.game} />
				</div>
				<div className='grid w-full  items-center gap-2'>
					<Label htmlFor='nickName'>Nickname</Label>
					<Input
						id='nickName'
						autoComplete='nickname'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.nickName}
						type='text'
						placeholder='Your game nickname'
						className='col-span-3'
					/>
					<InputError error={formik.errors.nickName} isInputTouched={formik.touched.nickName} />
				</div>
				<div className='grid w-full  items-center gap-2'>
					<Label htmlFor='rank'>Rank</Label>
					<Input
						id='rank'
						autoComplete='rank'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.rank ? formik.values.rank : ''}
						type='text'
						placeholder='Your rank in game'
						className='col-span-3'
					/>
				</div>
				<div className='grid w-full  items-center gap-2'>
					<Label htmlFor='playSince'>Play since</Label>
					<Input
						id='playSince'
						autoComplete='since'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.playSince ? formik.values.playSince : ''}
						type='text'
						placeholder='Year since you play this game'
						className='col-span-3'
					/>
				</div>
			</div>
			<DialogFooter>
				<Button disabled={isSending} type='submit'>
					{!isSending && <>Edit game</>}
					{isSending && (
						<>
							Please wait
							<Loader2Icon className='animate-spin' />
						</>
					)}
				</Button>
			</DialogFooter>
		</form>
	);
};
