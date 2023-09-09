import { NewMessage } from '@/components/forms/messages/NewMessage';
import React from 'react';

interface Props {
	conversationId: string;
}

export const Footer = ({ conversationId }: Props) => {
	return <NewMessage conversationId={conversationId} />;
};
