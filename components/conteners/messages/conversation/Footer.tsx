'use client';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/textarea';
import React from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Footer = () => {
	return (
		<div className='bg-background shadow-sm border-t p-4 lg:px-6 flex gap-4 items-center relative z-50'>
			<Textarea placeholder='Aa' className='h-10 min-h-[2.5rem] max-h-10 scrollbar-none' />
			<Button variant={'ghost'} size={'xs'}>
				<Send />
			</Button>
		</div>
	);
};
