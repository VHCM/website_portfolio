// src/components/Header.tsx
'use client';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import { nav } from '@/data/nav';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export default function Header() {
    const [active, setActive] = useState<string>('home');

    useEffect(() => {
        const handler = (e: CustomEvent) => setActive(e.detail);
        window.addEventListener('sectionchange' as any, handler as any);
        return () => window.removeEventListener('sectionchange' as any, handler as any);
    }, []);

    return (
        <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-neutral-900/70 shadow-md">
            <nav aria-label="Principal" className="mx-auto max-w-6xl px-4 sm:px-6 h-14 flex items-center justify-between">
                <Link href="/" className="font-semibold tracking-tight text-primary-700 dark:text-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-md">
                    &lt;VictorDev /&gt;
                </Link>
                <ul className="hidden md:flex items-center gap-6">
                    {nav.map(item => (
                        <li key={item.href}>
                            <a
                                href={item.href}
                                className={cn(
                                    'px-2 py-1 rounded-md transition-colors hover:bg-primary-50 dark:hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-primary-500',
                                    active === item.href.replace('#', '') && 'bg-primary-100 dark:bg-neutral-800'
                                )}
                            >
                                {item.label}
                            </a>
                        </li>
                    ))}
                    <li><ThemeToggle /></li>
                </ul>
                <div className="md:hidden"><ThemeToggle /></div>
            </nav>
        </header>
    );
}
