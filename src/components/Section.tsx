// src/components/Section.tsx
import { ReactNode } from 'react';
import { motion } from 'framer-motion';

export default function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
    return (
        <section id={id} className="scroll-mt-20 py-12 sm:py-20">
            <div className="mb-8">
                <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">{title}</h2>
            </div>
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5 }}
            >
                {children}
            </motion.div>
        </section>
    );
}
