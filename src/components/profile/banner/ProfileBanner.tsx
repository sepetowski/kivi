import { ChnageBackgroundImage } from '@/components/profile/banner/ChnageBackgroundImage';
import Image from 'next/image';

interface Props {
	sessionUserPage: boolean;
	userId: string;
	backgroundImage: string | null;
}

export const ProfileBanner = ({ sessionUserPage, userId, backgroundImage }: Props) => {
	return (
		<div className='w-full  h-44 md:h-72 xl:h-80  2xl:h-80  shadow-sm bg-muted-foreground border-b mx-auto  mt-24 md:mt-16 md:rounded-lg lg:rounded-xl relative overflow-hidden '>
			{backgroundImage && <Image className='object-cover' src={backgroundImage} fill alt='' />}
			{sessionUserPage && (
				<ChnageBackgroundImage userId={userId} backgroundImage={backgroundImage} />
			)}
		</div>
	);
};
