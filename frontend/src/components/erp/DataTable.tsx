import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

export interface Column<T> {
  key: keyof T | string;
  label: string;
  render?: (row: T) => ReactNode;
  sortable?: boolean;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  rows: T[];
  loading?: boolean;
  empty?: string;
}

export function DataTable<T extends { id: string }>({ columns, rows, loading, empty = 'No records found.' }: DataTableProps<T>) {
  if (loading) {
    return (
      <div className="card overflow-hidden">
        <div className="p-4 space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-10 rounded-lg bg-ink-100 dark:bg-ink-800 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }
  if (!rows.length) {
    return <div className="card p-10 text-center text-ink-500">{empty}</div>;
  }
  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-ink-50 dark:bg-ink-800/50 border-b border-ink-100 dark:border-ink-800">
              {columns.map((c) => (
                <th key={String(c.key)} className={`py-3 px-4 font-semibold text-ink-700 dark:text-ink-200 whitespace-nowrap ${c.className || ''}`}>{c.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <motion.tr
                key={row.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.03 }}
                className="border-b border-ink-100 dark:border-ink-800 hover:bg-brand-50/40 dark:hover:bg-ink-800/40 transition"
              >
                {columns.map((c) => (
                  <td key={String(c.key)} className={`py-3 px-4 text-ink-600 dark:text-ink-300 whitespace-nowrap ${c.className || ''}`}>
                    {c.render ? c.render(row) : String((row as Record<string, unknown>)[c.key as string] ?? '')}
                  </td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function Pagination({ page, total, onChange }: { page: number; total: number; onChange: (p: number) => void }) {
  if (total <= 1) return null;
  return (
    <div className="flex items-center justify-center gap-2 mt-4">
      <button disabled={page === 1} onClick={() => onChange(page - 1)} className="btn-secondary !px-3 !py-1.5 text-sm disabled:opacity-40">Prev</button>
      {Array.from({ length: total }).map((_, i) => (
        <button key={i} onClick={() => onChange(i + 1)} className={`h-9 w-9 rounded-lg text-sm font-medium transition ${page === i + 1 ? 'bg-brand-600 text-white' : 'bg-white dark:bg-ink-800 text-ink-600 dark:text-ink-300 border border-ink-200 dark:border-ink-700'}`}>{i + 1}</button>
      ))}
      <button disabled={page === total} onClick={() => onChange(page + 1)} className="btn-secondary !px-3 !py-1.5 text-sm disabled:opacity-40">Next</button>
    </div>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    Active: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
    Inactive: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300',
    Present: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
    Absent: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300',
    Leave: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
    Scheduled: 'bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300',
    Ongoing: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
    Completed: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
  };
  return <span className={`chip ${map[status] || 'bg-ink-100 text-ink-600'}`}>{status}</span>;
}
