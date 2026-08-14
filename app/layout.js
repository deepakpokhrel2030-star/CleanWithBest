import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import SiteChrome from '@/frontend/components/SiteChrome';
import Chatbot from '@/frontend/components/Chatbot';
import InstallApp from '@/frontend/components/InstallApp';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-poppins',
});

export const metadata = {
  title: { default: 'CleanWithBest – Professional Cleaning Services', template: '%s | CleanWithBest' },
  description: 'CleanWithBest offers continuous cleaning for hotels, Airbnb, serviced apartments and businesses, from £20/hour. Fully insured, background-checked cleaners, 100% satisfaction guarantee.',
  keywords: ['hotel cleaning', 'Airbnb cleaning', 'serviced apartment cleaning', 'commercial cleaning', 'recurring contract cleaning', 'office cleaning'],
  manifest: '/manifest.webmanifest',
  applicationName: 'CleanWithBest',
  appleWebApp: {
    capable: true,
    title: 'CleanWithBest',
    statusBarStyle: 'default',
  },
  icons: {
    icon: [
      { url: '/icons/favicon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/favicon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/icons/favicon-192.png', sizes: '192x192', type: 'image/png' },
    ],
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#0f766e',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="font-sans">
        <SiteChrome>{children}</SiteChrome>
        <InstallApp />
        <Chatbot />
      </body>
    </html>
  );
}
