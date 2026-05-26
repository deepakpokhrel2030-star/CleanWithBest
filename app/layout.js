import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-poppins',
});

export const metadata = {
  title: { default: 'CleanWithBest – Professional Cleaning Services', template: '%s | CleanWithBest' },
  description: 'CleanWithBest offers top-rated domestic and commercial cleaning services. Fully insured, background-checked cleaners, 100% satisfaction guarantee.',
  keywords: ['cleaning services', 'domestic cleaning', 'commercial cleaning', 'deep cleaning', 'end of tenancy'],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="font-sans">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
