'use client';

import { SyncClientPostsContextType } from '@/types/context';
import React, { ReactNode, createContext, useState } from 'react';

export const SyncClientPostsContext = createContext<SyncClientPostsContextType | undefined>(undefined);

export const SyncClientPostsProvider = ({ children }: { children: ReactNode }) => {
	const [deletedPostId, setDeletedPostId] = useState<null | string>(null);

	const saveDeletedPostId = (id: string) => {
		setDeletedPostId(id);
	};

	const contextValue: SyncClientPostsContextType = {
		deletedPostId,
		saveDeletedPostId,
	};

	return (
		<SyncClientPostsContext.Provider value={contextValue}>{children}</SyncClientPostsContext.Provider>
	);
};
