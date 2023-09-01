'use client';

import * as React from 'react';
import { Sun, Moon, Laptop } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const ThemeSwitcher = () => {
	const { setTheme } = useTheme();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button  className='rounded-full hover:bg-background' variant='ghost' size={'icon'}>
					<Sun className=' w-8 h-8 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
					<Moon className='absolute w-8 h-8 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
					<span className='sr-only'>Toggle theme</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end' alignOffset={10} sideOffset={10}>
				<DropdownMenuItem className='flex gap-2 items-center cursor-pointer' onClick={() => setTheme('light')}>
					<Sun /> Light
				</DropdownMenuItem>
				<DropdownMenuItem className='flex gap-2 items-center cursor-pointer' onClick={() => setTheme('dark')}>
					<Moon /> Dark
				</DropdownMenuItem>
				<DropdownMenuItem className='flex gap-2 items-center cursor-pointer' onClick={() => setTheme('system')}>
					<Laptop /> System
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
