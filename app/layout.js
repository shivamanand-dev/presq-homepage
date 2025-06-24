import './globals.css';
import { Inter } from 'next/font/google';
import Header from '@/components/layout/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'IT Infinite - IT Solutions & Services',
  description: 'Professional IT solutions and services company providing web development, mobile apps, cloud solutions, and IT consulting.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}