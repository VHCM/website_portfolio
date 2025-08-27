// src/components/AnimatedIcon.tsx
'use client';
import Image from 'next/image';
import { useState } from 'react';

/**
 * Tenta carregar um ícone animado via URL (ex.: Gradienty).
 * Se falhar, mostra um SVG simples com animação CSS como fallback.
 */
export default function AnimatedIcon({ src, alt, size = 48 }: { src: string; alt: string; size?: number }) {
    const [err, setErr] = useState(false);
    if (err || !src) {
        return (
            <span className="inline-block" aria-hidden="true">
                <svg width={size} height={size} viewBox="0 0 24 24" className="ai-fallback">
                    <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2"></circle>
                </svg>
            </span>
        );
    }
    return (
        <img
            src={src}
            alt={alt}
            width={size}
            height={size}
            onError={() => setErr(true)}
            loading="lazy"
        ></img>
    );
}
