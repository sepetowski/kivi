'use client';
import { Input } from '@/components/ui/Input';
import React from 'react';
import { Search, Loader2 } from 'lucide-react';


interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
	isFetching: boolean;
	onSetValue: (text: string) => void;
	request: () => void;
	onSetTyping: () => void;
}

export const SerachBar = ({ isFetching, onSetValue, request, onSetTyping, ...props }: Props) => {

	
	return (
		<div className='relative'>
			<Input
				value={props.value}
				
				
				onChange={(e) => {
					onSetValue(e.target.value);
					onSetTyping();
					request();
				}}
				placeholder='Search'
				className='pl-14'
			/>

			<Search className='absolute top-1/2 translate-y-[-50%] left-4 pointer-events-none' />

			{isFetching && (
				<div className='absolute top-1/2 translate-y-[-50%] right-0 px-4'>
					<Loader2 className='w-4/5 animate-spin' />
				</div>
			)}
		</div>
	);
};
