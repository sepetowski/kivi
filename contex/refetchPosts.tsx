'use client';
import { RefreshPostsContextType } from '@/types/context';
import React, { ReactNode, createContext, useState } from 'react';

export const RefreshPostsContext = createContext<RefreshPostsContextType | undefined>(undefined);

export const RefreshPostsProvider = ({ children }: { children: ReactNode }) => {
	const [deletedPostId, setDeletedPostId] = useState<null | string>(null);

	const saveDeletedPostId = (id: string) => {
		setDeletedPostId(id);
	};

	const contextValue: RefreshPostsContextType = {
		deletedPostId,
		saveDeletedPostId,
	};

	return (
		<RefreshPostsContext.Provider value={contextValue}>{children}</RefreshPostsContext.Provider>
	);
};
