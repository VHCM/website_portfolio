// src/lib/validations.ts
type Contact = { name?: string; email?: string; message?: string };

export function validateContact(data: Contact) {
    const errors: Record<string, string> = {};
    if (!data.name || String(data.name).trim().length < 2) errors.name = 'Informe seu nome (mín. 2 caracteres).';
    const email = String(data.email || '');
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Informe um e-mail válido.';
    if (!data.message || String(data.message).trim().length < 10) errors.message = 'Mensagem muito curta (mín. 10).';
    return { valid: Object.keys(errors).length === 0, errors };
}
