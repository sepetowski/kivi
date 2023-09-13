'use client';

import { AvaibleThemes } from '@prisma/client';
import React, { useContext, useState } from 'react';
import { createContext } from 'react';

interface ThemeConversationContext {
	activeTheme: AvaibleThemes;
	setActiveTheme: React.Dispatch<React.SetStateAction<AvaibleThemes>>;
}

export const ThemeConversationContext = createContext<ThemeConversationContext | null>(null);

export const ThemeConversationProvider = ({ children }: { children: React.ReactNode }) => {
	const [activeTheme, setActiveTheme] = useState<AvaibleThemes>(AvaibleThemes.PURPLE);

	return (
		<ThemeConversationContext.Provider value={{ activeTheme, setActiveTheme }}>
			{children}
		</ThemeConversationContext.Provider>
	);
};

export const useThemeConversation = () => {
	const ctx = useContext(ThemeConversationContext);
	if (!ctx) throw new Error('invalid use');

	return ctx;
};
