// src/components/Hero.tsx
'use client';
import { motion } from 'framer-motion';
import AnimatedIcon from './AnimatedIcon';
import Link from 'next/link';
import { site } from '@/data/site';

export default function Hero() {
    return (
        <section id="home" className="py-16 sm:py-24">
            <div className="grid md:grid-cols-2 gap-8 items-center">
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                    <p className="text-primary-600 dark:text-primary-300 font-medium">Olá, eu sou</p>
                    <h1 className="mt-2 text-4xl sm:text-5xl font-extrabold tracking-tight">{site.owner}</h1>
                    <p className="mt-4 text-lg text-gray-800 dark:text-gray-200">{site.tagline}</p>
                    <div className="mt-6 flex items-center gap-3">
                        <Link
                            href="/cv.pdf"
                            className="inline-flex items-center gap-2 rounded-lg bg-primary-600 text-white px-4 py-2 shadow-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-600"
                        >
                            Baixar CV
                        </Link>
                        <a
                            href="#projetos"
                            className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 dark:border-neutral-700 px-4 py-2 hover:bg-neutral-50 dark:hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-primary-600"
                        >
                            Ver Projetos
                        </a>
                    </div>
                </motion.div>
                <motion.div
                    className="grid grid-cols-3 gap-6 justify-items-center"
                    initial="hidden"
                    animate="show"
                    variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
                >
                    {site.heroIcons.map((url, i) => (
                        <motion.div key={i} variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}>
                            <AnimatedIcon src={url} alt="Ícone animado" size={64} />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
