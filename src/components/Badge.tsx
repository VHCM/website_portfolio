// src/components/Badge.tsx
import { ReactNode } from 'react';

export default function Badge({ children }: { children: ReactNode }) {
    return (
        <span className="inline-flex items-center gap-1 rounded-full border border-neutral-200 dark:border-neutral-700 px-3 py-1 text-sm bg-white dark:bg-neutral-900 shadow-sm">
            {children}
        </span>
    );
}
