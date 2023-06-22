import React from 'react';

interface Props {
	error: string | undefined;
	isInputTouched: boolean | undefined;
}

export const InputError = ({ error, isInputTouched }: Props) => {
	return (
		<>
			{isInputTouched && error && (
				<p className='text-xs text-destructive font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
					{error}
				</p>
			)}
		</>
	);
};
