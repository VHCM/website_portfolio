// src/components/Button.tsx
type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { children: React.ReactNode };
export default function Button({ children, ...rest }: Props) {
    return (
        <button
            {...rest}
            className="rounded-lg bg-primary-600 text-white px-4 py-2 shadow-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-600 disabled:opacity-60"
        >
            {children}
        </button>
    );
}
