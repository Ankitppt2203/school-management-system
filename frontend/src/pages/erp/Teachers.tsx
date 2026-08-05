import { useEffect, useMemo, useState } from 'react';
import { Column, DataTable, Pagination } from '../../components/erp/DataTable';
import { PageHeader } from '../../components/erp/PageHeader';
import { Modal } from '../../components/ui/Modal';
import { ConfirmDialog, toast } from '../../components/ui/Toast';
import { teacherApi } from '../../services';
import type { DepartmentOption, TeacherFormValues, TeacherRow } from '../../types/teacher';
import { Plus, Pencil, Trash2, Eye, Search, RefreshCw } from 'lucide-react';

const empty: TeacherFormValues = {
  name: '',
  subject: '',
  salary: '',
  departmentId: '',
  username: '',
  password: '',
  profileDetails: {},
};

export default function Teachers() {
  const [rows, setRows] = useState<TeacherRow[]>([]);
  const [departments, setDepartments] = useState<DepartmentOption[]>([]);
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [modal, setModal] = useState<{ mode: 'add' | 'edit' | 'view'; data: TeacherRow | null } | null>(null);
  const [form, setForm] = useState<TeacherFormValues>(empty);
  const [delId, setDelId] = useState<string | null>(null);
  const loadTeachers = async () => {
    try {
      setLoading(true);
      setError('');

      const [teacherRows, departmentOptions] = await Promise.all([
        teacherApi.listAll(),
        departments.length ? Promise.resolve(departments) : teacherApi.listDepartments(),
      ]);

      setRows(teacherRows);
      setDepartments(departmentOptions);
      setPage(1);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load teachers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadTeachers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = useMemo(
    () => rows.filter((teacher) => teacher.name.toLowerCase().includes(q.toLowerCase()) || teacher.subject.toLowerCase().includes(q.toLowerCase()) || teacher.id.toLowerCase().includes(q.toLowerCase())),
    [rows, q],
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  const openAdd = () => {
    setForm(empty);
    setModal({ mode: 'add', data: null });
  };

  const openEdit = async (teacher: TeacherRow) => {
    setForm({
      name: teacher.name,
      subject: teacher.subject,
      salary: teacher.salary.toString(),
      departmentId: teacher.departmentId,
      username: '',
      password: '',
      profileDetails: teacher.profileDetails ?? {},
    });
    setModal({ mode: 'edit', data: teacher });
  };

  const openView = (teacher: TeacherRow) => setModal({ mode: 'view', data: teacher });

  const save = async () => {
    if (!form.name.trim() || !form.subject.trim() || !form.salary.trim() || !form.departmentId.trim()) {
      toast('Name, subject, salary, and department are required', 'error');
      return;
    }

    const payload = {
      name: form.name.trim(),
      subject: form.subject.trim(),
      salary: Number(form.salary),
      departmentId: Number(form.departmentId),
      username: form.username.trim() || undefined,
      password: form.password || undefined,
      profileDetails: form.profileDetails,
    };

    if (!Number.isFinite(payload.salary) || payload.salary <= 0) {
      toast('Salary must be greater than 0', 'error');
      return;
    }

    if (!Number.isFinite(payload.departmentId) || payload.departmentId <= 0) {
      toast('Select a valid department', 'error');
      return;
    }
    if (modal?.mode === 'add' && (!payload.username || !payload.password)) {
      toast('Login username and password are required for a new teacher', 'error');
      return;
    }
    if (payload.password && payload.password.length < 6) {
      toast('Password must contain at least 6 characters', 'error');
      return;
    }

    try {
      setSaving(true);

      if (modal?.mode === 'add') {
        await teacherApi.create(payload);
        toast('Teacher added successfully');
      } else if (modal?.mode === 'edit' && modal.data) {
        await teacherApi.update(modal.data.id, payload);
        toast('Teacher updated successfully');
      }

      setModal(null);
      await loadTeachers();
    } catch (err) {
      toast(err instanceof Error ? err.message : 'Failed to save teacher', 'error');
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    if (!delId) {
      return;
    }

    try {
      await teacherApi.remove(delId);
      toast('Teacher deleted');
      setDelId(null);
      await loadTeachers();
    } catch (err) {
      toast(err instanceof Error ? err.message : 'Failed to delete teacher', 'error');
    }
  };

  const columns: Column<TeacherRow>[] = [
    {
      key: 'name',
      label: 'Teacher',
      render: (teacher) => (
        <div>
          <div className="font-semibold text-ink-900 dark:text-white">{teacher.name}</div>
          <div className="text-xs text-ink-400">ID {teacher.id}</div>
        </div>
      ),
    },
    { key: 'subject', label: 'Subject' },
    { key: 'salary', label: 'Salary', render: (teacher) => teacher.salary.toLocaleString() },
    { key: 'departmentName', label: 'Department' },
    {
      key: 'actions',
      label: 'Actions',
      render: (teacher) => (
        <div className="flex gap-1">
          <button onClick={() => openView(teacher)} className="btn-ghost p-1.5 rounded-lg" title="View"><Eye className="h-4 w-4" /></button>
          <button onClick={() => void openEdit(teacher)} className="btn-ghost p-1.5 rounded-lg" title="Edit"><Pencil className="h-4 w-4" /></button>
          <button onClick={() => setDelId(teacher.id)} className="btn-ghost p-1.5 rounded-lg text-rose-600" title="Delete"><Trash2 className="h-4 w-4" /></button>
        </div>
      ),
    },
  ];

  const selectedDepartmentLabel = (departmentId: string) => departments.find((department) => department.id.toString() === departmentId)?.name ?? 'Select a department';
  const selectProfilePhoto = (file?: File) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) { toast('Please select an image file', 'error'); return; }
    if (file.size > 300 * 1024) { toast('Profile photo must be 300 KB or smaller', 'error'); return; }
    const reader = new FileReader();
    reader.onload = () => setForm((current) => ({ ...current, profileDetails: { ...current.profileDetails, profilePhotoUrl: String(reader.result) } }));
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <PageHeader
        title="Teachers"
        subtitle={loading ? 'Loading teachers...' : `${filtered.length} faculty members`}
        action={(
          <div className="flex gap-2">
            <button onClick={() => void loadTeachers()} className="btn-secondary">
              <RefreshCw className="h-4 w-4" /> Refresh
            </button>
            <button onClick={openAdd} className="btn-primary"><Plus className="h-4 w-4" /> Add Teacher</button>
          </div>
        )}
      />

      <div className="mb-4 relative w-fit">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
        <input value={q} onChange={(e) => { setQ(e.target.value); setPage(1); }} placeholder="Search teachers..." className="input !py-2 pl-9 !w-64" />
      </div>

      <div className="mb-4 flex items-center gap-2">
        <label className="text-sm font-medium text-ink-500">Rows per page</label>
        <select value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }} className="input !py-2 !w-28">
          {[5, 8, 10, 20].map((size) => <option key={size} value={size}>{size}</option>)}
        </select>
      </div>

      {error ? <div className="card p-4 mb-4 text-rose-600">{error}</div> : null}

      <DataTable columns={columns} rows={paged} loading={loading} empty="No teachers found." />
      <Pagination page={page} total={totalPages} onChange={setPage} />

      <Modal open={!!modal && modal.mode !== 'view'} onClose={() => setModal(null)} title={modal?.mode === 'add' ? 'Add Teacher' : 'Edit Teacher'} size="lg">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Full Name</label>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input" />
          </div>
          <div>
            <label className="label">Subject</label>
            <input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="input" />
          </div>
          <div>
            <label className="label">Salary</label>
            <input type="number" min="1" step="0.01" value={form.salary} onChange={(e) => setForm({ ...form, salary: e.target.value })} className="input" />
          </div>
          <div>
            <label className="label">Department</label>
            <select value={form.departmentId} onChange={(e) => setForm({ ...form, departmentId: e.target.value })} className="input">
              <option value="">Select a department</option>
              {departments.map((department) => <option key={department.id} value={department.id}>{department.name}</option>)}
            </select>
          </div>
          {modal?.mode === 'add' && <>
            <div>
              <label className="label">Login Username</label>
              <input required value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} className="input" placeholder="teacher.username" />
            </div>
            <div>
              <label className="label">Account Password</label>
              <input required type="password" minLength={6} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="input" placeholder="At least 6 characters" />
            </div>
          </>}
          <TeacherProfileFields details={form.profileDetails} onChange={(key, value) => setForm({ ...form, profileDetails: { ...form.profileDetails, [key]: value } })} />
          <div className="sm:col-span-2"><label className="label">Profile Photo</label><input type="file" accept="image/*" onChange={(event) => selectProfilePhoto(event.target.files?.[0])} className="input" />{form.profileDetails.profilePhotoUrl && <img src={form.profileDetails.profilePhotoUrl} alt="Profile preview" className="mt-3 h-20 w-20 rounded-xl object-cover" />}</div>
          <div className="sm:col-span-2 rounded-xl bg-ink-50 p-3 text-sm text-ink-500 dark:bg-ink-800/50 dark:text-ink-300">
            Selected department: {selectedDepartmentLabel(form.departmentId)}
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <button className="btn-secondary" onClick={() => setModal(null)}>Cancel</button>
          <button className="btn-primary" onClick={() => void save()} disabled={saving}>{saving ? 'Saving...' : modal?.mode === 'add' ? 'Add Teacher' : 'Save Changes'}</button>
        </div>
      </Modal>

      <Modal open={!!modal && modal.mode === 'view'} onClose={() => setModal(null)} title="Teacher Profile">
        {modal?.data && (
          <div className="text-center">
            <img src={modal.data.profileDetails?.profilePhotoUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(modal.data.name)}`} alt="Teacher profile" className="mx-auto h-24 w-24 rounded-2xl object-cover" />
            <h3 className="mt-4 font-display text-xl font-bold text-ink-900 dark:text-white">{modal.data.name}</h3>
            <p className="text-sm text-brand-600">{modal.data.subject} • {modal.data.departmentName}</p>
            <div className="grid grid-cols-2 gap-3 mt-6 text-left">
              {[
                ['Subject', modal.data.subject], ['Salary', modal.data.salary.toLocaleString()],
                ['ID', modal.data.id], ['Department', modal.data.departmentName],
              ].map(([l, v]) => (
                <div key={l} className="bg-ink-50 dark:bg-ink-800/50 rounded-xl p-3">
                  <div className="text-xs text-ink-400">{l}</div>
                  <div className="text-sm font-medium text-ink-800 dark:text-ink-100">{v}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-left">{Object.entries(modal.data.profileDetails ?? {}).map(([key, value]) => <div key={key} className="rounded-xl bg-ink-50 p-3"><div className="text-xs text-ink-400">{key.replace(/([A-Z])/g, ' $1')}</div><div className="text-sm font-medium">{value}</div></div>)}</div>
          </div>
        )}
      </Modal>

      <ConfirmDialog open={!!delId} onClose={() => setDelId(null)} onConfirm={confirmDelete} message="Delete this teacher record?" />
    </div>
  );
}

function TeacherProfileFields({ details, onChange }: { details: Record<string, string>; onChange: (key: string, value: string) => void }) {
  const sections = [
    {
      title: 'Personal information',
      fields: [
        ['employeeId', 'Employee ID'], ['dateOfBirth', 'Date of Birth', 'date'], ['gender', 'Gender'],
        ['maritalStatus', 'Marital Status'], ['nationality', 'Nationality'], ['bloodGroup', 'Blood Group'],
        ['profilePhotoUrl', 'Profile Photo URL'],
      ],
    },
    {
      title: 'Contact & address',
      fields: [
        ['phoneNumber', 'Phone Number', 'tel'], ['alternatePhoneNumber', 'Alternate Phone Number', 'tel'],
        ['emailAddress', 'Email Address', 'email'], ['addressLine1', 'Address Line 1'],
        ['addressLine2', 'Address Line 2'], ['city', 'City'], ['state', 'State'],
        ['country', 'Country'], ['pinCode', 'PIN Code'],
      ],
    },
    {
      title: 'Employment & teaching',
      fields: [
        ['dateOfJoining', 'Date of Joining', 'date'], ['employmentType', 'Employment Type'],
        ['employmentStatus', 'Employment Status'], ['designation', 'Designation'],
        ['staffCategory', 'Staff Category'], ['workLocation', 'Work Location'],
        ['yearsOfExperience', 'Years of Experience', 'number'], ['previousEmployer', 'Previous Employer'],
        ['subjectsTaught', 'Subjects Taught'], ['classesAssigned', 'Classes Assigned'],
        ['classTeacherOf', 'Class Teacher Of'], ['employeeCode', 'Employee Code'],
      ],
    },
    {
      title: 'Qualifications & documents',
      fields: [
        ['qualification', 'Highest Qualification'], ['specialization', 'Specialization'],
        ['university', 'University / Board'], ['yearOfPassing', 'Year of Passing', 'number'],
        ['certifications', 'Certifications'], ['panNumber', 'PAN Number'], ['aadhaarNumber', 'Aadhaar Number'],
        ['bankName', 'Bank Name'], ['bankAccountNumber', 'Bank Account Number'], ['ifscCode', 'IFSC Code'],
      ],
    },
    {
      title: 'Emergency & additional details',
      fields: [
        ['emergencyContactName', 'Emergency Contact Name'], ['emergencyContactRelationship', 'Relationship'],
        ['emergencyContactPhone', 'Emergency Contact Phone', 'tel'], ['medicalConditions', 'Medical Conditions'],
        ['allergies', 'Allergies'], ['transportRequired', 'School Transport Required'],
      ],
    },
  ] as const;

  return <div className="sm:col-span-2 space-y-5">{sections.map((section) => <fieldset key={section.title} className="rounded-xl border p-4"><legend className="px-2 font-medium">{section.title}</legend><div className="grid gap-4 sm:grid-cols-2">{section.fields.map(([key, label, type]) => <div key={key}><label className="label">{label}</label><input type={type ?? 'text'} value={details[key] ?? ''} onChange={(event) => onChange(key, event.target.value)} className="input" /></div>)}</div></fieldset>)}</div>;
}
