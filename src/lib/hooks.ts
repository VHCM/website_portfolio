// src/lib/hooks.ts
'use client';
import { useEffect } from 'react';

export function useActiveSection(ids: string[]) {
    useEffect(() => {
        const observers: IntersectionObserver[] = [];
        ids.forEach((id) => {
            const el = document.getElementById(id);
            if (!el) return;
            const io = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            const ev = new CustomEvent('sectionchange', { detail: id });
                            window.dispatchEvent(ev);
                        }
                    });
                },
                { rootMargin: '-30% 0px -60% 0px', threshold: 0.1 }
            );
            io.observe(el);
            observers.push(io);
        });
        return () => observers.forEach((o) => o.disconnect());
    }, [ids]);
}
