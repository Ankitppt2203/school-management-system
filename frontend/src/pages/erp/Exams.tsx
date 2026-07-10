import { useState } from 'react';
import { Column, DataTable, StatusBadge } from '../../components/erp/DataTable';
import { PageHeader } from '../../components/erp/PageHeader';
import { Modal } from '../../components/ui/Modal';
import { ConfirmDialog, toast } from '../../components/ui/Toast';
import { exams as initial } from '../../data/mock';
import type { Exam } from '../../types';
import { Plus, Pencil, Trash2, FileText } from 'lucide-react';

const empty: Omit<Exam, 'id'> = { name: '', class: 'Class X', subject: '', date: new Date().toISOString().slice(0, 10), time: '09:00 AM', room: '', totalMarks: 100, status: 'Scheduled' };

export default function Exams() {
  const [rows, setRows] = useState<Exam[]>(initial);
  const [modal, setModal] = useState<{ mode: 'add' | 'edit' | 'marks'; data: Exam | null } | null>(null);
  const [form, setForm] = useState<Omit<Exam, 'id'>>(empty);
  const [delId, setDelId] = useState<string | null>(null);

  const save = () => {
    if (!form.name || !form.subject) { toast('Name and subject are required', 'error'); return; }
    if (modal?.mode === 'add') setRows([{ ...form, id: `E${rows.length + 1}` }, ...rows]), toast('Exam scheduled');
    else if (modal?.mode === 'edit' && modal.data) setRows(rows.map((r) => (r.id === modal.data!.id ? { ...r, ...form } : r))), toast('Exam updated');
    setModal(null);
  };

  const columns: Column<Exam>[] = [
    { key: 'name', label: 'Exam', render: (e) => <div className="flex items-center gap-2"><FileText className="h-4 w-4 text-brand-500" /><div><div className="font-semibold text-ink-900 dark:text-white">{e.name}</div><div className="text-xs text-ink-400">{e.id}</div></div></div> },
    { key: 'class', label: 'Class' },
    { key: 'subject', label: 'Subject' },
    { key: 'date', label: 'Date' },
    { key: 'time', label: 'Time' },
    { key: 'room', label: 'Room' },
    { key: 'totalMarks', label: 'Marks' },
    { key: 'status', label: 'Status', render: (e) => <StatusBadge status={e.status} /> },
    { key: 'actions', label: 'Actions', render: (e) => (
      <div className="flex gap-1">
        <button onClick={() => setModal({ mode: 'marks', data: e })} className="btn-ghost p-1.5 rounded-lg" title="Marks Entry"><FileText className="h-4 w-4" /></button>
        <button onClick={() => { setForm(e); setModal({ mode: 'edit', data: e }); }} className="btn-ghost p-1.5 rounded-lg"><Pencil className="h-4 w-4" /></button>
        <button onClick={() => setDelId(e.id)} className="btn-ghost p-1.5 rounded-lg text-rose-600"><Trash2 className="h-4 w-4" /></button>
      </div>
    ) },
  ];

  return (
    <div>
      <PageHeader title="Exams" subtitle={`${rows.length} exams scheduled`} action={<button onClick={() => { setForm(empty); setModal({ mode: 'add', data: null }); }} className="btn-primary"><Plus className="h-4 w-4" /> Schedule Exam</button>} />
      <DataTable columns={columns} rows={rows} />

      <Modal open={!!modal && modal.mode !== 'marks'} onClose={() => setModal(null)} title={modal?.mode === 'add' ? 'Schedule Exam' : 'Edit Exam'}>
        <div className="grid sm:grid-cols-2 gap-4">
          <div><label className="label">Exam Name</label><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input" /></div>
          <div><label className="label">Subject</label><input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="input" /></div>
          <div><label className="label">Class</label><select value={form.class} onChange={(e) => setForm({ ...form, class: e.target.value })} className="input">{['Class IX', 'Class X', 'Class XI', 'Class XII'].map((c) => <option key={c}>{c}</option>)}</select></div>
          <div><label className="label">Date</label><input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="input" /></div>
          <div><label className="label">Time</label><input value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} className="input" /></div>
          <div><label className="label">Room</label><input value={form.room} onChange={(e) => setForm({ ...form, room: e.target.value })} className="input" /></div>
          <div><label className="label">Total Marks</label><input type="number" value={form.totalMarks} onChange={(e) => setForm({ ...form, totalMarks: +e.target.value })} className="input" /></div>
          <div><label className="label">Status</label><select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as Exam['status'] })} className="input">{['Scheduled', 'Ongoing', 'Completed'].map((s) => <option key={s}>{s}</option>)}</select></div>
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <button className="btn-secondary" onClick={() => setModal(null)}>Cancel</button>
          <button className="btn-primary" onClick={save}>{modal?.mode === 'add' ? 'Schedule' : 'Save'}</button>
        </div>
      </Modal>

      <Modal open={!!modal && modal.mode === 'marks'} onClose={() => setModal(null)} title={`Marks Entry — ${modal?.data?.name}`} size="lg">
        <div className="space-y-3 max-h-[60vh] overflow-y-auto">
          {['Aarav Patel', 'Diya Shah', 'Vivaan Reddy', 'Ananya Iyer', 'Reyansh Nair'].map((s) => (
            <div key={s} className="flex items-center gap-3 p-3 rounded-xl bg-ink-50 dark:bg-ink-800/50">
              <span className="text-sm font-medium text-ink-800 dark:text-ink-100 flex-1">{s}</span>
              <input type="number" max={modal?.data?.totalMarks} placeholder={`/${modal?.data?.totalMarks}`} className="input !py-1.5 !w-28" defaultValue={Math.floor(60 + Math.random() * 40)} />
            </div>
          ))}
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <button className="btn-secondary" onClick={() => setModal(null)}>Cancel</button>
          <button className="btn-primary" onClick={() => { toast('Marks saved successfully'); setModal(null); }}>Save Marks</button>
        </div>
      </Modal>

      <ConfirmDialog open={!!delId} onClose={() => setDelId(null)} onConfirm={() => { if (delId) { setRows(rows.filter((r) => r.id !== delId)); toast('Exam deleted'); } setDelId(null); }} message="Delete this exam?" />
    </div>
  );
}
