'use client';
import { useSearchParams } from 'next/navigation';
import React from 'react';

export const ProfileContentBox = () => {
	const params = useSearchParams();
	let info = params.get('info');
	if (!info) info = 'posts';

	return <div>{info}</div>;
};
