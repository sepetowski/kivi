import { AuthProvider } from '@/components/providers/AuthProvider';
import './global.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { Nav } from '@/components/nav/rootNav/Nav';
import { Toaster } from '@/components/ui/toaster';
import { LeftSidebar } from '@/components/sidebar/leftSidebar/LeftSidebar';
import { RightSidebar } from '@/components/sidebar/rightSidebar/RightSideBar';
import { QueryProvider } from '@/components/providers/QueryProvider';
import { NotifyToast } from '@/components/notify/NotifyToast';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'Kivi',
	description: 'Social app for gamers',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<html lang='en' suppressHydrationWarning>
			<head>
				<link rel='icon' href='/kiviLogo.svg' sizes='any' />
			</head>
			<body
				className={`scrollbar-thin scrollbar-thumb-primary scrollbar-track-secondary scrollbar-thumb-rounded-md ${inter.className}`}>
				<AuthProvider>
					<QueryProvider>
						<ThemeProvider attribute='class' defaultTheme='system' enableSystem>
							<Nav />
							<div className='flex justify-between w-full max-w-[2000px] mx-auto relative'>
								<LeftSidebar />
								<div className='w-full '>{children}</div>
								<RightSidebar />
							</div>
							<NotifyToast />
							<Toaster />
						</ThemeProvider>
					</QueryProvider>
				</AuthProvider>
			</body>
		</html>
	);
};
export default RootLayout;
