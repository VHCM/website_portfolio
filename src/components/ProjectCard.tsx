// src/components/ProjectCard.tsx
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

type Props = {
    image: string;
    title: string;
    stack: string[];
    description: string;
    repo?: string;
    demo?: string;
};

export default function ProjectCard({ image, title, stack, description, repo, demo }: Props) {
    return (
        <motion.article
            className="rounded-2xl overflow-hidden bg-white dark:bg-neutral-900 shadow-lg border border-neutral-100 dark:border-neutral-800 flex flex-col"
            whileHover={{ y: -2 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
            <Image src={image} alt={`Imagem do projeto ${title}`} width={800} height={480} />
            <div className="p-4 flex-1 flex flex-col">
                <h3 className="font-semibold text-lg">{title}</h3>
                <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-300">{description}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                    {stack.map((t) => (
                        <span key={t} className="text-xs px-2 py-1 rounded bg-primary-50 dark:bg-neutral-800 text-primary-700 dark:text-primary-300 border border-primary-200/60 dark:border-neutral-700">
                            {t}
                        </span>
                    ))}
                </div>
                <div className="mt-4 flex gap-3">
                    {repo && <Link href={repo} className="text-primary-700 dark:text-primary-300 hover:underline">GitHub</Link>}
                    {demo && <Link href={demo} className="text-primary-700 dark:text-primary-300 hover:underline">Demo</Link>}
                </div>
            </div>
        </motion.article>
    );
}
