import React from 'react';

interface Props {
	mine?: boolean;
}

export const Message = ({ mine }: Props) => {
	return (
		<div
			className={`p-2 rounded-md w-2/3 max-w-lg shadow-sm  ${
				mine ? 'self-end bg-purple-600 text-white' : 'bg-muted '
			}`}>
			<p className='text-sm md:text-base'>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi laboriosam architecto,
				deserunt praesentium recusandae iure sequi omnis possimus necessitatibus nihil.
			</p>
		</div>
	);
};
