// src/components/Projects.tsx
'use client';
import { projects } from '@/data/projects';
import ProjectCard from './ProjectCard';
import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';

export default function Projects() {
    const allTags = useMemo(() => Array.from(new Set(projects.flatMap(p => p.stack))), []);
    const [filter, setFilter] = useState<string>('Todos');

    const filtered = projects.filter(p => filter === 'Todos' || p.stack.includes(filter));

    return (
        <div>
            <div className="mb-6 flex flex-wrap items-center gap-2">
                <button
                    onClick={() => setFilter('Todos')}
                    className={`px-3 py-1 rounded-full border text-sm ${filter === 'Todos' ? 'bg-primary-600 text-white border-primary-600' : 'border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800'}`}
                >Todos</button>
                {allTags.map(tag => (
                    <button
                        key={tag}
                        onClick={() => setFilter(tag)}
                        className={`px-3 py-1 rounded-full border text-sm ${filter === tag ? 'bg-primary-600 text-white border-primary-600' : 'border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800'}`}
                    >{tag}</button>
                ))}
            </div>

            <motion.div
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
                initial="hidden"
                animate="show"
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
            >
                {filtered.map((p) => (
                    <motion.div key={p.title} variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}>
                        <ProjectCard {...p} />
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}
