import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { PageHeader } from '../../components/erp/PageHeader';
import { toast } from '../../components/ui/Toast';
import { Sun, Moon, Globe, Bell, Shield, Palette } from 'lucide-react';

export default function Settings() {
  const { theme, setTheme } = useTheme();
  const [language, setLanguage] = useState('English');
  const [notif, setNotif] = useState({ email: true, push: true, sms: false, weekly: true });

  const Toggle = ({ on, onChange }: { on: boolean; onChange: () => void }) => (
    <button onClick={onChange} className={`relative h-6 w-11 rounded-full transition ${on ? 'bg-brand-600' : 'bg-ink-300 dark:bg-ink-700'}`}>
      <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition ${on ? 'left-5' : 'left-0.5'}`} />
    </button>
  );

  return (
    <div>
      <PageHeader title="Settings" subtitle="Customize your ERP experience" />

      <div className="grid lg:grid-cols-2 gap-5">
        {/* Theme */}
        <div className="card p-6">
          <div className="flex items-center gap-2 mb-4">
            <Palette className="h-5 w-5 text-brand-500" />
            <h3 className="font-display font-bold text-ink-900 dark:text-white">Appearance</h3>
          </div>
          <p className="text-sm text-ink-500 mb-4">Choose your preferred theme.</p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { id: 'light', label: 'Light', icon: Sun },
              { id: 'dark', label: 'Dark', icon: Moon },
            ].map((t) => (
              <button key={t.id} onClick={() => setTheme(t.id as 'light' | 'dark')} className={`p-4 rounded-xl border text-center transition ${theme === t.id ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/30 ring-2 ring-brand-500/30' : 'border-ink-200 dark:border-ink-700 hover:border-brand-300'}`}>
                <t.icon className={`mx-auto h-6 w-6 ${theme === t.id ? 'text-brand-600' : 'text-ink-500'}`} />
                <div className={`mt-2 text-sm font-semibold ${theme === t.id ? 'text-brand-700 dark:text-brand-300' : 'text-ink-700 dark:text-ink-200'}`}>{t.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Language */}
        <div className="card p-6">
          <div className="flex items-center gap-2 mb-4">
            <Globe className="h-5 w-5 text-brand-500" />
            <h3 className="font-display font-bold text-ink-900 dark:text-white">Language</h3>
          </div>
          <p className="text-sm text-ink-500 mb-4">Select your preferred language.</p>
          <select value={language} onChange={(e) => { setLanguage(e.target.value); toast('Language updated'); }} className="input">
            {['English', 'Hindi', 'Spanish', 'French', 'Arabic'].map((l) => <option key={l}>{l}</option>)}
          </select>
        </div>

        {/* Notifications */}
        <div className="card p-6 lg:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="h-5 w-5 text-brand-500" />
            <h3 className="font-display font-bold text-ink-900 dark:text-white">Notifications</h3>
          </div>
          <div className="space-y-4">
            {[
              { key: 'email', label: 'Email Notifications', desc: 'Receive updates via email' },
              { key: 'push', label: 'Push Notifications', desc: 'Real-time browser notifications' },
              { key: 'sms', label: 'SMS Notifications', desc: 'Critical alerts via SMS' },
              { key: 'weekly', label: 'Weekly Digest', desc: 'Summary of the week every Monday' },
            ].map((n) => (
              <div key={n.key} className="flex items-center justify-between p-3 rounded-xl bg-ink-50 dark:bg-ink-800/50">
                <div>
                  <div className="text-sm font-semibold text-ink-800 dark:text-ink-100">{n.label}</div>
                  <div className="text-xs text-ink-500">{n.desc}</div>
                </div>
                <Toggle on={notif[n.key as keyof typeof notif]} onChange={() => setNotif({ ...notif, [n.key]: !notif[n.key as keyof typeof notif] })} />
              </div>
            ))}
          </div>
        </div>

        {/* Security */}
        <div className="card p-6 lg:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="h-5 w-5 text-brand-500" />
            <h3 className="font-display font-bold text-ink-900 dark:text-white">Security</h3>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-ink-50 dark:bg-ink-800/50">
              <div className="text-sm font-semibold text-ink-800 dark:text-ink-100">Two-Factor Authentication</div>
              <div className="text-xs text-ink-500 mt-1">Add an extra layer of security to your account.</div>
              <button onClick={() => toast('2FA enabled')} className="btn-secondary mt-3 text-xs !py-1.5">Enable 2FA</button>
            </div>
            <div className="p-4 rounded-xl bg-ink-50 dark:bg-ink-800/50">
              <div className="text-sm font-semibold text-ink-800 dark:text-ink-100">Active Sessions</div>
              <div className="text-xs text-ink-500 mt-1">Manage devices logged into your account.</div>
              <button onClick={() => toast('Sessions cleared')} className="btn-secondary mt-3 text-xs !py-1.5">Sign out all devices</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
