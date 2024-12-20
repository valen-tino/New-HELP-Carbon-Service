import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Navbar } from '@/app/components/layout/Navbar';
import { ProtectedRoute } from './components/layout/ProtectedRoute';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Carbon Footprint Tracker',
  description: 'Track and reduce your carbon footprint',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const ProtectedPaths = ["/dashboard", "/profile", "/recommendations"];
  const isPathProtected = typeof window !== "undefined" &&
                          ProtectedPaths.includes(window.location.pathname);

  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {isPathProtected ? (
          <ProtectedRoute>{children}</ProtectedRoute>
        ) : (
          children
        )}
      </body>
    </html>
  );
}