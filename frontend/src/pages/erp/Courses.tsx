import { useEffect, useMemo, useState } from 'react';
import { Column, DataTable, Pagination } from '../../components/erp/DataTable';
import { PageHeader } from '../../components/erp/PageHeader';
import { Modal } from '../../components/ui/Modal';
import { ConfirmDialog, toast } from '../../components/ui/Toast';
import { courseApi } from '../../services';
import type { CourseFormValues, CourseRow } from '../../types/course';
import { Plus, Pencil, Trash2, Eye, Search, RefreshCw } from 'lucide-react';

const empty: CourseFormValues = { name: '' };

export default function Courses() {
  const [rows, setRows] = useState<CourseRow[]>([]);
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [modal, setModal] = useState<{ mode: 'add' | 'edit' | 'view'; data: CourseRow | null } | null>(null);
  const [form, setForm] = useState<CourseFormValues>(empty);
  const [delId, setDelId] = useState<string | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<CourseRow | null>(null);

  const loadCourses = async () => {
    try {
      setLoading(true);
      setError('');

      const courseRows = await courseApi.listAll();
      setRows(courseRows);
      setPage(1);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadCourses();
  }, []);

  const filtered = useMemo(() => rows.filter((course) => course.name.toLowerCase().includes(q.toLowerCase()) || course.id.toLowerCase().includes(q.toLowerCase())), [rows, q]);
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));

  const openAdd = () => {
    setForm(empty);
    setModal({ mode: 'add', data: null });
  };

  const openEdit = (course: CourseRow) => {
    setForm({ name: course.name });
    setModal({ mode: 'edit', data: course });
  };

  const openView = async (course: CourseRow) => {
    try {
      const detailed = await courseApi.getById(course.id);
      setSelectedCourse(detailed);
      setModal({ mode: 'view', data: detailed });
    } catch (err) {
      toast(err instanceof Error ? err.message : 'Failed to load course', 'error');
    }
  };

  const save = async () => {
    if (!form.name.trim()) { toast('Course name is required', 'error'); return; }

    const payload = { name: form.name.trim() };

    try {
      setSaving(true);

      if (modal?.mode === 'add') {
        await courseApi.create(payload);
        toast('Course added successfully');
      } else if (modal?.mode === 'edit' && modal.data) {
        await courseApi.update(modal.data.id, payload);
        toast('Course updated successfully');
      }

      setModal(null);
      await loadCourses();
    } catch (err) {
      toast(err instanceof Error ? err.message : 'Failed to save course', 'error');
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    if (!delId) {
      return;
    }

    try {
      await courseApi.remove(delId);
      toast('Course deleted successfully');
      setDelId(null);
      await loadCourses();
    } catch (err) {
      toast(err instanceof Error ? err.message : 'Failed to delete course', 'error');
    }
  };

  const columns: Column<CourseRow>[] = [
    { key: 'name', label: 'Course', render: (course) => <div><div className="font-semibold text-ink-900 dark:text-white">{course.name}</div><div className="text-xs text-ink-400">ID {course.id}</div></div> },
    {
      key: 'actions',
      label: 'Actions',
      render: (course) => (
      <div className="flex gap-1">
        <button onClick={() => void openView(course)} className="btn-ghost p-1.5 rounded-lg" title="View"><Eye className="h-4 w-4" /></button>
        <button onClick={() => openEdit(course)} className="btn-ghost p-1.5 rounded-lg" title="Edit"><Pencil className="h-4 w-4" /></button>
        <button onClick={() => setDelId(course.id)} className="btn-ghost p-1.5 rounded-lg text-rose-600" title="Delete"><Trash2 className="h-4 w-4" /></button>
      </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Courses"
        subtitle={loading ? 'Loading courses...' : `${filtered.length} courses offered`}
        action={(
          <div className="flex gap-2">
            <button onClick={() => void loadCourses()} className="btn-secondary">
              <RefreshCw className="h-4 w-4" /> Refresh
            </button>
            <button onClick={openAdd} className="btn-primary"><Plus className="h-4 w-4" /> Add Course</button>
          </div>
        )}
      />
      <div className="mb-4 relative w-fit">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
        <input value={q} onChange={(e) => { setQ(e.target.value); setPage(1); }} placeholder="Search courses..." className="input !py-2 pl-9 !w-64" />
      </div>
      <div className="mb-4 flex items-center gap-2">
        <label className="text-sm font-medium text-ink-500">Rows per page</label>
        <select value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }} className="input !py-2 !w-28">
          {[5, 8, 10, 20].map((size) => <option key={size} value={size}>{size}</option>)}
        </select>
      </div>

      {error ? <div className="card p-4 mb-4 text-rose-600">{error}</div> : null}

      <DataTable columns={columns} rows={paged} loading={loading} empty="No courses found." />
      <Pagination page={page} total={totalPages} onChange={setPage} />

      <Modal open={!!modal && modal.mode !== 'view'} onClose={() => setModal(null)} title={modal?.mode === 'add' ? 'Add Course' : 'Edit Course'}>
        <div className="space-y-4">
          <div><label className="label">Course Name</label><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input" /></div>
          <div className="rounded-xl bg-ink-50 p-3 text-sm text-ink-500 dark:bg-ink-800/50 dark:text-ink-300">Backend validation requires a non-empty course name.</div>
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <button className="btn-secondary" onClick={() => setModal(null)}>Cancel</button>
          <button className="btn-primary" onClick={() => void save()} disabled={saving}>{saving ? 'Saving...' : modal?.mode === 'add' ? 'Add' : 'Save'}</button>
        </div>
      </Modal>

      <Modal open={!!modal && modal.mode === 'view'} onClose={() => setModal(null)} title="Course Details">
        {selectedCourse && (
          <div>
            <h3 className="font-display text-xl font-bold text-ink-900 dark:text-white">{selectedCourse.name}</h3>
            <p className="mt-2 text-sm text-ink-500">ID {selectedCourse.id}</p>
            <div className="mt-4 rounded-xl bg-ink-50 p-3 text-sm text-ink-500 dark:bg-ink-800/50 dark:text-ink-300">
              Related students are not returned by the backend JSON because of the course back-reference mapping.
            </div>
          </div>
        )}
      </Modal>

      <ConfirmDialog open={!!delId} onClose={() => setDelId(null)} onConfirm={confirmDelete} message="Delete this course?" />
    </div>
  );
}
