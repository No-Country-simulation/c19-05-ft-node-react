import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import CommonLayout from '@/components/CommonLayout';
import { Providers } from '@/context/providers';
import { lily, abel, ubuntu } from '@/utils/fonts';
import { Toaster } from 'sonner';

interface RootLayoutProps {
  children: React.ReactNode; // Define el tipo de children como React.ReactNode
}

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Talent Trade - Exchange and Expand Your Knowledge',
  description:
    'Talent Trade is an innovative platform for knowledge exchange. Connect with experts in various fields and expand your skills collaboratively.',
};

const RootLayout = ({ children }: RootLayoutProps) => {
  // Usa RootLayoutProps para definir las props
  return (
    <html
      lang="es"
      className={`${lily.variable} ${abel.variable} ${ubuntu.variable} h-screen w-full m-0 p-0`}
    >
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </head>
      <body className={`${inter.className} bg-gray-100`}>
        <Providers>
          <CommonLayout>{children}</CommonLayout>

          <Toaster position="top-right" richColors />
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
