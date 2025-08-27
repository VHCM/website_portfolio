// src/components/Contact.tsx
'use client';
import { useState } from 'react';
import { validateContact } from '../lib/validations';

export default function Contact() {
    const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle');
    const [errors, setErrors] = useState<Record<string, string>>({});

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.currentTarget).entries());
        const { valid, errors: localErrors } = validateContact(data);
        if (!valid) {
            setErrors(localErrors);
            return;
        }
        setErrors({});
        setStatus('loading');
        const res = await fetch('/api/contact', { method: 'POST', body: JSON.stringify(data) });
        setStatus(res.ok ? 'ok' : 'error');
    }

    return (
        <form onSubmit={onSubmit} className="grid gap-4 max-w-xl" noValidate>
            <div>
                <label htmlFor="name" className="block text-sm font-medium">Nome</label>
                <input id="name" name="name" className="mt-1 w-full rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-600" aria-invalid={!!errors.name} />
                {errors.name && <p className="text-sm text-red-600 mt-1" role="alert">{errors.name}</p>}
            </div>
            <div>
                <label htmlFor="email" className="block text-sm font-medium">E-mail</label>
                <input id="email" name="email" type="email" className="mt-1 w-full rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-600" aria-invalid={!!errors.email} />
                {errors.email && <p className="text-sm text-red-600 mt-1" role="alert">{errors.email}</p>}
            </div>
            <div>
                <label htmlFor="message" className="block text-sm font-medium">Mensagem</label>
                <textarea id="message" name="message" rows={5} className="mt-1 w-full rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-600" aria-invalid={!!errors.message} />
                {errors.message && <p className="text-sm text-red-600 mt-1" role="alert">{errors.message}</p>}
            </div>
            <div className="flex items-center gap-3">
                <button
                    type="submit"
                    className="rounded-lg bg-primary-600 text-white px-4 py-2 shadow-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-600 disabled:opacity-60"
                    disabled={status === 'loading'}
                >
                    {status === 'loading' ? 'Enviando…' : 'Enviar'}
                </button>
                {status === 'ok' && <span className="text-green-700">Enviado! (mock)</span>}
                {status === 'error' && <span className="text-red-700">Erro ao enviar.</span>}
            </div>
        </form>
    );
}
