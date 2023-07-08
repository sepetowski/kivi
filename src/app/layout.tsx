import { AuthProvider } from '@/components/providers/AuthProvider';
import './globals.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { Nav } from '@/components/nav/Nav';
import { Toaster } from '@/components/ui/toaster';
import { LeftSidebar } from '@/components/sidebar/leftSidebar/LeftSidebar';
import { RightSidebar } from '@/components/sidebar/rightSidebar/RightSideBar';


const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'Kivi',
	description: 'Social app for gamers',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<html lang='en' suppressHydrationWarning>
			<body className={inter.className}>
				<AuthProvider>
					
						<ThemeProvider attribute='class' defaultTheme='system' enableSystem>
							<Nav />
							<div className='flex justify-between w-full max-w-[2000px] mx-auto'>
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
