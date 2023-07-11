import { ChnageBackgroundImage } from '@/components/profile/banner/ChnageBackgroundImage';

interface Props {
	sessionUserPage: boolean;
	userId:string
}

export const ProfileBanner = ({ sessionUserPage,userId }: Props) => {
	return (
		<div className='w-full  h-44 md:h-72 xl:h-80  2xl:h-80  shadow-sm bg-muted-foreground border-b mx-auto  mt-24 md:mt-16 md:rounded-lg lg:rounded-xl relative '>
			{sessionUserPage && <ChnageBackgroundImage />}
		</div>
	);
};
