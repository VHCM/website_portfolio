// src/app/api/contact/route.ts
import { NextResponse } from 'next/server';
import { validateContact } from '@/lib/validations';

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const { valid, errors } = validateContact(data);
        if (!valid) {
            return NextResponse.json({ ok: false, errors }, { status: 400 });
        }
        // Mock de envio (aqui você integraria com serviço de email)
        console.log('Contato recebido:', data);
        return NextResponse.json({ ok: true, message: 'Mensagem enviada (mock)!' });
    } catch {
        return NextResponse.json({ ok: false, error: 'Formato inválido' }, { status: 400 });
    }
}
