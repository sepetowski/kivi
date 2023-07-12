import { AuthProvider } from '@/components/providers/AuthProvider';
import './global.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { Nav } from '@/components/nav/rootNav/Nav';
import { Toaster } from '@/components/ui/toaster';
import { LeftSidebar } from '@/components/sidebar/leftSidebar/LeftSidebar';
import { RightSidebar } from '@/components/sidebar/rightSidebar/RightSideBar';
import { getUserImage } from '@/lib/getUserImage';


const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'Kivi',
	description: 'Social app for gamers',
};

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
	const { image }: { image: string | null } = await getUserImage();

	return (
		<html lang='en' suppressHydrationWarning>
			<head>
				<link rel='icon' href='/kiviLogo.svg' sizes='any' />
			</head>
			<body className={inter.className}>
				<AuthProvider>
					<ThemeProvider attribute='class' defaultTheme='system' enableSystem>
						<Nav image={image} />
						<div className='flex justify-between w-full max-w-[2000px] mx-auto relative'>
							<LeftSidebar />
							<div className='w-full'>{children}</div>
							<RightSidebar />
						</div>
						<Toaster />
					</ThemeProvider>
				</AuthProvider>
			</body>
		</html>
	);
};
export default RootLayout;
