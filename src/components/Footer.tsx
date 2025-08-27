// src/components/Footer.tsx
import SocialLinks from './SocialLinks';

export default function Footer() {
    return (
        <footer className="mt-20 border-t border-neutral-200 dark:border-neutral-800 py-8">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-sm text-neutral-600 dark:text-neutral-400">© {new Date().getFullYear()} Victor Hugo. Todos os direitos reservados.</p>
                <SocialLinks />
            </div>
        </footer>
    );
}
