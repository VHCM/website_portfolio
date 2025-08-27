// src/components/ThemeToggle.tsx
'use client';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
    const [dark, setDark] = useState(false);

    useEffect(() => {
        setDark(document.documentElement.classList.contains('dark'));
    }, []);

    function toggle() {
        const next = !dark;
        setDark(next);
        if (next) document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
        try { localStorage.setItem('theme', next ? 'dark' : 'light'); } catch { }
    }

    return (
        <button
            aria-label="Alternar tema"
            onClick={toggle}
            className="rounded-full p-2 hover:bg-primary-50 dark:hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
            {dark ? '🌙' : '☀️'}
        </button>
    );
}
