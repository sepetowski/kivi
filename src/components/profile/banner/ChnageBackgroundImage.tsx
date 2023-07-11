'use client';
import React from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ImagePlus } from 'lucide-react';

export const ChnageBackgroundImage = () => {
	return (
		<div className='absolute bottom-0 right-5'>
			<Label htmlFor='file' role='button'>
				<ImagePlus color='white' />
				<Input
					className='z-[-1] relative border-none h-[0.1px] w-[0.1px] overflow-hidden'
					accept='image/*'
					type='file'
					name='file'
					id='file'
				/>
			</Label>
		</div>
	);
};
