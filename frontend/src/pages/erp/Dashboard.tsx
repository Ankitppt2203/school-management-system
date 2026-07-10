import { motion } from 'framer-motion';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { Icon } from '../../components/ui/Icon';
import { stagger, fadeUp } from '../../components/ui/Motion';
import { dashboardStats, enrollmentTrend, attendanceWeek, departmentDistribution, recentActivities, notifications } from '../../data/mock';
import { Bell, TrendingUp } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Stat cards */}
      <motion.div variants={stagger} initial="hidden" animate="show" className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {dashboardStats.map((s) => (
          <motion.div key={s.label} variants={fadeUp} whileHover={{ y: -4 }} className="card p-5">
            <div className="flex items-center justify-between">
              <span className={`grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br ${s.color} text-white shadow-card`}>
                <Icon name={s.icon} className="h-5 w-5" />
              </span>
              <span className="chip bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 text-xs">
                <TrendingUp className="h-3 w-3" /> {s.trend}
              </span>
            </div>
            <div className="mt-3 font-display text-2xl font-bold text-ink-900 dark:text-white">{s.value.toLocaleString()}</div>
            <div className="text-sm text-ink-500">{s.label}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts */}
      <div className="grid lg:grid-cols-3 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-bold text-ink-900 dark:text-white">Enrollment Trend</h3>
            <span className="chip bg-brand-100 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300 text-xs">Last 6 months</span>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={enrollmentTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:opacity-20" />
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0' }} />
              <Legend />
              <Line type="monotone" dataKey="students" stroke="#2563eb" strokeWidth={3} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="teachers" stroke="#f97316" strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card p-5">
          <h3 className="font-display font-bold text-ink-900 dark:text-white mb-4">Department Distribution</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={departmentDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={55} outerRadius={90} paddingAngle={3}>
                {departmentDistribution.map((d) => <Cell key={d.name} fill={d.color} />)}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0' }} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card p-5 lg:col-span-2">
          <h3 className="font-display font-bold text-ink-900 dark:text-white mb-4">Weekly Attendance</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={attendanceWeek}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:opacity-20" />
              <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0' }} />
              <Legend />
              <Bar dataKey="present" stackId="a" fill="#2563eb" radius={[0, 0, 0, 0]} />
              <Bar dataKey="absent" stackId="a" fill="#f43f5e" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Notifications */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card p-5">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="h-5 w-5 text-brand-500" />
            <h3 className="font-display font-bold text-ink-900 dark:text-white">Notifications</h3>
          </div>
          <div className="space-y-3">
            {notifications.map((n, i) => (
              <div key={i} className="flex gap-3 p-3 rounded-xl bg-ink-50 dark:bg-ink-800/50">
                <span className={`mt-1.5 h-2 w-2 rounded-full shrink-0 ${n.type === 'warning' ? 'bg-amber-500' : n.type === 'success' ? 'bg-emerald-500' : n.type === 'reminder' ? 'bg-brand-500' : 'bg-sky-500'}`} />
                <div>
                  <p className="text-sm font-medium text-ink-800 dark:text-ink-100">{n.title}</p>
                  <p className="text-xs text-ink-400">{n.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent activities */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card p-5">
        <h3 className="font-display font-bold text-ink-900 dark:text-white mb-4">Recent Activities</h3>
        <div className="space-y-3">
          {recentActivities.map((a, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }} className="flex items-center gap-3 p-3 rounded-xl hover:bg-ink-50 dark:hover:bg-ink-800/50">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-100 text-brand-600 dark:bg-brand-900/40 dark:text-brand-300">
                <Icon name={a.icon} className="h-4 w-4" />
              </span>
              <p className="text-sm text-ink-700 dark:text-ink-200 flex-1">{a.text}</p>
              <span className="text-xs text-ink-400 shrink-0">{a.time}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
