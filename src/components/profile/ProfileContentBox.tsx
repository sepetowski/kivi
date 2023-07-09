'use client';
import { useSearchParams } from 'next/navigation';
import React from 'react';

export const ProfileContentBox = () => {
	const params = useSearchParams();
	let info = params.get('info');
	if (!info) info = 'posts';

	return <div className='px-4 lg:px-8'>{info}</div>;
};
