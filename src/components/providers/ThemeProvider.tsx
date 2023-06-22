'use client';
import React, { useEffect, useState } from 'react';
import { ThemeProvider as Provider } from 'next-themes';
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
	const [mounted, setMounted] = useState(false);
	useEffect(() => {
		setMounted(true);
	}, []);


	if (!mounted) {
		return <>{children}</>;
	}
	return <Provider attribute='class'>{children}</Provider>;
};
