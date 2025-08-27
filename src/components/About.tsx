// src/components/About.tsx
import Image from 'next/image';

export default function About() {
    return (
        <div className="grid md:grid-cols-[240px,1fr] gap-8 items-start">
            <div className="rounded-2xl overflow-hidden shadow-lg">
                <Image src="/images/avatar.jpg" alt="Foto de perfil" width={480} height={480} />
            </div>
            <div className="prose dark:prose-invert max-w-none">
                <p>
                    Sou desenvolvedor focado em soluções web, automação e UX consistente ao estilo Material Design.
                    Curto construir interfaces performáticas, acessíveis e bem testadas.
                </p>
                <p>
                    Trabalho com Next.js, TypeScript, Tailwind e integrações com APIs. Aqui você encontra minhas skills,
                    projetos e formas de contato.
                </p>
            </div>
        </div>
    );
}
