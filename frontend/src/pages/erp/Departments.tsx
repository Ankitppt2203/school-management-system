import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Column, DataTable, Pagination } from '../../components/erp/DataTable';
import { PageHeader } from '../../components/erp/PageHeader';
import { Modal } from '../../components/ui/Modal';
import { ConfirmDialog, toast } from '../../components/ui/Toast';
import { departmentApi } from '../../services';
import type { DepartmentFormValues, DepartmentRow } from '../../types/department';
import { Plus, Pencil, Trash2, Search, RefreshCw, Building2 } from 'lucide-react';

const empty: DepartmentFormValues = { name: '' };

export default function Departments() {
  const [rows, setRows] = useState<DepartmentRow[]>([]);
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [modal, setModal] = useState<{ mode: 'add' | 'edit' | 'view'; data: DepartmentRow | null } | null>(null);
  const [form, setForm] = useState<DepartmentFormValues>(empty);
  const [delId, setDelId] = useState<string | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<DepartmentRow | null>(null);

  const loadDepartments = async () => {
    try {
      setLoading(true);
      setError('');

      const departmentRows = await departmentApi.listAll();
      setRows(departmentRows);
      setPage(1);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load departments');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadDepartments();
  }, []);

  const filtered = useMemo(
    () => rows.filter((department) => department.name.toLowerCase().includes(q.toLowerCase()) || department.id.toLowerCase().includes(q.toLowerCase())),
    [rows, q],
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  const openAdd = () => {
    setForm(empty);
    setModal({ mode: 'add', data: null });
  };

  const openEdit = (department: DepartmentRow) => {
    setForm({ name: department.name });
    setModal({ mode: 'edit', data: department });
  };

  const openView = async (department: DepartmentRow) => {
    try {
      const detailed = await departmentApi.getById(department.id);
      setSelectedDepartment(detailed);
      setModal({ mode: 'view', data: detailed });
    } catch (err) {
      toast(err instanceof Error ? err.message : 'Failed to load department', 'error');
    }
  };

  const save = async () => {
    if (!form.name.trim()) { toast('Department name is required', 'error'); return; }

    const payload = { name: form.name.trim() };

    try {
      setSaving(true);

      if (modal?.mode === 'add') {
        await departmentApi.create(payload);
        toast('Department added successfully');
      } else if (modal?.mode === 'edit' && modal.data) {
        await departmentApi.update(modal.data.id, payload);
        toast('Department updated successfully');
      }

      setModal(null);
      await loadDepartments();
    } catch (err) {
      toast(err instanceof Error ? err.message : 'Failed to save department', 'error');
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    if (!delId) {
      return;
    }

    try {
      await departmentApi.remove(delId);
      toast('Department deleted successfully');
      setDelId(null);
      await loadDepartments();
    } catch (err) {
      toast(err instanceof Error ? err.message : 'Failed to delete department', 'error');
    }
  };

  const columns: Column<DepartmentRow>[] = [
    {
      key: 'name',
      label: 'Department',
      render: (department) => (
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-card">
            <Building2 className="h-5 w-5" />
          </span>
          <div>
            <div className="font-semibold text-ink-900 dark:text-white">{department.name}</div>
            <div className="text-xs text-ink-400">ID {department.id}</div>
          </div>
        </div>
      ),
    },
    { key: 'studentCount', label: 'Students' },
    { key: 'teacherCount', label: 'Teachers' },
    {
      key: 'actions',
      label: 'Actions',
      render: (department) => (
        <div className="flex gap-1">
          <button onClick={() => void openView(department)} className="btn-ghost p-1.5 rounded-lg" title="View"><Search className="h-4 w-4" /></button>
          <button onClick={() => openEdit(department)} className="btn-ghost p-1.5 rounded-lg" title="Edit"><Pencil className="h-4 w-4" /></button>
          <button onClick={() => setDelId(department.id)} className="btn-ghost p-1.5 rounded-lg text-rose-600" title="Delete"><Trash2 className="h-4 w-4" /></button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Departments"
        subtitle={loading ? 'Loading departments...' : `${filtered.length} academic departments`}
        action={(
          <div className="flex gap-2">
            <button onClick={() => void loadDepartments()} className="btn-secondary">
              <RefreshCw className="h-4 w-4" /> Refresh
            </button>
            <button onClick={openAdd} className="btn-primary"><Plus className="h-4 w-4" /> Add Department</button>
          </div>
        )}
      />

      <div className="mb-4 flex items-center gap-3 flex-wrap">
        <div className="relative w-fit">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
          <input value={q} onChange={(e) => { setQ(e.target.value); setPage(1); }} placeholder="Search departments..." className="input !py-2 pl-9 !w-64" />
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-ink-500">Rows per page</label>
          <select value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }} className="input !py-2 !w-28">
            {[5, 8, 10, 20].map((size) => <option key={size} value={size}>{size}</option>)}
          </select>
        </div>
      </div>

      {error ? <div className="card p-4 mb-4 text-rose-600">{error}</div> : null}

      <DataTable columns={columns} rows={paged} loading={loading} empty="No departments found." />
      <Pagination page={page} total={totalPages} onChange={setPage} />

      <Modal open={!!modal && modal.mode !== 'view'} onClose={() => setModal(null)} title={modal?.mode === 'add' ? 'Add Department' : 'Edit Department'}>
        <div className="space-y-4">
          <div>
            <label className="label">Department Name</label>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input" />
          </div>
          <div className="rounded-xl bg-ink-50 p-3 text-sm text-ink-500 dark:bg-ink-800/50 dark:text-ink-300">
            Backend validation requires a non-empty department name.
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <button className="btn-secondary" onClick={() => setModal(null)}>Cancel</button>
          <button className="btn-primary" onClick={() => void save()} disabled={saving}>{saving ? 'Saving...' : modal?.mode === 'add' ? 'Add' : 'Save'}</button>
        </div>
      </Modal>

      <Modal open={!!modal && modal.mode === 'view'} onClose={() => setModal(null)} title="Department Details">
        {selectedDepartment && (
          <div>
            <h3 className="font-display text-xl font-bold text-ink-900 dark:text-white">{selectedDepartment.name}</h3>
            <p className="mt-2 text-sm text-ink-500">ID {selectedDepartment.id}</p>
            <div className="grid grid-cols-2 gap-3 mt-6 text-left">
              {[
                ['Students', selectedDepartment.studentCount.toString()],
                ['Teachers', selectedDepartment.teacherCount.toString()],
              ].map(([label, value]) => (
                <div key={label} className="bg-ink-50 dark:bg-ink-800/50 rounded-xl p-3">
                  <div className="text-xs text-ink-400">{label}</div>
                  <div className="text-sm font-medium text-ink-800 dark:text-ink-100">{value}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal>

      <ConfirmDialog open={!!delId} onClose={() => setDelId(null)} onConfirm={confirmDelete} message="Delete this department?" />
    </div>
  );
}
