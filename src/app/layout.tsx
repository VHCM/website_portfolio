// src/app/layout.tsx
import '../styles/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { site } from '@/data/site';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  metadataBase: new URL('https://example.com'),
  title: site.title,
  description: site.description,
  openGraph: {
    title: site.title,
    description: site.description,
    url: 'https://example.com',
    siteName: site.title,
    images: [{ url: '/icon-512.png', width: 512, height: 512, alt: 'Logo' }],
    locale: 'pt_BR',
    type: 'website'
  },
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
  manifest: '/manifest.json'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (theme === 'dark' || (!theme && prefersDark)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (_) {}
              })();
            `
          }}
        />
      </head>
      <body suppressHydrationWarning className={`${inter.variable} font-sans bg-surface dark:bg-surface-dark text-neutral-900 dark:text-neutral-100 antialiased`}>
        <Header />
        <main id="content" className="mx-auto max-w-6xl px-4 sm:px-6">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
