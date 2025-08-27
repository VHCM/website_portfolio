// src/components/Experience.tsx
import Timeline from './Timeline';
import { experience } from '../data/experience';

export default function Experience() {
    return (
        <div className="grid lg:grid-cols-2 gap-8">
            <div>
                <h3 className="text-xl font-semibold mb-3">Experiência</h3>
                <Timeline items={experience.jobs} />
            </div>
            <div>
                <h3 className="text-xl font-semibold mb-3">Educação</h3>
                <Timeline items={experience.education} />
            </div>
        </div>
    );
}
