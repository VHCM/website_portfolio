// src/components/SocialLinks.tsx
import Link from 'next/link';

export default function SocialLinks() {
    return (
        <div className="flex gap-4">
            <Link href="https://github.com/seuusuario" aria-label="GitHub" className="hover:underline">GitHub</Link>
            <Link href="https://linkedin.com/in/seuusuario" aria-label="LinkedIn" className="hover:underline">LinkedIn</Link>
            <Link href="mailto:email@exemplo.com" aria-label="E-mail" className="hover:underline">E-mail</Link>
        </div>
    );
}
