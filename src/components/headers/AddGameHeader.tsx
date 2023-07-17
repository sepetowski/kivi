import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export const AddGameHeader = () => {
	return (
		<header className='flex   gap-2  items-center '>
			<Input className='w-full sm:w-72 2xl:w-96' />
			<Button size={'xs'} type='submit'>
				<Search />
			</Button>
		</header>
	);
};
