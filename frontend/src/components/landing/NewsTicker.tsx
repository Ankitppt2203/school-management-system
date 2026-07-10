import { Newspaper } from 'lucide-react';
import { news } from '../../data/mock';

export function NewsTicker() {
  const items = [...news, ...news];
  return (
    <div className="bg-ink-900 dark:bg-ink-950 text-white overflow-hidden">
      <div className="container-px flex items-center gap-4 py-2.5">
        <span className="flex items-center gap-1.5 rounded-md bg-brand-600 px-2.5 py-1 text-xs font-bold uppercase tracking-wide shrink-0">
          <Newspaper className="h-3.5 w-3.5" /> Latest
        </span>
        <div className="relative flex-1 overflow-hidden">
          <div className="ticker-track">
            {items.map((n, i) => (
              <span key={i} className="inline-flex items-center gap-2 px-6 text-sm text-ink-200">
                <span className="chip bg-brand-500/20 text-brand-300">{n.tag}</span>
                {n.text}
                <span className="text-ink-600">•</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
