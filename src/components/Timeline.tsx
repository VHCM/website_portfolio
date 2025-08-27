// src/components/Timeline.tsx
type Item = { date: string; title: string; org: string; description: string };

export default function Timeline({ items }: { items: Item[] }) {
    return (
        <ol className="relative border-s border-neutral-200 dark:border-neutral-800">
            {items.map((it) => (
                <li key={it.title + it.date} className="mb-10 ms-6">
                    <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary-600 text-white text-xs">•</span>
                    <time className="mb-1 block text-sm text-neutral-600 dark:text-neutral-400">{it.date}</time>
                    <h3 className="text-lg font-semibold">{it.title} — <span className="font-normal">{it.org}</span></h3>
                    <p className="mt-1 text-neutral-700 dark:text-neutral-300">{it.description}</p>
                </li>
            ))}
        </ol>
    );
}
