import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { PageHeader } from '../../components/erp/PageHeader';
import { toast } from '../../components/ui/Toast';
import { Camera, Mail, Phone, Briefcase, Shield, Lock, Eye, EyeOff } from 'lucide-react';
import { authApi, type AccountProfile } from '../../services';

export default function Profile() {
  const { user } = useAuth();
  const [tab, setTab] = useState<'profile' | 'password'>('profile');
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '', phone: user?.phone || '', designation: user?.designation || '' });
  const [pwd, setPwd] = useState({ current: '', next: '', confirm: '' });
  const [changingPassword, setChangingPassword] = useState(false);
  const [showPasswords, setShowPasswords] = useState({ current: false, next: false, confirm: false });
  const [accountProfile, setAccountProfile] = useState<AccountProfile | null>(null);

  useEffect(() => { void authApi.me().then(setAccountProfile).catch(() => undefined); }, []);

  const saveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast('Profile updated successfully');
  };

  const savePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pwd.current) { toast('Enter your current password', 'error'); return; }
    if (pwd.next !== pwd.confirm) { toast('Passwords do not match', 'error'); return; }
    if (pwd.next.length < 6) { toast('Password must be at least 6 characters', 'error'); return; }
    try {
      setChangingPassword(true);
      await authApi.changePassword({
        currentPassword: pwd.current,
        newPassword: pwd.next,
        confirmPassword: pwd.confirm,
      });
      setPwd({ current: '', next: '', confirm: '' });
      toast('Password changed successfully');
    } catch (error: any) {
      toast(error.response?.data?.message || 'Unable to change password', 'error');
    } finally {
      setChangingPassword(false);
    }
  };

  return (
    <div>
      <PageHeader title="Profile" subtitle="Manage your account information and security" />

      <div className="grid lg:grid-cols-3 gap-5">
        {/* Profile card */}
        <div className="card p-6 text-center">
          <div className="relative w-fit mx-auto">
            <img src={accountProfile?.profilePhotoUrl || user?.avatar} alt={accountProfile?.name || user?.name} className="h-28 w-28 rounded-2xl mx-auto object-cover" />
            <button className="absolute bottom-1 right-1 grid h-8 w-8 place-items-center rounded-lg bg-brand-600 text-white"><Camera className="h-4 w-4" /></button>
          </div>
          <h3 className="mt-4 font-display text-xl font-bold text-ink-900 dark:text-white">{accountProfile?.name || user?.name}</h3>
          <span className="chip bg-brand-100 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300 capitalize mt-2">{user?.role}</span>
          <div className="mt-5 space-y-2 text-sm text-left">
            <p className="flex items-center gap-2 text-ink-600 dark:text-ink-300"><Mail className="h-4 w-4 text-brand-500" /> {user?.email}</p>
            <p className="flex items-center gap-2 text-ink-600 dark:text-ink-300"><Shield className="h-4 w-4 text-brand-500" /> Username: {accountProfile?.username || user?.id}</p>
            <p className="flex items-center gap-2 text-ink-600 dark:text-ink-300"><Phone className="h-4 w-4 text-brand-500" /> {user?.phone}</p>
            <p className="flex items-center gap-2 text-ink-600 dark:text-ink-300"><Briefcase className="h-4 w-4 text-brand-500" /> {user?.designation}</p>
          </div>
        </div>

        {/* Edit form */}
        <div className="card p-6 lg:col-span-2">
          <div className="flex gap-2 mb-5 border-b border-ink-100 dark:border-ink-800">
            {[
              { id: 'profile', label: 'Edit Profile', icon: Shield },
              { id: 'password', label: 'Change Password', icon: Lock },
            ].map((t) => (
              <button key={t.id} onClick={() => setTab(t.id as 'profile' | 'password')} className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition ${tab === t.id ? 'border-brand-600 text-brand-600' : 'border-transparent text-ink-500 hover:text-ink-700'}`}>
                <t.icon className="h-4 w-4" /> {t.label}
              </button>
            ))}
          </div>

          {tab === 'profile' ? (
            <form onSubmit={saveProfile} className="grid sm:grid-cols-2 gap-4">
              <div><label className="label">Full Name</label><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input" /></div>
              <div><label className="label">Email</label><input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input" /></div>
              <div><label className="label">Phone</label><input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="input" /></div>
              <div><label className="label">Designation</label><input value={form.designation} onChange={(e) => setForm({ ...form, designation: e.target.value })} className="input" /></div>
              <div className="sm:col-span-2 flex justify-end"><button className="btn-primary" type="submit">Save Changes</button></div>
            </form>
          ) : (
            <form onSubmit={savePassword} className="space-y-4 max-w-md">
              <PasswordInput label="Current Password" value={pwd.current} visible={showPasswords.current} onChange={(value) => setPwd({ ...pwd, current: value })} onToggle={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })} />
              <PasswordInput label="New Password" value={pwd.next} visible={showPasswords.next} onChange={(value) => setPwd({ ...pwd, next: value })} onToggle={() => setShowPasswords({ ...showPasswords, next: !showPasswords.next })} />
              <PasswordInput label="Confirm New Password" value={pwd.confirm} visible={showPasswords.confirm} onChange={(value) => setPwd({ ...pwd, confirm: value })} onToggle={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })} />
              <div className="flex justify-end"><button disabled={changingPassword} className="btn-primary disabled:cursor-not-allowed disabled:opacity-60" type="submit">{changingPassword ? 'Updating...' : 'Update Password'}</button></div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

function PasswordInput({ label, value, visible, onChange, onToggle }: { label: string; value: string; visible: boolean; onChange: (value: string) => void; onToggle: () => void }) {
  return <div><label className="label">{label}</label><div className="relative"><input required type={visible ? 'text' : 'password'} value={value} onChange={(e) => onChange(e.target.value)} className="input pr-10" /><button type="button" aria-label={visible ? `Hide ${label}` : `Show ${label}`} onClick={onToggle} className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-600">{visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button></div></div>;
}
