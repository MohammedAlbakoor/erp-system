import { motion } from 'framer-motion';
import { FiPlus, FiEdit, FiShield } from 'react-icons/fi';
import { users } from '../../data/mockData';

const roleColors = {
  Admin: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  Doctor: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  Secretary: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  Accountant: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
};

const permissions = [
  'View patients', 'Add patient', 'Edit patient', 'Delete patient', 'View medical data',
  'Add visit', 'Edit visit', 'Delete visit', 'View invoices', 'Add payment', 'Edit payment',
  'Manage users', 'Manage settings', 'Export data',
];

export default function Users() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Users & Permissions</h1>
          <p className="text-sm text-slate-500">{users.length} users</p>
        </div>
        <button className="px-5 py-2.5 rounded-xl bg-primary text-white font-medium text-sm hover:bg-primary-dark shadow-lg shadow-primary/20 flex items-center gap-2">
          <FiPlus /> Add User
        </button>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-700/50">
                {['User', 'Email', 'Role', 'Status', 'Last Login', 'Actions'].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center text-white text-sm font-bold">{user.avatar}</div>
                      <span className="text-sm font-semibold text-slate-800 dark:text-white">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">{user.email}</td>
                  <td className="px-4 py-3"><span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${roleColors[user.role]}`}>{user.role}</span></td>
                  <td className="px-4 py-3"><span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${user.status === 'Active' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-slate-100 text-slate-600'}`}>{user.status}</span></td>
                  <td className="px-4 py-3 text-sm text-slate-500">{user.lastLogin}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <button className="p-2 rounded-lg text-slate-400 hover:text-primary hover:bg-primary/10"><FiShield size={14} /></button>
                      <button className="p-2 rounded-lg text-slate-400 hover:text-amber-500 hover:bg-amber-50"><FiEdit size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
        <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2"><FiShield className="text-primary" /> Permission Matrix</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-700/50">
                <th className="px-4 py-2 text-left text-xs font-semibold text-slate-500 uppercase">Permission</th>
                <th className="px-4 py-2 text-center text-xs font-semibold text-red-500 uppercase">Admin</th>
                <th className="px-4 py-2 text-center text-xs font-semibold text-blue-500 uppercase">Doctor</th>
                <th className="px-4 py-2 text-center text-xs font-semibold text-green-500 uppercase">Secretary</th>
                <th className="px-4 py-2 text-center text-xs font-semibold text-amber-500 uppercase">Accountant</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {permissions.map((perm) => {
                const hasPermission = (role) => {
                  if (role === 'Admin') return true;
                  if (role === 'Doctor') return !['Manage users', 'Manage settings', 'Delete patient', 'Export data'].includes(perm);
                  if (role === 'Secretary') return ['View patients', 'Add patient', 'Edit patient', 'View invoices', 'Add payment'].includes(perm);
                  if (role === 'Accountant') return ['View invoices', 'Add payment', 'Edit payment', 'Export data'].includes(perm);
                  return false;
                };
                return (
                  <tr key={perm} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                    <td className="px-4 py-2 text-sm text-slate-700 dark:text-slate-300">{perm}</td>
                    {['Admin', 'Doctor', 'Secretary', 'Accountant'].map((role) => (
                      <td key={role} className="px-4 py-2 text-center">
                        <span className={`inline-block w-5 h-5 rounded-md ${hasPermission(role) ? 'bg-green-500' : 'bg-slate-200 dark:bg-slate-600'}`}>
                          {hasPermission(role) && <span className="text-white text-xs flex items-center justify-center h-full">&check;</span>}
                        </span>
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
