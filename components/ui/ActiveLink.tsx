'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Props {
	href: string;
	children: React.ReactNode;
	className?: string;
	include?: string;
	onClickHandler?: () => void;
}

export const ActiveLink = ({ href, children, className, include, onClickHandler }: Props) => {
	const currentRoute = usePathname();
	const chngedRoute = currentRoute.replace('%20', ' ');
	return (
		<Link
			onClick={onClickHandler}
			className={`${className} duration-200 transition-colors ${
				chngedRoute === href || (include && chngedRoute.includes(include))
					? 'text-pink-600 dark:text-purple-600 hover:text-pink-500 dark:hover:text-purple-500 '
					: 'hover:text-muted-foreground'
			}`}
			href={href}>
			{children}
		</Link>
	);
};
