import { useEffect, useMemo, useState } from 'react';
import { Column, DataTable, Pagination, StatusBadge } from '../../components/erp/DataTable';
import { PageHeader } from '../../components/erp/PageHeader';
import { Modal } from '../../components/ui/Modal';
import { toast } from '../../components/ui/Toast';
import { attendanceApi, studentApi } from '../../services';
import { useAuth } from '../../context/AuthContext';
import type { AttendanceFormValues, AttendanceRow, AttendanceStudent } from '../../types/attendance';
import type { DepartmentOption } from '../../types/student';
import { Pencil, Search, RefreshCw } from 'lucide-react';

const today = () => new Date().toISOString().slice(0, 10);
type AttendanceRosterRow = Omit<AttendanceStudent, 'id'> & { id: string; studentId: number };

export default function Attendance() {
  const { user } = useAuth();
  const [attendance, setAttendance] = useState<AttendanceRow[]>([]);
  const [departments, setDepartments] = useState<DepartmentOption[]>([]);
  const [students, setStudents] = useState<AttendanceRosterRow[]>([]);
  const [departmentId, setDepartmentId] = useState('');
  const [date, setDate] = useState(today);
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(true);
  const [rosterLoading, setRosterLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState<AttendanceRow | null>(null);
  const [form, setForm] = useState<AttendanceFormValues>({ date: today(), status: 'PRESENT', studentId: '' });
  const canMark = user?.role === 'admin' || user?.role === 'teacher';

  const loadAttendance = async () => {
    try {
      setLoading(true);
      setError('');
      const [records, departmentOptions] = await Promise.all([
        attendanceApi.listAll(),
        studentApi.listDepartments(),
      ]);
      setAttendance(records);
      setDepartments(departmentOptions);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load attendance');
    } finally {
      setLoading(false);
    }
  };

  const loadRoster = async (id: string) => {
    setStudents([]);
    setPage(1);
    if (!id) return;
    try {
      setRosterLoading(true);
      setError('');
      const roster = await attendanceApi.listDepartmentStudents(id);
      setStudents(roster.map((student) => ({ ...student, id: student.id.toString(), studentId: student.id })));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load department students');
    } finally {
      setRosterLoading(false);
    }
  };

  useEffect(() => { void loadAttendance(); }, []);
  useEffect(() => { void loadRoster(departmentId); }, [departmentId]);

  const attendanceFor = (studentId: number) => attendance.find((record) => record.studentId === studentId.toString() && record.date === date);
  const filteredStudents = useMemo(() => {
    const search = q.trim().toLowerCase();
    if (!search) return students;
    return students.filter((student) => `${student.firstName} ${student.lastName} ${student.rollNumber ?? ''} ${student.userId ?? student.id}`.toLowerCase().includes(search));
  }, [students, q]);
  const totalPages = Math.max(1, Math.ceil(filteredStudents.length / pageSize));
  const pagedStudents = filteredStudents.slice((page - 1) * pageSize, page * pageSize);
  const marked = students.map((student) => attendanceFor(student.studentId)).filter(Boolean) as AttendanceRow[];
  const present = marked.filter((record) => record.status === 'PRESENT').length;
  const absent = marked.filter((record) => record.status === 'ABSENT').length;

  const mark = async (student: AttendanceRosterRow, status: AttendanceFormValues['status']) => {
    if (!canMark) return;
    const existing = attendanceFor(student.studentId);
    const payload = { date, status, studentId: student.studentId };
    try {
      setSaving(true);
      if (existing) await attendanceApi.update(existing.id, payload);
      else await attendanceApi.create(payload);
      toast(`${student.firstName} ${student.lastName} marked ${status.toLowerCase()}`);
      await loadAttendance();
    } catch (err) {
      toast(err instanceof Error ? err.message : 'Failed to save attendance', 'error');
    } finally {
      setSaving(false);
    }
  };

  const openEdit = (student: AttendanceRosterRow) => {
    const record = attendanceFor(student.studentId);
    if (!record) {
      toast('Mark the student present or absent before editing.', 'error');
      return;
    }
    setEditing(record);
    setForm({ date: record.date, status: record.status, studentId: record.studentId });
  };

  const saveEdit = async () => {
    if (!editing || !form.date) return;
    try {
      setSaving(true);
      await attendanceApi.update(editing.id, { date: form.date, status: form.status, studentId: Number(form.studentId) });
      toast('Attendance updated successfully');
      setEditing(null);
      await loadAttendance();
    } catch (err) {
      toast(err instanceof Error ? err.message : 'Failed to update attendance', 'error');
    } finally {
      setSaving(false);
    }
  };

  const columns: Column<AttendanceRosterRow>[] = [
    { key: 'name', label: 'Student', render: (student) => <div><div className="font-semibold text-ink-900 dark:text-white">{student.firstName} {student.lastName}</div><div className="text-xs text-ink-400">Student ID {student.studentId}</div></div> },
    { key: 'rollNumber', label: 'Roll No.', render: (student) => student.rollNumber || '—' },
    { key: 'userId', label: 'User ID', render: (student) => student.userId || `Student-${student.studentId}` },
    { key: 'status', label: 'Status', render: (student) => { const record = attendanceFor(student.studentId); return record ? <StatusBadge status={record.status === 'PRESENT' ? 'Present' : 'Absent'} /> : <span className="text-sm text-ink-400">Not marked</span>; } },
    { key: 'actions', label: 'Mark attendance', render: (student) => <div className="flex flex-wrap gap-2"><button disabled={!canMark || saving} onClick={() => void mark(student, 'PRESENT')} className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700 disabled:opacity-50">Present</button><button disabled={!canMark || saving} onClick={() => void mark(student, 'ABSENT')} className="rounded-lg bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-rose-700 disabled:opacity-50">Absent</button><button disabled={!canMark || saving} onClick={() => openEdit(student)} className="btn-secondary !px-3 !py-1.5 text-xs"><Pencil className="h-3.5 w-3.5" /> Edit</button></div> },
  ];

  return <div>
    <PageHeader title="Attendance" subtitle="Select a department to mark its students' attendance" action={<button onClick={() => void loadAttendance()} className="btn-secondary"><RefreshCw className="h-4 w-4" /> Refresh</button>} />
    <div className="mb-5 grid gap-4 md:grid-cols-4"><div><label className="label">Department</label><select value={departmentId} onChange={(event) => setDepartmentId(event.target.value)} className="input"><option value="">Select a department</option>{departments.map((department) => <option key={department.id} value={department.id}>{department.name}</option>)}</select></div><div><label className="label">Attendance date</label><input type="date" value={date} onChange={(event) => setDate(event.target.value)} className="input" /></div><div className="card p-3"><div className="text-2xl font-bold text-emerald-600">{present}</div><div className="text-sm text-ink-500">Present</div></div><div className="card p-3"><div className="text-2xl font-bold text-rose-600">{absent}</div><div className="text-sm text-ink-500">Absent</div></div></div>
    <div className="mb-4 flex flex-wrap items-center gap-3"><div className="relative"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" /><input value={q} onChange={(event) => { setQ(event.target.value); setPage(1); }} placeholder="Search student, roll no., user ID" className="input !w-72 !py-2 pl-9" /></div><select value={pageSize} onChange={(event) => { setPageSize(Number(event.target.value)); setPage(1); }} className="input !w-24 !py-2">{[5, 10, 20, 50].map((size) => <option key={size} value={size}>{size}</option>)}</select></div>
    {error && <div className="card mb-4 p-4 text-rose-600">{error}</div>}
    {!departmentId ? <div className="card p-8 text-center text-ink-500">Choose a department to show its students.</div> : <><DataTable columns={columns} rows={pagedStudents} loading={loading || rosterLoading} empty="No students found in this department." /><Pagination page={page} total={totalPages} onChange={setPage} /></>}
    <Modal open={!!editing} onClose={() => setEditing(null)} title="Edit Attendance" size="md"><div className="space-y-4"><div><label className="label">Date</label><input type="date" value={form.date} onChange={(event) => setForm({ ...form, date: event.target.value })} className="input" /></div><div><label className="label">Status</label><select value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value as AttendanceFormValues['status'] })} className="input"><option value="PRESENT">Present</option><option value="ABSENT">Absent</option></select></div></div><div className="mt-6 flex justify-end gap-3"><button onClick={() => setEditing(null)} className="btn-secondary">Cancel</button><button disabled={saving} onClick={() => void saveEdit()} className="btn-primary">{saving ? 'Saving...' : 'Save Changes'}</button></div></Modal>
  </div>;
}
