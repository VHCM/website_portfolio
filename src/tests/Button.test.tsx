// src/tests/Button.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from '@/components/Button';

test('renderiza e dispara clique', async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Enviar</Button>);
    expect(screen.getByRole('button', { name: /enviar/i })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /enviar/i }));
    expect(onClick).toHaveBeenCalledTimes(1);
});
