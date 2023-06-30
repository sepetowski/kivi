'use client';
import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun, Laptop } from 'lucide-react';
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
} from '@radix-ui/react-dropdown-menu';
import { Button } from '../ui/button';

export const ThemeSwitcher = () => {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	const changeThemeHandler = (theme: string) => {
		setTheme(theme);
	};

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button size='xs' variant={'ghost'}>
					{theme === 'light' ? <Sun size={25} /> : <Moon size={25} />}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className='w-auto p-2 bg-muted rounded-md '
				align='end'
				sideOffset={10}>
				<DropdownMenuRadioGroup value={theme} onValueChange={changeThemeHandler}>
					<DropdownMenuRadioItem
						value='light'
						className='flex w-full items-center gap-2 p-2 cursor-pointer'>
						<Sun size={20} /> <p>Light</p>
					</DropdownMenuRadioItem>
					<DropdownMenuRadioItem
						value='dark'
						className='flex w-full items-center gap-2 p-2 cursor-pointer   '>
						<Moon size={20} /> <p>Dark</p>
					</DropdownMenuRadioItem>

					<DropdownMenuRadioItem
						value='system'
						className='flex w-full items-center gap-2 p-2 cursor-pointer  '>
						<Laptop size={20} /> <p>System</p>
					</DropdownMenuRadioItem>
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
