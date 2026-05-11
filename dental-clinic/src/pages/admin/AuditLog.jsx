import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSearch } from 'react-icons/fi';
import { FaUserShield } from 'react-icons/fa';
import { auditLog, users } from '../../data/mockData';

function getActionColor(action) {
  const a = action.toLowerCase();
  if (a.includes('created') || a.includes('scheduled')) return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
  if (a.includes('updated')) return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
  if (a.includes('cancelled') || a.includes('deleted')) return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
  if (a.includes('viewed')) return 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400';
  if (a.includes('payment') || a.includes('recorded')) return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
  return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400';
}

export default function AuditLog() {
  const [search, setSearch] = useState('');
  const [actionFilter, setActionFilter] = useState('All');

  const actions = ['All', ...new Set(auditLog.map((l) => l.action))];
  const filtered = auditLog.filter((log) => {
    const user = users.find((u) => u.id === log.userId);
    const matchSearch = !search || user?.name.toLowerCase().includes(search.toLowerCase()) || log.target.toLowerCase().includes(search.toLowerCase());
    const matchAction = actionFilter === 'All' || log.action === actionFilter;
    return matchSearch && matchAction;
  });

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-3">
          <FaUserShield className="text-primary" /> Audit Log
        </h1>
        <p className="text-sm text-slate-500">{auditLog.length} activities recorded</p>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
        <div className="p-4 border-b border-slate-100 dark:border-slate-700 flex flex-wrap gap-3">
          <div className="flex-1 min-w-[200px] flex items-center bg-slate-100 dark:bg-slate-700 rounded-xl px-4 py-2.5">
            <FiSearch className="text-slate-400 mr-2" />
            <input type="text" placeholder="Search activity..." value={search} onChange={(e) => setSearch(e.target.value)} className="bg-transparent border-none outline-none text-sm text-slate-700 dark:text-slate-200 w-full" />
          </div>
          <select value={actionFilter} onChange={(e) => setActionFilter(e.target.value)} className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm text-slate-700 dark:text-slate-200 outline-none">
            {actions.map((a) => <option key={a} value={a}>{a === 'All' ? 'All Actions' : a.charAt(0).toUpperCase() + a.slice(1)}</option>)}
          </select>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-700">
          {filtered.map((log) => {
            const user = users.find((u) => u.id === log.userId);
            return (
              <div key={log.id} className="flex items-start gap-4 p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center text-white text-sm font-bold shrink-0">{user?.avatar}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold text-slate-800 dark:text-white">{user?.name}</span>
                    <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${getActionColor(log.action)}`}>{log.action}</span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-0.5">{log.target}</p>
                  <div className="flex items-center gap-3 mt-1 text-xs text-slate-400">
                    <span>{log.timestamp}</span>
                    <span>IP: {log.ip}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
