import { useEffect, useState } from 'react';
import { Column, DataTable, Pagination } from '../../components/erp/DataTable';
import { PageHeader } from '../../components/erp/PageHeader';
import { Modal } from '../../components/ui/Modal';
import { ConfirmDialog, toast } from '../../components/ui/Toast';
import { studentApi } from '../../services';
import type { DepartmentOption, StudentFormValues, StudentRow } from '../../types/student';
import { Plus, Pencil, Trash2, Eye, RefreshCw } from 'lucide-react';

const empty: StudentFormValues = {
  name: '',
  age: '',
  departmentId: '',
};

export default function Students() {
  const [rows, setRows] = useState<StudentRow[]>([]);
  const [departments, setDepartments] = useState<DepartmentOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalStudents, setTotalStudents] = useState(0);
  const [pageSize, setPageSize] = useState(8);
  const [modal, setModal] = useState<{ mode: 'add' | 'edit' | 'view'; data: StudentRow | null } | null>(null);
  const [form, setForm] = useState<StudentFormValues>(empty);
  const [delId, setDelId] = useState<string | null>(null);
  const loadStudents = async (nextPage = 1, nextSize = pageSize) => {
    try {
      setLoading(true);
      setError('');

      const [studentPage, departmentOptions] = await Promise.all([
        studentApi.listPage(nextPage - 1, nextSize),
        departments.length ? Promise.resolve(departments) : studentApi.listDepartments(),
      ]);

      setRows(studentPage.content);
      setDepartments(departmentOptions);
      setTotalPages(studentPage.totalPages);
      setTotalStudents(studentPage.totalElements);
      setPage(nextPage);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load students');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadStudents(1, pageSize);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageSize]);

  const openAdd = () => {
    setForm(empty);
    setModal({ mode: 'add', data: null });
  };

  const openEdit = (student: StudentRow) => {
    setForm({
      name: student.name,
      age: student.age.toString(),
      departmentId: student.departmentId,
    });
    setModal({ mode: 'edit', data: student });
  };

  const openView = (student: StudentRow) => setModal({ mode: 'view', data: student });

  const save = async () => {
    if (!form.name.trim() || !form.age.trim() || !form.departmentId.trim()) {
      toast('Name, age, and department are required', 'error');
      return;
    }

    const payload = {
      name: form.name.trim(),
      age: Number(form.age),
      departmentId: Number(form.departmentId),
    };

    if (!Number.isFinite(payload.age) || payload.age <= 0) {
      toast('Age must be greater than 0', 'error');
      return;
    }

    if (!Number.isFinite(payload.departmentId) || payload.departmentId <= 0) {
      toast('Select a valid department', 'error');
      return;
    }

    try {
      setSaving(true);

      if (modal?.mode === 'add') {
        await studentApi.create(payload);
        toast('Student added successfully');
      } else if (modal?.mode === 'edit' && modal.data) {
        await studentApi.update(modal.data.id, payload);
        toast('Student updated successfully');
      }

      setModal(null);
      await loadStudents(page, pageSize);
    } catch (err) {
      toast(err instanceof Error ? err.message : 'Failed to save student', 'error');
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    if (!delId) {
      return;
    }

    try {
      await studentApi.remove(delId);
      toast('Student deleted');
      setDelId(null);
      await loadStudents(page, pageSize);
    } catch (err) {
      toast(err instanceof Error ? err.message : 'Failed to delete student', 'error');
    }
  };

  const columns: Column<StudentRow>[] = [
    {
      key: 'name',
      label: 'Student',
      render: (student) => (
        <div>
          <div className="font-semibold text-ink-900 dark:text-white">{student.name}</div>
          <div className="text-xs text-ink-400">ID {student.id}</div>
        </div>
      ),
    },
    { key: 'age', label: 'Age' },
    { key: 'departmentName', label: 'Department' },
    {
      key: 'actions',
      label: 'Actions',
      render: (student) => (
        <div className="flex gap-1">
          <button onClick={() => openView(student)} className="btn-ghost p-1.5 rounded-lg" title="View"><Eye className="h-4 w-4" /></button>
          <button onClick={() => openEdit(student)} className="btn-ghost p-1.5 rounded-lg" title="Edit"><Pencil className="h-4 w-4" /></button>
          <button onClick={() => setDelId(student.id)} className="btn-ghost p-1.5 rounded-lg text-rose-600" title="Delete"><Trash2 className="h-4 w-4" /></button>
        </div>
      ),
    },
  ];

  const departmentLabel = (departmentId: string) => departments.find((department) => department.id.toString() === departmentId)?.name ?? 'Select a department';

  return (
    <div>
      <PageHeader
        title="Students"
        subtitle={loading ? 'Loading students...' : `${totalStudents} students enrolled`}
        action={(
          <div className="flex gap-2">
            <button onClick={() => void loadStudents(page, pageSize)} className="btn-secondary">
              <RefreshCw className="h-4 w-4" /> Refresh
            </button>
            <button onClick={openAdd} className="btn-primary"><Plus className="h-4 w-4" /> Add Student</button>
          </div>
        )}
      />

      <div className="flex flex-wrap items-center gap-3 mb-4">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-ink-500">Rows per page</label>
          <select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))} className="input !py-2 !w-28">
            {[5, 8, 10, 20].map((size) => <option key={size} value={size}>{size}</option>)}
          </select>
        </div>
      </div>

      {error ? <div className="card p-4 mb-4 text-rose-600">{error}</div> : null}

      <DataTable columns={columns} rows={rows} loading={loading} empty="No students found." />
      <Pagination page={page} total={totalPages} onChange={(nextPage) => { void loadStudents(nextPage, pageSize); }} />

      {/* Add / Edit modal */}
      <Modal open={!!modal && modal.mode !== 'view'} onClose={() => setModal(null)} title={modal?.mode === 'add' ? 'Add Student' : 'Edit Student'} size="lg">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Full Name</label>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input" />
          </div>
          <div>
            <label className="label">Age</label>
            <input type="number" min="1" value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} className="input" />
          </div>
          <div className="sm:col-span-2">
            <label className="label">Department</label>
            <select value={form.departmentId} onChange={(e) => setForm({ ...form, departmentId: e.target.value })} className="input">
              <option value="">Select a department</option>
              {departments.map((department) => (
                <option key={department.id} value={department.id}>{department.name}</option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-2 rounded-xl bg-ink-50 p-3 text-sm text-ink-500 dark:bg-ink-800/50 dark:text-ink-300">
            Selected department: {departmentLabel(form.departmentId)}
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <button className="btn-secondary" onClick={() => setModal(null)}>Cancel</button>
          <button className="btn-primary" onClick={() => void save()} disabled={saving}>{saving ? 'Saving...' : modal?.mode === 'add' ? 'Add Student' : 'Save Changes'}</button>
        </div>
      </Modal>

      {/* View modal */}
      <Modal open={!!modal && modal.mode === 'view'} onClose={() => setModal(null)} title="Student Profile" size="md">
        {modal?.data && (
          <div className="text-center">
            <h3 className="mt-4 font-display text-xl font-bold text-ink-900 dark:text-white">{modal.data.name}</h3>
            <p className="text-sm text-brand-600">{modal.data.id} • {modal.data.departmentName}</p>
            <div className="grid grid-cols-2 gap-3 mt-6 text-left">
              {[
                ['Student ID', modal.data.id], ['Age', modal.data.age.toString()],
                ['Department', modal.data.departmentName], ['Department ID', modal.data.departmentId || 'N/A'],
              ].map(([l, v]) => (
                <div key={l} className="bg-ink-50 dark:bg-ink-800/50 rounded-xl p-3">
                  <div className="text-xs text-ink-400">{l}</div>
                  <div className="text-sm font-medium text-ink-800 dark:text-ink-100">{v}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal>

      <ConfirmDialog open={!!delId} onClose={() => setDelId(null)} onConfirm={confirmDelete} message="Are you sure you want to delete this student? This action cannot be undone." />
    </div>
  );
}
