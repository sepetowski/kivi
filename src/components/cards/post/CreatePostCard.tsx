import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { NewPostForm } from '@/components/forms/post/NewPostForm';

export const CreatePostCard = () => {
	return (
		<Card className='w-full'>
			<CardHeader>
				<CardTitle>Create a new post!</CardTitle>
			</CardHeader>
			<CardContent>
				<NewPostForm />
			</CardContent>
		</Card>
	);
};
