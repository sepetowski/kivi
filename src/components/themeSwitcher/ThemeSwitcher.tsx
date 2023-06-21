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
import { Button } from '../ui/Button';

export const ThemeSwitcher = () => {
	const [currentTheme, setCurrentTheme] = useState('');
	const { theme, setTheme, systemTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setTheme(currentTheme);
	}, [currentTheme, setTheme]);

	useEffect(() => {
		if (systemTheme) setTheme(systemTheme);
		setMounted(true);
	}, [systemTheme, setMounted, setTheme]);

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
			<DropdownMenuContent className='w-auto p-2 bg-muted rounded-md text-sm  absolute top-2  right-[-22px]  '>
				<DropdownMenuRadioGroup value={currentTheme} onValueChange={setCurrentTheme}>
					<DropdownMenuRadioItem
						value='light'
						className='flex w-full items-center gap-2 p-1 cursor-pointer  '>
						<Sun size={20} /> <p>Light</p>
					</DropdownMenuRadioItem>
					<DropdownMenuRadioItem
						value='dark'
						className='flex w-full items-center gap-2 p-1 cursor-pointer  '>
						<Moon size={20} /> <p>Dark</p>
					</DropdownMenuRadioItem>
					{systemTheme && (
						<DropdownMenuRadioItem
							value={systemTheme}
							className='flex w-full items-center gap-2 p-1 cursor-pointer  '>
							<Laptop size={20} /> <p>System</p>
						</DropdownMenuRadioItem>
					)}
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
