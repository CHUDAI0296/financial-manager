import React from 'react';
import type { Metadata } from 'next';
import './globals.css';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'Financial Manager - Career Resources and Tools',
  description: 'Helping financial managers advance their careers with expert resources and tools.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-white">
        <Providers>
          <Navbar />
          <div className="flex-grow pt-16">
            {children}
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
} 