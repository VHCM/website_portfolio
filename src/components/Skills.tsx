// src/components/Skills.tsx
import Badge from './Badge';
import AnimatedIcon from './AnimatedIcon';
import { skills } from '@/data/skills';

export default function Skills() {
    return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {skills.map((s) => (
                <div key={s.name} className="rounded-2xl p-4 bg-white dark:bg-neutral-900 shadow-md">
                    <div className="flex items-center gap-3">
                        <AnimatedIcon src={s.icon} alt={s.name} size={32} />
                        <h3 className="font-semibold">{s.name}</h3>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                        {s.items.map((item) => <Badge key={item}>{item}</Badge>)}
                    </div>
                </div>
            ))}
        </div>
    );
}
