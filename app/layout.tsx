import React from 'react';
import type { Metadata } from 'next';
import './globals.css';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

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
      <body>
        <Navbar />
        <div style={{ paddingTop: '64px' }}>
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
} 