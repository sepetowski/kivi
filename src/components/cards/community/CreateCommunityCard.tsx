import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CreateCommunityForm } from '../../forms/CreateCommunityForm';

export const CreateCommunityCard = () => {
	return (
		<Card className='w-full'>
			<CardHeader>
				<CardTitle>Create Community!</CardTitle>
				<CardDescription>
					Create a vibrant online community where individuals can share and contribute their
					thoughts, ideas, and experiences through the creation of new posts. As the creator and
					administrator of the community, you will have the opportunity to shape the overall vision
					and direction, and actively participate in the conversations.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<CreateCommunityForm />
			</CardContent>
		</Card>
	);
};
