// src/app/page.tsx
'use client';

import { motion } from 'framer-motion';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import Contact from '@/components/Contact';
import Section from '@/components/Section';
import { useActiveSection } from '@/lib/hooks';
import { nav } from '@/data/nav';

export default function Page() {
  useActiveSection(nav.map(n => n.href.replace('#', '')));

  return (
    <>
      <Hero />
      <Section id="sobre" title="Sobre">
        <About />
      </Section>
      <Section id="skills" title="Skills">
        <Skills />
      </Section>
      <Section id="projetos" title="Projetos">
        <Projects />
      </Section>
      <Section id="experiencia" title="Experiência & Educação">
        <Experience />
      </Section>
      <Section id="contato" title="Contato">
        <Contact />
      </Section>
      {/* Animação de entrada leve para todo o conteúdo */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
    </>
  );
}
