import { useMemo, useState } from 'react';
import { Column, DataTable, Pagination } from '../../components/erp/DataTable';
import { PageHeader } from '../../components/erp/PageHeader';
import { toast } from '../../components/ui/Toast';
import { results as initial } from '../../data/mock';
import type { Result } from '../../types';
import { Download, Search, Award } from 'lucide-react';

const gradeColor: Record<string, string> = {
  'A+': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
  A: 'bg-brand-100 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300',
  'B+': 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
  B: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300',
};

export default function Results() {
  const [rows] = useState<Result[]>(initial);
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);
  const perPage = 8;

  const filtered = useMemo(() => rows.filter((r) => r.student.toLowerCase().includes(q.toLowerCase()) || r.class.toLowerCase().includes(q.toLowerCase())), [rows, q]);
  const paged = filtered.slice((page - 1) * perPage, page * perPage);

  const columns: Column<Result>[] = [
    { key: 'rank', label: 'Rank', render: (r) => <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-100 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300 font-bold text-sm">{r.rank}</span> },
    { key: 'student', label: 'Student', render: (r) => <div className="font-semibold text-ink-900 dark:text-white">{r.student}</div> },
    { key: 'class', label: 'Class' },
    { key: 'exam', label: 'Exam' },
    { key: 'marks', label: 'Marks', render: (r) => `${r.marks}/${r.total}` },
    { key: 'percentage', label: 'Percentage', render: (r) => <span className="font-semibold text-brand-600">{r.percentage}%</span> },
    { key: 'grade', label: 'Grade', render: (r) => <span className={`chip ${gradeColor[r.grade]}`}>{r.grade}</span> },
    { key: 'actions', label: 'Report', render: (r) => (
      <button onClick={() => toast(`Report card downloaded for ${r.student}`)} className="btn-secondary !py-1.5 !px-3 text-xs"><Download className="h-3.5 w-3.5" /> Report Card</button>
    ) },
  ];

  const toppers = [...rows].sort((a, b) => a.rank - b.rank).slice(0, 3);

  return (
    <div>
      <PageHeader title="Results" subtitle={`${filtered.length} results published`} />

      <div className="grid sm:grid-cols-3 gap-4 mb-5">
        {toppers.map((t, i) => (
          <div key={t.id} className="card p-5 flex items-center gap-4">
            <span className={`grid h-12 w-12 place-items-center rounded-xl ${i === 0 ? 'bg-amber-100 text-amber-600' : i === 1 ? 'bg-ink-200 text-ink-600' : 'bg-orange-100 text-orange-600'}`}>
              <Award className="h-6 w-6" />
            </span>
            <div>
              <div className="font-semibold text-ink-900 dark:text-white">{t.student}</div>
              <div className="text-xs text-ink-500">Rank #{t.rank} • {t.percentage}%</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-4 relative w-fit">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
        <input value={q} onChange={(e) => { setQ(e.target.value); setPage(1); }} placeholder="Search results..." className="input !py-2 pl-9 !w-64" />
      </div>

      <DataTable columns={columns} rows={paged} />
      <Pagination page={page} total={Math.ceil(filtered.length / perPage)} onChange={setPage} />
    </div>
  );
}
