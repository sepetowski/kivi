import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { NewPostForm } from '@/components/forms/post/NewPostForm';

interface Props {
	communityName: string;
}

export const CreatePostCard = ({ communityName }: Props) => {
	return (
		<Card className='w-full '>
			<CardHeader>
				<CardTitle>Create post in &quot;{communityName.replaceAll('%20', ' ')}&quot;</CardTitle>
			</CardHeader>
			<CardContent>
				<NewPostForm communityName={communityName.replaceAll('%20', ' ')} />
			</CardContent>
		</Card>
	);
};
