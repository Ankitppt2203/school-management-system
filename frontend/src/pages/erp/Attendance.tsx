import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Column, DataTable, Pagination, StatusBadge } from '../../components/erp/DataTable';
import { PageHeader } from '../../components/erp/PageHeader';
import { Modal } from '../../components/ui/Modal';
import { ConfirmDialog, toast } from '../../components/ui/Toast';
import { attendanceApi, studentApi } from '../../services';
import type { AttendanceFormValues, AttendanceRow } from '../../types/attendance';
import type { StudentRow } from '../../types/student';
import { Calendar, Check, X, Clock, Plus, Pencil, Trash2, Eye, Search, RefreshCw } from 'lucide-react';

const empty: AttendanceFormValues = {
  date: new Date().toISOString().slice(0, 10),
  status: 'PRESENT',
  studentId: '',
};

export default function Attendance() {
  const [rows, setRows] = useState<AttendanceRow[]>([]);
  const [students, setStudents] = useState<StudentRow[]>([]);
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [modal, setModal] = useState<{ mode: 'add' | 'edit' | 'view'; data: AttendanceRow | null } | null>(null);
  const [form, setForm] = useState<AttendanceFormValues>(empty);
  const [delId, setDelId] = useState<string | null>(null);
  const [selectedAttendance, setSelectedAttendance] = useState<AttendanceRow | null>(null);

  const loadAttendance = async () => {
    try {
      setLoading(true);
      setError('');

      const [attendanceRows, studentRows] = await Promise.all([
        attendanceApi.listAll(),
        studentApi.listAll(),
      ]);

      setRows(attendanceRows);
      setStudents(studentRows);
      setPage(1);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load attendance');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadAttendance();
  }, []);

  const filtered = useMemo(() => rows.filter((row) => row.date.includes(q) || row.id.includes(q) || row.studentLabel.toLowerCase().includes(q.toLowerCase())), [rows, q]);
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));

  const present = rows.filter((r) => r.status === 'PRESENT').length;
  const absent = rows.filter((r) => r.status === 'ABSENT').length;

  const openAdd = () => {
    setForm(empty);
    setModal({ mode: 'add', data: null });
  };

  const openEdit = (row: AttendanceRow) => {
    setForm({
      date: row.date,
      status: row.status,
      studentId: row.studentId,
    });
    setModal({ mode: 'edit', data: row });
  };

  const openView = async (row: AttendanceRow) => {
    try {
      const detailed = await attendanceApi.getById(row.id);
      setSelectedAttendance(detailed);
      setModal({ mode: 'view', data: detailed });
    } catch (err) {
      toast(err instanceof Error ? err.message : 'Failed to load attendance record', 'error');
    }
  };

  const save = async () => {
    if (!form.date.trim() || !form.status || !form.studentId.trim()) {
      toast('Date, status, and student are required', 'error');
      return;
    }

    const payload = {
      date: form.date,
      status: form.status,
      studentId: Number(form.studentId),
    };

    if (!Number.isFinite(payload.studentId) || payload.studentId <= 0) {
      toast('Select a valid student', 'error');
      return;
    }

    try {
      setSaving(true);

      if (modal?.mode === 'add') {
        await attendanceApi.create(payload);
        toast('Attendance added successfully');
      } else if (modal?.mode === 'edit' && modal.data) {
        await attendanceApi.update(modal.data.id, payload);
        toast('Attendance updated successfully');
      }

      setModal(null);
      await loadAttendance();
    } catch (err) {
      toast(err instanceof Error ? err.message : 'Failed to save attendance', 'error');
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    if (!delId) {
      return;
    }

    try {
      await attendanceApi.remove(delId);
      toast('Attendance deleted successfully');
      setDelId(null);
      await loadAttendance();
    } catch (err) {
      toast(err instanceof Error ? err.message : 'Failed to delete attendance', 'error');
    }
  };

  const columns: Column<AttendanceRow>[] = [
    { key: 'date', label: 'Date', render: (row) => <div className="font-semibold text-ink-900 dark:text-white">{row.date}</div> },
    { key: 'status', label: 'Status', render: (row) => <StatusBadge status={row.status === 'PRESENT' ? 'Present' : 'Absent'} /> },
    { key: 'studentLabel', label: 'Student', render: (row) => <span>{row.studentLabel}</span> },
    {
      key: 'actions',
      label: 'Actions',
      render: (row) => (
        <div className="flex gap-1">
          <button onClick={() => void openView(row)} className="btn-ghost p-1.5 rounded-lg" title="View"><Eye className="h-4 w-4" /></button>
          <button onClick={() => openEdit(row)} className="btn-ghost p-1.5 rounded-lg" title="Edit"><Pencil className="h-4 w-4" /></button>
          <button onClick={() => setDelId(row.id)} className="btn-ghost p-1.5 rounded-lg text-rose-600" title="Delete"><Trash2 className="h-4 w-4" /></button>
        </div>
      ),
    },
  ];

  const studentLabel = (studentId: string) => students.find((student) => student.id === studentId)?.name ?? 'Select a student';

  return (
    <div>
      <PageHeader
        title="Attendance"
        subtitle={loading ? 'Loading attendance...' : 'Manage attendance records'}
        action={(
          <div className="flex gap-2">
            <button onClick={() => void loadAttendance()} className="btn-secondary">
              <RefreshCw className="h-4 w-4" /> Refresh
            </button>
            <button onClick={openAdd} className="btn-primary"><Plus className="h-4 w-4" /> Add Attendance</button>
          </div>
        )}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
        {[
          { l: 'Total', v: rows.length, c: 'from-brand-500 to-brand-700' },
          { l: 'Present', v: present, c: 'from-emerald-500 to-teal-600' },
          { l: 'Absent', v: absent, c: 'from-rose-500 to-pink-600' },
        ].map((s) => (
          <motion.div key={s.l} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="card p-5">
            <div className={`font-display text-3xl font-bold bg-gradient-to-br ${s.c} bg-clip-text text-transparent`}>{s.v}</div>
            <div className="text-sm text-ink-500">{s.l}</div>
          </motion.div>
        ))}
      </div>

      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <div className="relative w-fit">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
          <input value={q} onChange={(e) => { setQ(e.target.value); setPage(1); }} placeholder="Search attendance..." className="input !py-2 pl-9 !w-64" />
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-ink-500">Rows per page</label>
          <select value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }} className="input !py-2 !w-28">
            {[5, 8, 10, 20].map((size) => <option key={size} value={size}>{size}</option>)}
          </select>
        </div>
      </div>

      {error ? <div className="card p-4 mb-4 text-rose-600">{error}</div> : null}

      <DataTable columns={columns} rows={paged} loading={loading} empty="No attendance records found." />
      <Pagination page={page} total={totalPages} onChange={setPage} />

      <Modal open={!!modal && modal.mode !== 'view'} onClose={() => setModal(null)} title={modal?.mode === 'add' ? 'Add Attendance' : 'Edit Attendance'} size="lg">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Date</label>
            <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="input" />
          </div>
          <div>
            <label className="label">Status</label>
            <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as AttendanceFormValues['status'] })} className="input">
              <option value="PRESENT">PRESENT</option>
              <option value="ABSENT">ABSENT</option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className="label">Student</label>
            <select value={form.studentId} onChange={(e) => setForm({ ...form, studentId: e.target.value })} className="input">
              <option value="">Select a student</option>
              {students.map((student) => <option key={student.id} value={student.id}>{student.name} (ID {student.id})</option>)}
            </select>
          </div>
          <div className="sm:col-span-2 rounded-xl bg-ink-50 p-3 text-sm text-ink-500 dark:bg-ink-800/50 dark:text-ink-300">
            Selected student: {studentLabel(form.studentId)}
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <button className="btn-secondary" onClick={() => setModal(null)}>Cancel</button>
          <button className="btn-primary" onClick={() => void save()} disabled={saving}>{saving ? 'Saving...' : modal?.mode === 'add' ? 'Add Attendance' : 'Save Changes'}</button>
        </div>
      </Modal>

      <Modal open={!!modal && modal.mode === 'view'} onClose={() => setModal(null)} title="Attendance Details" size="md">
        {selectedAttendance && (
          <div>
            <h3 className="font-display text-xl font-bold text-ink-900 dark:text-white">Attendance Record</h3>
            <p className="mt-2 text-sm text-ink-500">ID {selectedAttendance.id}</p>
            <div className="grid grid-cols-2 gap-3 mt-6 text-left">
              {[
                ['Date', selectedAttendance.date],
                ['Status', selectedAttendance.status],
                ['Student', selectedAttendance.studentLabel],
                ['Student ID', selectedAttendance.studentId || 'Not returned by API'],
              ].map(([label, value]) => (
                <div key={label} className="bg-ink-50 dark:bg-ink-800/50 rounded-xl p-3">
                  <div className="text-xs text-ink-400">{label}</div>
                  <div className="text-sm font-medium text-ink-800 dark:text-ink-100">{value}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-xl bg-amber-50 p-3 text-sm text-amber-700 dark:bg-amber-900/20 dark:text-amber-300">
              Backend attendance entities do not serialize the student relation, so list/get responses omit the student name and ID unless the API changes.
            </div>
          </div>
        )}
      </Modal>

      <ConfirmDialog open={!!delId} onClose={() => setDelId(null)} onConfirm={confirmDelete} message="Delete this attendance record?" />
    </div>
  );
}
